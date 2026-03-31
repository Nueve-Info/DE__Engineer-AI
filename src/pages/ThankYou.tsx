import { Container } from '../components/ui/Container'
import { BackgroundGlow } from '../components/ui/BackgroundGlow'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { trackMeta, capturePosthog } from '../lib/analytics'
import {
  Mail,
  MonitorPlay,
  Wand2,
  CalendarCheck,
  ShieldCheck,
} from 'lucide-react'

const STEPS = [
  {
    icon: Mail,
    title: 'Check your inbox',
    description: 'Welcome email with login credentials arrives instantly.',
  },
  {
    icon: MonitorPlay,
    title: 'Start your first course',
    description: 'Instant access to the full course on the NueveFolio platform.',
  },
  {
    icon: Wand2,
    title: 'Build with AI',
    description: 'Use AI tools to build your portfolio and ship real projects.',
  },
  {
    icon: CalendarCheck,
    title: 'Learn a new AI skill each month',
    description: 'A new course drops every month as part of your NueveFolio subscription.',
  },
]

export function ThankYou() {
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const sessionId = searchParams.get('session_id')

    trackMeta('Purchase', {
      content_name: 'NueveFolio Design Engineer',
      currency: 'USD',
    })

    capturePosthog('Purchase', {
      session_id: sessionId,
      path: window.location.pathname,
    })
  }, [searchParams])

  return (
    <main className="min-h-screen bg-[var(--color-surface-dark)] text-[var(--color-text-primary)] relative overflow-hidden flex items-center justify-center py-20">
      <BackgroundGlow variant="intense" />

      <Container className="relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 15,
              delay: 0.1,
            }}
            className="flex justify-center mb-12"
          >
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full bg-emerald-500/20 blur-2xl"
              />
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-emerald-500/30 to-emerald-500/5 flex items-center justify-center border border-emerald-500/40 shadow-[0_0_60px_rgba(16,185,129,0.3)] backdrop-blur-md"
              >
                <motion.svg
                  className="w-14 h-14 sm:w-16 sm:h-16 text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
              </motion.div>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-4 gradient-text">
              You're In!
            </h1>
          </motion.div>

          {/* Subscription confirmation */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl sm:text-2xl text-[var(--color-text-secondary)] mb-4 font-medium"
          >
            Your NueveFolio subscription is now active
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="text-sm text-white/40 mb-12"
          >
            Your 3-day free trial has started — you won't be charged until it ends.
          </motion.p>

          {/* Next Steps Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 20,
              delay: 0.5,
            }}
            className="relative bg-gradient-to-br from-[var(--color-surface-dark)] to-[var(--color-surface)] rounded-2xl p-8 sm:p-10 border border-white/10 max-w-xl mx-auto text-left"
          >
            <p className="text-[10px] font-black uppercase tracking-widest text-[#FD7E35] mb-1">
              Next Steps
            </p>
            <h3 className="text-lg font-black tracking-tight text-white mb-8">
              What happens now
            </h3>

            <ol className="flex flex-col gap-0">
              {STEPS.map((step, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="relative flex gap-5 pb-7"
                >
                  {/* Timeline connector */}
                  {i < STEPS.length - 1 && (
                    <div className="absolute left-[23px] top-[50px] bottom-0 w-px bg-[#FD7E35]/15" />
                  )}

                  {/* Step number */}
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FD7E35]/10">
                    <span className="text-base font-black text-[#FD7E35]">{i + 1}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <p className="flex items-center gap-2 text-base font-bold text-white">
                      <step.icon className="h-[18px] w-[18px] text-[#FD7E35]/60" strokeWidth={1.5} />
                      {step.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-white/50">
                      {step.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>

            {/* Incoming courses */}
            <div className="mt-2 rounded-xl border border-[#FD7E35]/15 bg-[#FD7E35]/[0.04] p-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#FD7E35]">
                Incoming courses
              </p>
              <p className="mt-1 text-xs text-white/40">
                Included in your subscription — no extra cost
              </p>
              <ul className="mt-3 space-y-2">
                <li className="flex items-center gap-2 text-sm text-white/60">
                  <CalendarCheck className="h-4 w-4 shrink-0 text-[#FD7E35]/50" />
                  <span>C.R.A.F.T. launching mid-April</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-white/60">
                  <CalendarCheck className="h-4 w-4 shrink-0 text-[#FD7E35]/50" />
                  <span>New course launching mid-May</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Trust footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 flex items-center justify-center gap-2 text-xs text-white/30"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Cancel anytime · 30-day money-back guarantee</span>
          </motion.div>
        </div>
      </Container>
    </main>
  )
}
