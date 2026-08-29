import type { ReferenceEntry } from "./types";

/**
 * A curated reference, not a chatbot.
 *
 * What stood here before was a keyword matcher with five canned replies
 * dressed up as an AI advisor: it answered five topics and gave everything
 * else the same generic fallback. On a site whose entire product is expertise,
 * a visitor who tests it with two real questions learns the wrong thing about
 * the firm.
 *
 * So these are written and owned answers, presented as what they are. Nothing
 * here is generated at request time and nothing pretends to be. Where an entry
 * credits Dr Gopalan with specific work, that claim comes from his record —
 * general engineering guidance is left unattributed.
 */
export const REFERENCE: ReferenceEntry[] = [
  {
    id: "grade-nomenclature",
    group: "Grades & selection",
    title: "Reading an NdFeB grade code",
    summary: "What N42SH actually tells you, and what it leaves out.",
    keywords: ["grade", "grades", "n42", "n52", "nomenclature", "code", "sh", "uh", "eh", "letters", "temperature", "thermal", "hot", "160", "180", "200", "working temperature", "max temperature", "which grade", "select"],
    body: `The number is energy product in MGOe — N42 means a nominal (BH)max of 42 MGOe. Higher is more field per unit of volume, and that is where the marketing stops.

The letters are the part that decides whether your motor survives. They denote intrinsic coercivity, which is resistance to demagnetisation, and they map roughly to a maximum working temperature:

• (none) — up to ~80°C
• M — up to ~100°C
• H — up to ~120°C
• SH — up to ~150°C
• UH — up to ~180°C
• EH — up to ~200°C
• AH — up to ~230°C

Two cautions. Those ceilings assume a well-behaved magnetic circuit; the real limit depends on your operating point, not on the grade alone. And energy product and coercivity trade against each other, so N52 does not exist in EH — asking for the highest number in both columns is asking for a magnet nobody makes.`,
  },
  {
    id: "operating-point",
    group: "Grades & selection",
    title: "Why the datasheet temperature is not your temperature",
    summary: "Permeance coefficient, the knee, and irreversible loss.",
    keywords: ["operating point", "permeance", "knee", "demagnetis", "demagnetiz", "irreversible", "loss", "derat", "temperature", "thermal", "torque loss", "air gap", "circuit"],
    body: `A magnet does not sit at its remanence. It sits at an operating point on the second quadrant of its own B–H curve, set by the geometry of the circuit around it — how thick the magnet is relative to the air gap it drives. That ratio is the permeance coefficient.

A thin magnet across a large gap sits far down the curve, close to the knee. Push it there with heat, or with the demagnetising field of a stator current, and it crosses the knee and does not come back. The loss is permanent, and it shows up as a motor that has quietly lost torque rather than as a failure anyone logs.

This is why two designs using identical N42SH can behave completely differently, and why "what temperature is this magnet rated for" is not answerable without the circuit. Model the operating point, then pick the grade — including the worst case, which is usually a fault current at maximum ambient rather than anything in the duty cycle.`,
  },
  {
    id: "ndfeb-vs-smco",
    group: "Grades & selection",
    title: "NdFeB or SmCo",
    summary: "Energy density against thermal stability, and what each costs.",
    keywords: ["ndfeb", "smco", "compare", "comparison", "samarium", "cobalt", "motor grade", "which magnet"],
    body: `**NdFeB (N48H–N52H)** — highest energy density available, (BH)max up to ~52 MGOe, roughly $60–80/kg sintered. Working temperature reaches 150–200°C with dysprosium or terbium added. Dominant in EV traction worldwide.

**SmCo (2:17)** — lower energy product, but thermally in another class: stable to 250–300°C, remanence drifting only about −0.03%/°C, and largely indifferent to corrosion. Roughly $120–160/kg. This is the aerospace and defence answer, and the sector Dr Gopalan advised through DRDO and ISRO programmes across 22 years.

The choice is rarely close once the temperature envelope is honest. Below 150°C, NdFeB wins on cost per unit of torque. Above 200°C, SmCo is usually the only sintered option that does not require a redesign around cooling.

Also worth knowing: Dr Gopalan developed a novel Fe-P soft magnetic alloy with core loss of 162 W/kg, which outperforms conventional silicon steel in motor laminations — a different lever on the same problem, and an import-substitution route.`,
  },
  {
    id: "dysprosium",
    group: "Grades & selection",
    title: "Dysprosium, terbium, and how to use less",
    summary: "The heavy rare earths buy coercivity — and carry the sharpest exposure.",
    keywords: ["dysprosium", "dy", "terbium", "tb", "heavy rare earth", "coercivity", "grain boundary", "diffusion"],
    body: `Adding dysprosium raises intrinsic coercivity by roughly 20 kOe per weight percent, which is what turns an N42 into an N42SH. It also lowers remanence, and it is the most supply-exposed input in the whole magnet.

Alloying it through the bulk is the crude method: the dysprosium ends up everywhere, including the grain interiors where it does nothing for coercivity and everything for cost.

**Grain boundary diffusion** puts it only where it works — a thin heavy-rare-earth shell around each grain, pinning the reversal that starts at the boundary. The same coercivity for a fraction of the dysprosium.

Dr Gopalan's team at ARCI demonstrated high coercivity of ~1 T at 150°C via niobium-assisted grain boundary pinning in Nd-Cu diffused NdFeB, validated by 3D atom probe characterisation.

If a supplier quotes an SH or UH grade without saying whether coercivity comes from bulk alloying or diffusion, that is a question worth asking. It changes both the price and the exposure.`,
  },
  {
    id: "ferrite",
    group: "Grades & selection",
    title: "When ferrite is the right answer",
    summary: "A tenth the field, a fiftieth the price, and no rare earth at all.",
    keywords: ["ferrite", "ceramic", "cheap", "cost", "alternative", "rare earth free", "alnico"],
    body: `Ferrite gives about 3.5–4 MGOe against NdFeB's 42–52, so roughly a tenth of the energy density. It also costs a fraction of the price, contains no rare earth, does not corrode, and is thermally stable to 250°C.

If the application has volume to spare and torque density is not the binding constraint, ferrite is frequently the correct engineering answer and gets dismissed on reflex. Pumps, fans, appliance motors, holding and separation, loudspeakers, sensors.

The honest test: work out the volume and mass a ferrite design would need. If the package tolerates it, you have removed your rare-earth exposure entirely. If it does not, you now have a quantified reason for the rare earth, which is a better position than assuming one.

AlNiCo occupies a narrower niche — modest energy product but excellent temperature stability and a very low reversible coefficient, which keeps it in instrumentation and sensing above 350°C where little else works.`,
  },
  {
    id: "bonded-vs-sintered",
    group: "Grades & selection",
    title: "Bonded or sintered",
    summary: "Net-shape geometry and multipole magnetisation, at half the field.",
    keywords: ["bonded", "sintered", "injection", "compression", "net shape", "multipole"],
    body: `Sintered magnets are pressed and fired to near full density. They give the full energy product, and they are hard, brittle ceramics that must be ground rather than machined.

Bonded magnets mix powder into a polymer and are injection- or compression-moulded. Energy product falls to roughly half, but you gain things sintering cannot offer: complex net shapes straight from the tool, tight dimensional tolerance without grinding, mechanical toughness, insert moulding onto a shaft, and multipole magnetisation patterns impressed in a single operation.

For small motors, sensors and encoders where assembly cost dominates and the field requirement is modest, bonded frequently wins on installed cost even though it loses on the datasheet.`,
  },
  {
    id: "coatings",
    group: "Manufacturing & quality",
    title: "Coatings and corrosion",
    summary: "NdFeB oxidises. The coating is not a finish, it is a functional part.",
    keywords: ["coating", "coatings", "corrosion", "nickel", "nicuni", "epoxy", "plating", "rust", "humidity", "salt", "moisture", "oxidation", "finish"],
    body: `Sintered NdFeB contains a neodymium-rich grain boundary phase that oxidises readily. Uncoated, in humidity, it degrades from the surface inward and eventually crumbles. The coating is structural, not cosmetic.

**NiCuNi** — the default. Three layers, hard, solderable, good general corrosion resistance. Not adequate for salt spray or sustained condensation on its own.
**Epoxy** — better in humid and mildly corrosive environments, softer, thicker, easier to chip on assembly.
**Ni + epoxy** — the usual answer for automotive underbonnet.
**Phosphate** — a temporary passivation for magnets that will be potted or fully encapsulated. Not a service coating.
**Parylene** — thin, conformal, excellent barrier; specialist cost.

Two failure modes to specify against. Coating adhesion fails when the substrate is not properly cleaned after grinding, and shows up as blistering months later. And any coating breached during assembly becomes a corrosion initiation site — a chipped edge on a press fit will find the humidity.

Ask for salt spray hours and thermal shock cycles in the qualification, not just a coating name.`,
  },
  {
    id: "tolerances",
    group: "Manufacturing & quality",
    title: "Tolerances, machining and handling",
    summary: "Sintered magnet is a brittle ceramic that is also trying to move.",
    keywords: ["tolerance", "machining", "grinding", "handling", "safety", "chip", "crack", "assembly"],
    body: `As-sintered tolerance is loose — typically ±0.1 mm or worse, plus shrinkage distortion. Anything tighter is ground, and grinding is a significant fraction of the finished cost. Specify tight tolerance only on the faces that matter.

The material is a brittle ceramic. It will not tolerate tensile or bending load, it chips at edges, and thermal shock cracks it. Design the assembly so the magnet is in compression and never a structural member.

Magnetised handling is genuinely hazardous at scale. Large magnets accelerate toward steel fast enough to break fingers and shatter on impact, throwing fragments. The powder is a fire risk. Where the design allows, assemble unmagnetised and magnetise in situ afterwards — it removes the handling hazard and generally improves alignment.

Magnetised parts also carry shipping restrictions, and stray field limits at the package surface are enforced for air freight.`,
  },
  {
    id: "qualification",
    group: "Manufacturing & quality",
    title: "Qualifying a second source",
    summary: "What to test before you need the alternative, not after.",
    keywords: ["qualification", "qualify", "second source", "audit", "supplier", "testing", "dual source", "approval"],
    body: `A second source qualified under pressure is not a second source. The work has to be done while the first one is still healthy.

A workable programme:

**Paper** — grade specification with tolerance bands, not a nominal. Coating and its test regime. Country of origin for the alloy, not just for the sintering. Capacity commitment, and what it is contingent on.
**Material** — B–H curve at room temperature and at the top of your working range, on their material, measured by you or an independent lab. Do not accept a supplier curve as the qualification.
**Dimensional and coating** — full inspection, salt spray, thermal shock, adhesion.
**In application** — build motors. Measure back-EMF, cogging, torque constant, and losses against the incumbent. Then thermally age them and measure again; irreversible loss is where second sources most often differ.
**Process** — understand which steps they actually perform and which they subcontract. A supplier who buys sintered blocks and grinds them has a different risk profile from one who melts alloy.

Budget six to twelve months. The point of starting early is that the answer is allowed to be no.`,
  },
  {
    id: "supply-risk",
    group: "Supply & cost",
    title: "Supply concentration, framed as a procurement problem",
    summary: "Where the exposure actually sits, and what genuinely reduces it.",
    keywords: ["supply", "risk", "concentration", "sourcing", "resilience", "second source", "shortage"],
    body: `The core issue is concentration rather than any single origin: a large majority of NdPr oxide output and of sintering capacity sits inside one processing ecosystem, so a disruption anywhere in it reaches every downstream buyer at the same time.

What that means in practice:

• Qualify a second source before you need one — see the qualification entry.
• Hold grade flexibility, so a substitution is an engineering decision with a known answer rather than an emergency.
• Treat quota and export-policy changes as a lead-time risk, not only a price risk. Schedule slip usually costs more than the material.
• Know your real exposure. Many buyers are exposed through a tier-2 motor supplier they have never audited.

India's emerging role: Kerala, Odisha, Andhra Pradesh and Tamil Nadu hold significant monazite-rich deposits — an area Dr Gopalan has addressed directly through ARCI's national mission programmes, with IREL and BARC forming the processing ecosystem.

Japan's response after 2010 remains the clearest worked example of a country reducing exposure without sacrificing performance: recycling, substitution, and joint development between NIMS and industry, cutting import dependency from 83%.`,
  },
  {
    id: "pricing",
    group: "Supply & cost",
    title: "NdPr price behaviour",
    summary: "A market that moved threefold in four years.",
    keywords: ["price", "pricing", "ndpr", "neodymium", "praseodymium", "cost", "outlook", "forecast", "hedge"],
    body: `Recent history: a 2021 peak near $175/kg, a 2023 trough near $48/kg, and a 2024–25 average of roughly $65–80/kg. A factor of three inside four years, which is why magnet cost belongs in your risk register and not only in your bill of materials.

Twin Pole models $80–120/kg through 2027 as EV volumes reaccelerate, with upside risk if export or quota policy tightens.

The practical hedge is rarely financial. It is grade flexibility, a qualified second source, and a recycled-content route that has actually been tested rather than merely identified. Long-term contracts help with volume security and much less with price.

India's Atmanirbhar Bharat programmes are building domestic processing capacity — work Dr Gopalan has led directly through ARCI's national mission.`,
  },
  {
    id: "bom-cost",
    group: "Supply & cost",
    title: "What actually drives magnet cost",
    summary: "The rare earth is rarely the whole number.",
    keywords: ["cost", "bom", "bill of materials", "price driver", "expensive", "reduce cost", "cheaper", "magnet cost", "cost driver"],
    body: `A finished magnet's cost breaks down roughly into alloy, processing, finishing and yield — and buyers tend to negotiate only the first.

**Alloy** — NdPr at market, plus any dysprosium or terbium. The heavy rare earths are small by mass and large by cost, which is why the diffusion route matters commercially and not just technically.
**Processing** — melting, milling, pressing, sintering, heat treatment. Energy-intensive and relatively fixed per kilogram.
**Finishing** — grinding to tolerance and coating. Driven by your drawing. Tight tolerances on faces that do not need them are a common and invisible cost.
**Yield** — complex geometries, thin sections and tight tolerances all lose parts. The scrap is recoverable but the processing is not.

Three levers that usually beat negotiating the alloy price: relax tolerances on non-critical faces; check whether the operating point actually requires the grade specified; and ask whether a segmented or bonded design removes grinding operations entirely.`,
  },
  {
    id: "recycling",
    group: "Circularity",
    title: "Magnet recycling routes",
    summary: "Recovery rates, capital cost, and which streams are worth it.",
    keywords: ["recycling", "recycle", "circular", "hpms", "urban mining", "scrap", "end of life", "reuse"],
    body: `Dr Gopalan has researched urban mining and closed-loop magnet recovery directly at ARCI. The main routes:

**HPMS (hydrogen processing of magnet scrap)** — 85–92% NdPr recovery from clean end-of-life motor streams. Capital cost roughly $8–12M for 500 t/yr. Needs a clean, sorted, dismantled feed, which is the real constraint.
**Short-loop (production scrap)** — 95%+ recovery, already commercial at several tier-1 facilities. This is the one most manufacturers should look at first: the feedstock is your own swarf and rejects, and you already know its composition.
**Hydrometallurgy** — 75–85% from mixed or contaminated WEEE. Handles dirty streams, higher reagent cost and effluent burden.

Urban mining could address 10–20% of the supply gap. EU CRMA and US IRA recycled-content targets create commercial pull from 2027; India's framework is developing.

For scale: Dr Gopalan estimates 13 billion particles of plastic dust, 10,000 litres of gas emissions and 75 litres of toxic water per tonne of rare earth mined — which is why recycling is an environmental argument as much as an economic one.`,
  },
  {
    id: "compliance",
    group: "Circularity",
    title: "Traceability and compliance",
    summary: "What a customer audit will ask for, and what most suppliers cannot produce.",
    keywords: ["esg", "compliance", "reach", "rohs", "traceability", "audit", "conflict", "carbon", "regulation"],
    body: `Magnets themselves are generally straightforward under RoHS and REACH. The exposure is upstream and it is about provenance rather than substance.

What a serious customer audit now asks for:

• **Origin of the mined material**, not the country of the sintering plant. These are frequently different and the distinction is the entire point.
• **Chain of custody** through separation and alloying — usually the step where the trail goes cold.
• **Embodied carbon** for the magnet, increasingly requested as a line in the product footprint.
• **Recycled content**, with a defensible basis for the number.

Most suppliers can answer the first question and not the second. Establishing that early tells you a great deal about how a supply relationship will behave under scrutiny — and buys time before a customer asks and you have to answer in weeks.`,
  },
  {
    id: "soft-magnetic",
    group: "Materials",
    title: "Soft magnetic materials in the same machine",
    summary: "The laminations matter as much as the magnets, and get less attention.",
    keywords: ["soft magnetic", "lamination", "silicon steel", "core loss", "smc", "fe-p", "iron", "stator"],
    body: `Permanent magnets get the attention; the soft magnetic circuit carrying their flux often decides efficiency.

**Silicon steel** — the default lamination. Core loss falls with thinner gauge and rises steeply with frequency, so a high-speed machine can spend more in the iron than it saves in the magnet.
**Cobalt-iron** — highest saturation, which buys torque density in a fixed volume. Expensive, and cobalt carries its own sourcing exposure.
**Soft magnetic composites (SMC)** — insulated iron powder, pressed to shape. Isotropic flux paths and net-shape geometry, low eddy losses at high frequency, lower permeability and mechanical strength than laminations.
**Fe-P alloys** — Dr Gopalan developed a novel Fe-P soft magnetic alloy with core loss of 162 W/kg, outperforming conventional silicon steel for motor applications and offering a cost-effective import-substitute route.

Worth checking on any efficiency programme: if the loss budget is dominated by iron rather than copper or magnet, a better lamination is usually cheaper per point of efficiency than a better magnet.`,
  },
];

/**
 * Finds the entry that best matches a typed query.
 *
 * Scored rather than first-match: an early keyword should not win over a
 * better-matching entry later in the list. Returns null rather than guessing
 * when nothing scores — the caller says so plainly instead of answering the
 * wrong question.
 */
/**
 * Terms that appear in these entries but are not distinctive enough to
 * identify one on their own. "Forecast" is shared by the pricing entry and by
 * "quarterly revenue forecast", which is not a question about magnet prices.
 * A weak term needs corroboration; a distinctive one — "ferrite", "second
 * source" — is sufficient by itself.
 */
const WEAK = new Set([
  "cost", "price", "pricing", "loss", "forecast", "outlook", "select", "code",
  "letters", "finish", "circuit", "reuse", "audit", "approval", "regulation",
  "expensive", "cheaper", "iron", "compare", "comparison", "which magnet",
  "alternative", "temperature", "thermal", "hot", "160", "180", "200",
]);

export function findEntry(query: string): ReferenceEntry | null {
  // Split digits from letters so "160C" matches the term "160", and drop
  // punctuation, so word-boundary tests see real words.
  const q = query
    .toLowerCase()
    .replace(/(\d)([a-z])/g, "$1 $2")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (q.length < 2) return null;

  let best: ReferenceEntry | null = null;
  let bestScore = 0;

  for (const entry of REFERENCE) {
    let score = 0;
    if (entry.title.toLowerCase().includes(q)) score += 12;
    for (const k of entry.keywords) {
      const hit =
        q === k || new RegExp(`\\b${k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(q);
      if (hit) score += WEAK.has(k) ? 4 : 10;
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  // Ten clears on one distinctive term, or on two weak ones corroborating each
  // other. Below that we say we have not covered it and offer to put the
  // question to Dr Gopalan — a better answer than confidently opening the
  // wrong page.
  return bestScore >= 10 ? best : null;
}

export const REFERENCE_GROUPS = [...new Set(REFERENCE.map((e) => e.group))];
