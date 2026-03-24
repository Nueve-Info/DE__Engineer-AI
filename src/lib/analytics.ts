/**
 * Thin, typed wrappers around Meta Pixel (fbq) and PostHog.
 *
 * Both scripts are loaded from index.html. These helpers no-op
 * gracefully when the SDKs haven't finished loading yet.
 */

type MetaStandardEvent =
  | "PageView"
  | "AddToCart"
  | "InitiateCheckout"
  | "Lead"
  | "Purchase"
  | "SubmitApplication"

export function trackMeta(
  event: MetaStandardEvent,
  params?: Record<string, unknown>,
) {
  if (typeof window.fbq === "function") {
    window.fbq("track", event, params)
  }
}

export function capturePosthog(
  event: string,
  props?: Record<string, unknown>,
) {
  if (window.posthog && typeof window.posthog.capture === "function") {
    window.posthog.capture(event, props)
  }
}
