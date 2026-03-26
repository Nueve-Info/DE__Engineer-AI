import { useRef, useState, useEffect, useCallback } from "react"
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useScroll,
  useMotionValueEvent,
  useMotionTemplate,
} from "framer-motion"
import { ArrowRight, Check } from "lucide-react"
import { Container } from "../ui/Container"
import { trackMeta, capturePosthog } from "../../lib/analytics"

const TYPEFORM_URL = "https://syh5xi59tr6.typeform.com/to/FqMZB3vy"

const BENEFITS = [
  "Pre-recorded step-by-step DE portfolio lessons",
  "Live code build-along sessions",
  "Portfolio audit checklist (DE roles)",
  "DE case study creation workflow",
  "Case study AI Agent",
  "1:1 mentor feedback sessions",
]

/* ── Tilt card (desktop: mouse, mobile: scroll) ── */

function MembershipCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)")
    setIsDesktop(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  /* Desktop: mouse-based tilt */
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const mouseRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [16, -16]), {
    stiffness: 200,
    damping: 20,
  })
  const mouseRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-16, 16]), {
    stiffness: 200,
    damping: 20,
  })

  /* Mobile: scroll-based tilt — top-left to bottom-right diagonal */
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  })
  const scrollRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [14, 0, -14])
  const scrollRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-10, 0, 10])

  /* Sync scroll values into springs for smooth mobile tilt */
  const smoothScrollRotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 })
  const smoothScrollRotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 })
  useMotionValueEvent(scrollRotateX, "change", (v) => {
    if (!isDesktop) smoothScrollRotateX.set(v)
  })
  useMotionValueEvent(scrollRotateY, "change", (v) => {
    if (!isDesktop) smoothScrollRotateY.set(v)
  })

  /* Dynamic linear shine — diagonal beam (bottom-left → top-right) */
  const shineAngle = useMotionValue(135)

  const mouseShinePos = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [70, 30]),
    { stiffness: 200, damping: 20 }
  )

  const scrollShinePos = useTransform(scrollYProgress, [0, 0.5, 1], [25, 50, 75])
  const smoothScrollShinePos = useSpring(useMotionValue(50), { stiffness: 150, damping: 18 })
  useMotionValueEvent(scrollShinePos, "change", (v) => { if (!isDesktop) smoothScrollShinePos.set(v) })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop) return
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }, [isDesktop, mouseX, mouseY])

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
  }, [mouseX, mouseY])

  /* Build dynamic shine from motion values */
  const activeAngle = shineAngle
  const activePos = isDesktop ? mouseShinePos : smoothScrollShinePos

  return (
    <div className="flex items-center justify-center" style={{ perspective: 800 }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isDesktop ? mouseRotateX : smoothScrollRotateX,
          rotateY: isDesktop ? mouseRotateY : smoothScrollRotateY,
          transformStyle: "preserve-3d",
          boxShadow:
            "0 20px 40px -10px rgba(253, 126, 53, 0.18), 0 30px 60px -15px rgba(0, 0, 0, 0.4)",
        }}
        className="group relative aspect-[1.6/1] w-full max-w-[420px] overflow-hidden rounded-2xl"
      >
        {/* Deep, saturated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E0601A] via-[#FD7E35] to-[#D94E00]" />

        {/* Warm texture overlay */}
        <div
          className="absolute inset-0 opacity-40 mix-blend-soft-light"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 25% 15%, rgba(255,200,120,0.5) 0%, transparent 45%), radial-gradient(ellipse at 75% 70%, rgba(200,60,0,0.4) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(255,140,40,0.3) 0%, transparent 60%)",
          }}
        />

        {/* Dynamic linear light beam — sweeps opposite to tilt */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            background: useMotionTemplate`linear-gradient(${activeAngle}deg, transparent calc(${activePos}% - 20%), rgba(255,255,255,0.04) calc(${activePos}% - 10%), rgba(255,255,255,0.18) calc(${activePos}% - 2%), rgba(255,255,255,0.25) ${activePos}%, rgba(255,255,255,0.18) calc(${activePos}% + 2%), rgba(255,255,255,0.04) calc(${activePos}% + 10%), transparent calc(${activePos}% + 20%))`,
          }}
        />

        {/* Edge gloss — subtle top-left to bottom-right sheen */}
        <div
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 35%, transparent 65%, rgba(0,0,0,0.06) 100%)",
          }}
        />

        {/* Card content */}
        <div className="relative z-30 flex h-full flex-col justify-between p-6 sm:p-8">
          <div>
            <p className="text-2xl font-black leading-none tracking-wide text-white sm:text-3xl">
              DESIGN
            </p>
            <p className="-mt-1 text-[1.4rem] font-normal tracking-wider text-white sm:text-[1.7rem]">
              engineer
            </p>
          </div>
          <div>
            <p className="text-3xl font-black text-white sm:text-4xl">
              Early Access
            </p>
            <p className="text-sm font-normal tracking-wide text-white">
              Application-only
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

/* ── Main section ── */

export function WaitlistCTA() {
  return (
    <section
      id="waitlist"
      className="relative overflow-hidden bg-[var(--color-surface)] py-16 lg:py-24"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FD7E35]/[0.08] blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/4 translate-y-1/4 rounded-full bg-[#FD7E35]/[0.05] blur-[100px]" />
      </div>

      <Container className="relative z-10 px-5 sm:px-12 lg:px-20">
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* LEFT — Membership card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <MembershipCard />
          </motion.div>

          {/* RIGHT — Copy + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              Design Engineer{" "}
              <span className="bg-gradient-to-r from-[#FD7E35] to-[#FF9B60] bg-clip-text text-transparent">
                Early Access
              </span>
            </h2>

            <p className="mt-4 text-base leading-relaxed text-white/50">
              The Design Engineer course launches soon. We're hand-picking 10
              builders per week who are serious about making the career shift.
            </p>

            <ul className="mt-6 space-y-3">
              {BENEFITS.map((text, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check className="h-4 w-4 shrink-0 text-[#FD7E35]" />
                  <span className="text-sm font-medium text-white/70">
                    {text}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href={TYPEFORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackMeta("Lead", {
                  content_name: "Design Engineer Waitlist",
                  content_category: "Waitlist Application",
                })
                capturePosthog("WaitlistApply", {
                  funnel_id: "DE__Engineer-AI",
                  cta_placement: "waitlist_section",
                })
              }}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-[#FD7E35] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#FD7E35]/20 transition hover:opacity-90 sm:w-auto sm:px-10"
              data-event="cta_click"
              data-cta-type="waitlist_apply"
              data-cta-placement="waitlist_section"
            >
              Join the Waitlist
              <ArrowRight className="h-4 w-4" />
            </a>

            <p className="mt-3 text-xs text-white/30">
              Takes 2 minutes · No payment required
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
