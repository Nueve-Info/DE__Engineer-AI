import { type FormEvent, useState } from "react"
import { motion } from "framer-motion"
import { Container } from "../ui/Container"
import { ArrowRight, TrendingUp, Cpu, Check } from "lucide-react"
import ebookCover from "../../assets/ebook-state-of-design-2026.png"
import { trackMeta, capturePosthog } from "../../lib/analytics"
import { LEAD_WEBHOOK_URL } from "../../lib/lead-webhook"

const highlights = [
  { icon: TrendingUp, text: "Industry hiring trends" },
  { icon: Cpu, text: "AI's real impact on design workflows" },
] as const

export function LeadMagnetSection() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email || status === "loading") return

    setStatus("loading")

    try {
      await fetch(LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "lead_magnet_section" }),
      })
    } catch {
      // silently fail
    }

    trackMeta("Lead", { content_name: "ebook_state_of_design_2026" })
    capturePosthog("lead_magnet_submit", {
      email,
      source: "inline_section",
      ebook: "state_of_design_2026",
    })

    setStatus("success")
  }

  return (
    <section className="py-20 md:py-24 bg-[var(--color-surface-dark)]">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* ── Left: ebook info ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[10px] font-black uppercase tracking-widest text-[var(--color-primary)] lg:text-xs">
              Free Ebook
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)]">
              The State of Design in&nbsp;2026
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-text-secondary)] lg:text-lg">
              A deep-dive into the trends, salaries, and tools redefining the
              design industry — backed by real data and expert interviews.
            </p>

            <ul className="mt-8 flex flex-col gap-4">
              {highlights.map((h, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10">
                    <h.icon className="h-4 w-4 text-[var(--color-primary)]" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm font-semibold text-[var(--color-text-primary)]/80">
                    {h.text}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* ── Right: email form ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm sm:p-10"
          >
            {status === "success" ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary)]/15">
                  <Check className="h-7 w-7 text-[var(--color-primary)]" strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-black tracking-tight text-white">
                  Check your inbox!
                </h3>
                <p className="text-sm text-white/50">
                  We've sent the ebook to your email.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-black tracking-tight text-white sm:text-2xl">
                  Get your free copy
                </h3>
                <p className="mt-2 text-sm text-white/50">
                  Enter your email and we'll send it straight to your inbox.
                </p>
                <div className="mt-6 mb-6 w-full overflow-hidden rounded-lg lg:max-w-[240px]">
                  <img
                    src={ebookCover}
                    alt="The State of Design in 2026 ebook cover"
                    className="w-full aspect-[3/4] object-cover"
                  />
                </div>

                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
                  <input
                    type="email"
                    required
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 w-full rounded-full border border-white/10 bg-white/5 px-5 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group h-12 w-full rounded-full bg-[#FD7E35] px-6 text-sm font-bold text-white transition-all hover:bg-[#E0601A] disabled:opacity-60 inline-flex items-center justify-center gap-1"
                  >
                    {status === "loading" ? "Sending…" : "Download free ebook"}
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>

                <p className="mt-4 text-center text-[11px] text-white/30">
                  No spam, ever. Unsubscribe anytime.
                </p>
              </>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
