import { motion } from "framer-motion"
import {
  ArrowRight,
  Star,
  Video,
  Code2,
  ClipboardCheck,
  BookOpen,
  FlaskConical,
  Bot,
  Users,
  MessageCircle,
  Users2,
  Lock,
  Map as MapIcon,
  LayoutGrid,
  Briefcase,
  Clock,
  Mail,
  Send,
} from "lucide-react"
import { Container } from "../ui/Container"
import { trackMeta, capturePosthog } from "../../lib/analytics"

const TYPEFORM_URL = "https://syh5xi59tr6.typeform.com/to/FqMZB3vy"

/* ── What accepted applicants get (from DE tiers) ── */

const CORE_FEATURES = [
  { icon: Video, text: "Pre-recorded step-by-step DE portfolio lessons" },
  { icon: Code2, text: "Live code build-along sessions" },
  { icon: ClipboardCheck, text: "Portfolio audit checklist (DE roles)" },
  { icon: BookOpen, text: "DE case study creation workflow" },
  { icon: FlaskConical, text: "Design system validation template" },
  { icon: Bot, text: "Case study AI Agent" },
]

const MENTOR_PERKS = [
  { icon: MessageCircle, text: "3 personalised 1:1 mentor feedback sessions" },
  { icon: Users2, text: "Weekly group accountability check-ins" },
  { icon: Lock, text: "Private Discord community" },
  { icon: MapIcon, text: "Personalised DE career roadmap" },
  { icon: LayoutGrid, text: "3 months free Grid access (job outreach tool)" },
  { icon: Briefcase, text: "Curated DE job opportunities board" },
]

/* ── "What happens next" steps ── */

const NEXT_STEPS = [
  { icon: Send, label: "Apply", detail: "2-min application" },
  { icon: Clock, label: "Review", detail: "3–5 day review" },
  { icon: Mail, label: "Decision", detail: "Accept or feedback" },
]

export function WaitlistCTA() {
  const handleApplyClick = () => {
    trackMeta("Lead", {
      content_name: "Design Engineer Waitlist",
      content_category: "Waitlist Application",
    })
    capturePosthog("WaitlistApply", {
      funnel_id: "DE__Engineer-AI",
      cta_placement: "waitlist_section",
    })
  }

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
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <span className="inline-block rounded-full border border-[#FD7E35]/30 bg-[#FD7E35]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#FD7E35]">
            Early Access — Limited Spots
          </span>
          <h2 className="mt-5 text-3xl font-black tracking-tighter text-white sm:text-4xl md:text-5xl">
            Everything Included When{" "}
            <span className="bg-gradient-to-r from-[#FD7E35] to-[#FF9B60] bg-clip-text text-transparent">
              You're Accepted
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base font-medium text-white/50">
            The Design Engineer course launches soon. We're hand-picking 10
            builders per week who are serious about making the career shift.
          </p>
        </motion.div>

        {/* ── 2-column grid: value left, CTA right ── */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-8">
          {/* LEFT — What you get (3/5 width) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 sm:p-8 lg:col-span-3"
          >
            <p className="text-xs font-black uppercase tracking-widest text-[#FD7E35]">
              What you get
            </p>
            <h3 className="mt-2 text-lg font-bold tracking-tight text-white">
              Full Design Engineer course access
            </h3>

            <ul className="mt-5 space-y-3">
              {CORE_FEATURES.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FD7E35]/10">
                    <f.icon className="h-3 w-3 text-[#FD7E35]" />
                  </div>
                  <span className="text-sm font-medium leading-snug text-white/70">
                    {f.text}
                  </span>
                </li>
              ))}
            </ul>

            {/* Mentor perks teaser */}
            <div className="mt-6 rounded-xl border border-[#FD7E35]/20 bg-[#FD7E35]/[0.06] p-4">
              <p className="text-xs font-black uppercase tracking-widest text-[#FD7E35]">
                Top applicants also unlock
              </p>
              <ul className="mt-3 space-y-2.5">
                {MENTOR_PERKS.map((f, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <f.icon className="h-3.5 w-3.5 shrink-0 text-[#FD7E35]/60" />
                    <span className="text-sm text-white/50">{f.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* RIGHT — Application CTA card (2/5 width) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col rounded-2xl border border-[#FD7E35]/40 bg-white p-6 sm:p-7 lg:col-span-2"
          >
            {/* Social proof */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-[#FD7E35] text-[#FD7E35]"
                  />
                ))}
              </div>
              <span className="text-xs text-gray-400">|</span>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1.5">
                  {[
                    { src: "/avatars/alumni-3.png", alt: "Alumni" },
                    { src: "/avatars/krystian.png", alt: "Alumni" },
                    { src: "/avatars/monique.png", alt: "Alumni" },
                  ].map((a, i) => (
                    <div
                      key={i}
                      className="h-5 w-5 overflow-hidden rounded-full border-2 border-white"
                    >
                      <img
                        src={a.src}
                        alt={a.alt}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ))}
                </div>
                <span className="text-xs font-bold text-gray-700">
                  200+ students
                </span>
              </div>
            </div>

            {/* Card heading */}
            <h3 className="mt-5 text-xl font-black tracking-tight text-gray-900">
              Apply for Design Engineer Early Access
            </h3>

            {/* Scarcity */}
            <div className="mt-3 flex items-center gap-2 rounded-lg border border-[#FD7E35]/20 bg-[#FD7E35]/[0.06] px-3 py-2">
              <Users className="h-4 w-4 shrink-0 text-[#FD7E35]" />
              <span className="text-sm font-bold text-gray-900">
                Only 10 spots per week
              </span>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              Every application is reviewed individually — we only accept
              the strongest candidates. Selected builders get full course access
              when the Design Engineer program launches.
            </p>

            {/* CTA button — green gradient */}
            <a
              href={TYPEFORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleApplyClick}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-500/20 transition hover:opacity-90"
              data-event="cta_click"
              data-cta-type="waitlist_apply"
              data-cta-placement="waitlist_section"
            >
              Join Waitlist
              <ArrowRight className="h-4 w-4" />
            </a>

            {/* Friction reducers */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-gray-400">
              <span>Takes 2 minutes</span>
              <span className="text-gray-300">·</span>
              <span>No payment required</span>
            </div>

            {/* What happens next — 3-step mini flow */}
            <div className="mt-auto pt-6">
              <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-gray-300">
                What happens next
              </p>
              <div className="flex items-start gap-2">
                {NEXT_STEPS.map((step, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center text-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FD7E35]/10">
                      <step.icon className="h-3.5 w-3.5 text-[#FD7E35]" />
                    </div>
                    <p className="mt-1.5 text-xs font-bold text-gray-900">
                      {step.label}
                    </p>
                    <p className="text-[10px] text-gray-400">{step.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
