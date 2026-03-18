import type { VercelRequest, VercelResponse } from "@vercel/node"

const ZAPIER_WEBHOOK_URL =
  process.env.ZAPIER_LEAD_WEBHOOK_URL ||
  "https://hooks.zapier.com/hooks/catch/15087615/ucn4yqg/"

const ALLOWED_ORIGINS = [
  process.env.SITE_URL,
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:4173",
].filter(Boolean) as string[]

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = typeof req.headers.origin === "string" ? req.headers.origin : ""
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin)
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") return res.status(200).end()
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" })

  const body = req.body as { email?: unknown; source?: unknown }
  const email = typeof body?.email === "string" ? body.email.trim() : ""
  const source = typeof body?.source === "string" ? body.source : "unknown"

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Valid email required" })
  }

  try {
    const forward = await fetch(ZAPIER_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source }),
    })
    if (!forward.ok) {
      console.error("[lead-webhook] Zapier responded", forward.status)
      return res.status(502).json({ error: "Webhook delivery failed" })
    }
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error("[lead-webhook]", err)
    return res.status(500).json({ error: "Webhook request failed" })
  }
}
