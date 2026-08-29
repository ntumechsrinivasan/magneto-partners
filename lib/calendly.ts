/**
 * Calendly popup, loaded only when a booking link is actually configured.
 *
 * The widget script is ~90KB and sets its own cookies, so pulling it in on
 * every page view when no tier has a link yet would cost visitors bandwidth
 * and a consent obligation for nothing. It loads on first use instead.
 */

const WIDGET_JS = "https://assets.calendly.com/assets/external/widget.js";
const WIDGET_CSS = "https://assets.calendly.com/assets/external/widget.css";

interface CalendlyPrefill {
  name?: string;
  email?: string;
  customAnswers?: Record<string, string>;
}

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string; prefill?: CalendlyPrefill }) => void;
      initInlineWidget: (opts: {
        url: string;
        parentElement: HTMLElement;
        prefill?: CalendlyPrefill;
      }) => void;
    };
  }
}

let pending: Promise<void> | null = null;

function loadCalendly(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Calendly) return Promise.resolve();
  if (pending) return pending;

  pending = new Promise<void>((resolve, reject) => {
    if (!document.querySelector(`link[href="${WIDGET_CSS}"]`)) {
      const css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = WIDGET_CSS;
      document.head.appendChild(css);
    }

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${WIDGET_JS}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Calendly failed to load")));
      return;
    }

    const script = document.createElement("script");
    script.src = WIDGET_JS;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      pending = null;
      reject(new Error("Calendly failed to load"));
    };
    document.head.appendChild(script);
  });

  return pending;
}

/**
 * Opens the scheduler over the page. Returns false if it could not be shown —
 * an ad blocker, an offline visitor, a typo in the link — so the caller can
 * fall back to the request form rather than leaving a dead button.
 */
export async function openCalendly(url: string, prefill?: CalendlyPrefill): Promise<boolean> {
  if (!url) return false;
  try {
    await loadCalendly();
    if (!window.Calendly) return false;
    window.Calendly.initPopupWidget({ url, prefill });
    return true;
  } catch {
    return false;
  }
}
