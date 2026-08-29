/**
 * Serves /api/headlines for the running headline band.
 *
 * Public RSS is fetched here rather than in the browser because feeds do not
 * send CORS headers — a page cannot read them directly. This runs on the edge
 * instead, merges a few free sources, and hands back plain JSON.
 *
 * Everything else on the site is a static file, served by the assets binding
 * without this code running at all. Only /api/* wakes the Worker, and the
 * response is cached at the edge for half an hour, so a busy day is still a
 * handful of invocations — comfortably inside the free plan.
 *
 * Attribution is taken from the feed, never invented. If a source cannot be
 * determined the item is dropped rather than published under a guess.
 */

const FEEDS = [
  {
    tag: "RARE EARTH",
    url: "https://news.google.com/rss/search?q=%22rare+earth%22+magnet&hl=en-GB&gl=GB&ceid=GB:en",
  },
  {
    tag: "MAGNET SUPPLY",
    url: "https://news.google.com/rss/search?q=neodymium+OR+NdFeB+OR+%22permanent+magnet%22+supply+chain&hl=en-GB&gl=GB&ceid=GB:en",
  },
  {
    tag: "EV MATERIALS",
    url: "https://news.google.com/rss/search?q=%22critical+minerals%22+OR+%22rare+earth%22+EV+motor&hl=en-GB&gl=GB&ceid=GB:en",
  },
  {
    tag: "RECYCLING",
    url: "https://news.google.com/rss/search?q=magnet+recycling+OR+%22urban+mining%22+rare+earth&hl=en-GB&gl=GB&ceid=GB:en",
  },
  { tag: "MINING", url: "https://www.mining.com/tag/rare-earth/feed/", source: "MINING.COM" },
];

const MAX_ITEMS = 20;
const TTL = 1800; // seconds the edge holds a merged response

const ENTITIES = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

function decode(s) {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, name) => ENTITIES[name.toLowerCase()] ?? m)
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function field(xml, name) {
  const m = xml.match(new RegExp(`<${name}\\b[^>]*>([\\s\\S]*?)</${name}>`, "i"));
  return m ? decode(m[1]) : "";
}

export function parse(xml, feed) {
  const out = [];
  const items = xml.match(/<item\b[^>]*>[\s\S]*?<\/item>/gi) || [];
  for (const raw of items) {
    let title = field(raw, "title");
    // Google News credits the publisher in its own element and also tacks it
    // onto the end of the title. Prefer the element, then trim the duplicate.
    const source = field(raw, "source") || feed.source || "";
    if (!title || !source) continue;
    const suffix = ` - ${source}`;
    if (title.endsWith(suffix)) title = title.slice(0, -suffix.length).trim();
    if (title.length < 12) continue;

    out.push({
      category: feed.tag,
      title,
      source: source.toUpperCase(),
      url: field(raw, "link"),
      published: field(raw, "pubDate"),
    });
  }
  return out;
}

async function readFeed(feed) {
  try {
    const res = await fetch(feed.url, {
      headers: { "user-agent": "TwinPolePartners/1.0 (+https://twinpolepartners.com)" },
      cf: { cacheTtl: TTL, cacheEverything: true },
    });
    if (!res.ok) return [];
    return parse(await res.text(), feed);
  } catch {
    return []; // one dead feed must not take the band down
  }
}

const STOPWORDS = new Set([
  "the", "and", "for", "with", "from", "that", "this", "into", "over", "amid",
  "says", "said", "will", "after", "more", "than", "its", "his", "her", "new",
  "how", "why", "what", "when", "who", "are", "was", "were", "has", "have",
]);

/** Significant words, for judging whether two headlines are the same story. */
function tokens(title) {
  return new Set(
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s]+/g, " ")
      .split(/\s+/)
      .filter((w) => w.length >= 4 && !STOPWORDS.has(w)),
  );
}

/**
 * True when two headlines are covering the same story.
 *
 * Exact matching is not enough here. The feed queries overlap on purpose, so
 * the same article comes back under several of them, and a syndicated story
 * appears under a different publisher with the headline reworded or trimmed.
 * Comparing significant words and measuring against the shorter of the two
 * catches both — a truncated headline is still mostly a subset of the full one.
 */
function sameStory(a, b) {
  const smaller = Math.min(a.size, b.size);
  if (!smaller) return false;
  let shared = 0;
  for (const w of a) if (b.has(w)) shared++;
  return shared / smaller >= 0.6;
}

async function headlines() {
  const batches = await Promise.all(FEEDS.map(readFeed));

  const seenUrls = new Set();
  const seenTitles = new Set();
  const seenTokens = [];
  const perSource = new Map();
  const merged = [];

  function accept(item) {
    // The same article reached through two queries keeps the same link.
    if (item.url && seenUrls.has(item.url)) return false;
    const flat = item.title.toLowerCase().replace(/[^a-z0-9]+/g, "");
    if (seenTitles.has(flat)) return false;

    const t = tokens(item.title);
    if (seenTokens.some((prev) => sameStory(t, prev))) return false;

    // No single outlet should be able to fill the band.
    const n = perSource.get(item.source) || 0;
    if (n >= 3) return false;

    if (item.url) seenUrls.add(item.url);
    seenTitles.add(flat);
    seenTokens.push(t);
    perSource.set(item.source, n + 1);
    merged.push(item);
    return true;
  }

  // Round-robin across the feeds so one prolific source cannot fill the band.
  for (let i = 0; merged.length < MAX_ITEMS; i++) {
    let reachable = false;
    for (const batch of batches) {
      if (i >= batch.length) continue;
      reachable = true;
      accept(batch[i]);
      if (merged.length >= MAX_ITEMS) break;
    }
    if (!reachable) break;
  }
  return merged;
}

export { headlines as _headlines };

const handler = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname !== "/api/headlines") return env.ASSETS.fetch(request);

    const cache = caches.default;
    const key = new Request(url.origin + "/api/headlines", request);
    const hit = await cache.match(key);
    if (hit) return hit;

    const items = await headlines();
    const body = JSON.stringify({
      updated: new Date().toISOString(),
      // An empty array is a valid answer: the band keeps its own fallback
      // rather than going blank.
      headlines: items,
    });

    const res = new Response(body, {
      headers: {
        "content-type": "application/json; charset=utf-8",
        // Short client cache, longer edge cache: readers get fresh headlines
        // without every visit costing a feed fetch.
        "cache-control": `public, max-age=300, s-maxage=${TTL}`,
      },
    });
    if (items.length) ctx.waitUntil(cache.put(key, res.clone()));
    return res;
  },
};

export default handler;
