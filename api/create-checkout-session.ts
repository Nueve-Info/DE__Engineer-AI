import type { VercelRequest, VercelResponse } from "@vercel/node"
import Stripe from "stripe"

/* ── Lazy Stripe client (reads env at request time, not module load) ── */
let _stripe: Stripe | null = null
function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) {
      throw new Error(
        "STRIPE_SECRET_KEY is not set. Add it to .env.local or your Vercel project env vars."
      )
    }
    _stripe = new Stripe(key)
  }
  return _stripe
}

/* ── Allowed origins for CORS ── */
const ALLOWED_ORIGINS = [
  process.env.SITE_URL,
  "https://int.nueve.design",
  "http://localhost:5174",
  "http://localhost:5173",
  "http://localhost:4173",
].filter(Boolean) as string[]

/* ── Known Price IDs ──
 *
 *  STRIPE_PRICE_TIER1     → Tier 1 one-time ($37)
 *  STRIPE_PRICE_TIER2     → Tier 2 one-time ($57)
 *  STRIPE_PRICE_TIER1_SUB → Tier 1 subscription ($9/mo)
 *  STRIPE_PRICE_TIER2_SUB → Tier 2 subscription ($399/mo)
 */
const KNOWN_PRICE_IDS = new Set(
  [
    process.env.STRIPE_PRICE_TIER1,
    process.env.STRIPE_PRICE_TIER2,
    process.env.STRIPE_PRICE_TIER1_SUB,
    process.env.STRIPE_PRICE_TIER2_SUB,
  ]
    .map((v) => v?.trim())
    .filter(Boolean)
)

/* Subscription price IDs — these use mode:"subscription" + 3-day trial */
const SUBSCRIPTION_PRICE_IDS = new Set(
  [
    process.env.STRIPE_PRICE_TIER1_SUB,
    process.env.STRIPE_PRICE_TIER2_SUB,
  ]
    .map((v) => v?.trim())
    .filter(Boolean)
)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  /* ── CORS ── */
  const origin = typeof req.headers.origin === "string" ? req.headers.origin : ""
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin)
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") return res.status(200).end()
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" })

  /* ── Input validation ── */
  const body = req.body as Record<string, unknown>
  const priceId = typeof body.priceId === "string" ? body.priceId.trim() : ""

  if (!priceId.startsWith("price_")) {
    return res.status(400).json({ error: "Invalid priceId" })
  }

  if (KNOWN_PRICE_IDS.size > 0 && !KNOWN_PRICE_IDS.has(priceId)) {
    return res.status(400).json({ error: "Unknown priceId" })
  }

  const isSubscription = SUBSCRIPTION_PRICE_IDS.has(priceId)

  const siteUrl = process.env.SITE_URL ?? "http://localhost:5173"
  const returnUrl = `${siteUrl}/thank-you?session_id={CHECKOUT_SESSION_ID}`

  try {
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      mode: isSubscription ? "subscription" : "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      return_url: returnUrl,
      custom_fields: [
        {
          key: "full_name",
          label: { type: "custom", custom: "Full name" },
          type: "text",
          optional: true,
        },
      ],
      consent_collection: {
        terms_of_service: "required",
      },
      ...(isSubscription
        ? {
            subscription_data: {
              trial_period_days: 3,
              metadata: {
                ab_experiment: typeof body.ab_experiment === "string" ? body.ab_experiment : "none",
                ab_variant: typeof body.ab_variant === "string" ? body.ab_variant : "control",
                funnel_id: typeof body.funnel_id === "string" ? body.funnel_id : "unknown",
                landing_url: typeof body.landing_url === "string" ? body.landing_url : "unknown",
              },
            },
          }
        : {}),
      metadata: {
        ab_experiment: typeof body.ab_experiment === "string" ? body.ab_experiment : "none",
        ab_variant: typeof body.ab_variant === "string" ? body.ab_variant : "control",
        funnel_id: typeof body.funnel_id === "string" ? body.funnel_id : "unknown",
        landing_url: typeof body.landing_url === "string" ? body.landing_url : "unknown",
      },
    })

    return res.status(200).json({ clientSecret: session.client_secret })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Stripe error"
    console.error("[create-checkout-session]", err)
    return res.status(500).json({ error: message })
  }
}
