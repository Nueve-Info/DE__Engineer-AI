/**
 * Same-origin API URL for lead magnet submissions.
 * Browser POSTs here to avoid CORS; server forwards to Zapier.
 */
export const LEAD_WEBHOOK_URL =
  (import.meta.env.VITE_LEAD_WEBHOOK_URL as string | undefined) ||
  "/api/lead-webhook"
