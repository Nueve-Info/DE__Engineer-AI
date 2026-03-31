import { useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'
import { BackgroundGlow } from '../components/ui/BackgroundGlow'
import { Navbar } from '../components/Navbar'
import { LogoMarquee } from '../components/sections/LogoMarquee'
import { Footer } from '../components/sections/Footer'
import malgosiaImage from '../assets/pics/photo-1438761681033-6461ffad8d80.jpeg'
import slawekImage from '../assets/pics/slawek.png'
import krystianImage from '../assets/krystian.png'
import moniqueImage from '../assets/Monique.png'

const StatPill = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-primary)] text-[var(--color-primary)] text-sm font-medium bg-[var(--color-primary)]/5 backdrop-blur-sm">
    <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
    {children}
  </div>
)

export function ValueOS() {
  const price = 17
  const priceLabel = `$${price}`
  const ctaLabel = `Join at the lowest price (${priceLabel})`

  // Countdown to February 18, 2026 at 11:59 PM PST (UTC-8)
  const targetDate = useMemo(() => new Date('2026-02-19T07:59:00Z'), []) // 11:59 PM PST = 07:59 AM UTC next day

  const [timeLeft, setTimeLeft] = useState(() => {
    const now = new Date()
    const diff = Math.max(0, targetDate.getTime() - now.getTime())
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000)
    }
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const diff = Math.max(0, targetDate.getTime() - now.getTime())
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000)
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const valueItems = useMemo(
    () => [
      { name: 'AI for Designers guideline', value: '$75' },
      { name: 'Ready-to-use prompts', value: '$25' },
      { name: 'Over 12h of video lessons', value: '$125' },
      { name: 'Portfolio checklist', value: '$19' },
      { name: 'AI Career Assistant', value: '$25' },
      { name: 'Access to NueveFolio Community', value: '$15' },
      { name: 'Case study template', value: '$19' },
      { name: 'Claude Code guide for designers', value: '$85' },
      { name: '1:1 strategy session during program', value: '$120' }
    ],
    []
  )

  return (
    <main className="min-h-screen bg-[var(--color-surface-dark)]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 sm:pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% -20%, rgba(253, 126, 53, 0.18), transparent 70%)'
          }}
        />
        <div className="absolute bottom-0 left-0 w-[520px] h-[520px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <StatPill>🔥EARLY BIRD DISCOUNT🔥</StatPill>
              <div className="mt-3 text-sm text-[var(--color-text-muted)]">
                Secure your spot at the lowest price before 11:59 PM on Wednesday, February 18 (PST).
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }}>
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                {[
                  { label: 'Days', value: String(timeLeft.days).padStart(2, '0') },
                  { label: 'Hrs', value: String(timeLeft.hours).padStart(2, '0') },
                  { label: 'Min', value: String(timeLeft.minutes).padStart(2, '0') },
                  { label: 'Sec', value: String(timeLeft.seconds).padStart(2, '0') }
                ].map((b) => (
                  <div
                    key={b.label}
                    className="w-[88px] sm:w-[96px] bg-[var(--color-surface)]/80 backdrop-blur-sm rounded-2xl border border-[var(--color-surface-light)] p-4"
                  >
                    <div className="text-3xl font-bold text-[var(--color-text-primary)]">{b.value}</div>
                    <div className="mt-1 text-xs uppercase tracking-wider text-[var(--color-text-muted)]">{b.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-8"
            >
              <span className="bg-gradient-to-r from-[#FF6600] via-[#FF9933] to-[#FF6600] bg-clip-text text-transparent">
                “I can’t believe
              </span>{' '}
              I finally finished my portfolio.”
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14 }}
              className="text-lg sm:text-xl text-[var(--color-text-secondary)] mb-10 max-w-2xl mx-auto"
            >
              - Kamil G. | Senior Designer at Stampli
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
              <Button
                type="button"
                onClick={() => window.location.assign('https://buy.stripe.com/fZu4gy8bF7592k9adogA81I')}
                size="lg"
                className="bg-[#FD7E35] hover:bg-[#E0601A] text-white border-none rounded-full px-8 font-semibold text-lg shadow-[0_4px_14px_0_rgba(253,126,53,0.39)] hover:shadow-[0_6px_20px_rgba(253,126,53,0.23)] hover:-translate-y-1 transition-all"
                data-event="cta_click"
                data-cta-type="join_17"
                data-cta-placement="hero"
              >
                {ctaLabel}
              </Button>
            </motion.div>
          </div>
        </Container>
      </section>

      <LogoMarquee />

      {/* Waitlist / Pricing */}
      <section id="offer" className="relative py-24 bg-[var(--color-surface)] overflow-hidden">
        <BackgroundGlow variant="intense" />
        <Container className="relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-primary)] text-[var(--color-primary)] text-sm font-medium bg-[var(--color-primary)]/5 backdrop-blur-sm">
                🐦 EARLY BIRD OFFER 🔥
              </div>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="animate-float relative bg-gradient-to-br from-[var(--color-surface-dark)] to-[var(--color-surface)] rounded-3xl p-8 sm:p-10 border border-[var(--color-primary)]/30 glow-primary">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                <div className="relative z-10 divide-y divide-[var(--color-surface-light)] rounded-2xl border border-[var(--color-surface-light)] overflow-hidden mb-6">
                  {valueItems.map((item) => (
                    <div key={item.name} className="flex items-center justify-between p-4 bg-[var(--color-surface-dark)]/60">
                      <div className="text-[var(--color-text-primary)]">{item.name}</div>
                      <div className="text-[var(--color-text-muted)] font-semibold line-through">{item.value}</div>
                    </div>
                  ))}
                  <div className="flex items-center justify-between p-4 bg-[var(--color-surface-dark)]">
                    <div className="text-[var(--color-text-primary)] font-semibold">TOTAL</div>
                    <div className="text-[var(--color-text-primary)] font-bold line-through">$508</div>
                  </div>
                </div>

                <div className="relative z-10 text-center mb-6">
                  <div className="inline-flex items-center gap-3 mb-2">
                    <span className="bg-emerald-500 text-white text-sm font-bold px-3 py-1 rounded-full">96% OFF</span>
                  </div>
                  <div className="text-5xl sm:text-6xl font-bold bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent drop-shadow-sm">
                    {priceLabel}
                  </div>
                  <div className="mt-2 text-sm text-[var(--color-text-muted)]">
                    Early Bird available until 11:59 PM, Feb 18
                  </div>
                  <div className="mt-1 text-sm text-[var(--color-text-muted)]">Program starts: February 28, 2026</div>
                </div>

                <Button
                  type="button"
                  variant="cta"
                  size="lg"
                  className="w-full text-lg font-bold bg-emerald-500 hover:bg-emerald-600 shadow-[0_4px_20px_rgba(16,185,129,0.4)] hover:shadow-[0_6px_25px_rgba(16,185,129,0.6)] hover:scale-[1.02] transition-all duration-300 relative z-10"
                  onClick={() => window.location.assign('https://buy.stripe.com/fZu4gy8bF7592k9adogA81I')}
                  data-event="cta_click"
                  data-cta-type="join_17"
                  data-cta-placement="offer"
                >
                  {ctaLabel}
                </Button>

                <div className="relative z-10 mt-8">
                  <h3 className="text-2xl font-bold text-center mb-3 text-[var(--color-text-primary)]">
                    30-day money-back guarantee
                  </h3>
                  <p className="text-[var(--color-text-secondary)] text-center leading-relaxed">
                    Try the program for 30 days from your start date and see the results for yourself. If you feel it’s
                    not the right fit for your level or you’re not satisfied with the value, we’ll issue a full refund—no
                    questions asked.
                  </p>

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--color-text-muted)]">
                    <div className="flex items-center gap-2">
                      <span className="text-[var(--color-text-primary)] font-semibold">99%</span> satisfaction rate
                    </div>
                    <div className="flex items-center gap-2">Secure checkout</div>
                  </div>

                  <div className="mt-6 flex justify-center" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Success stories */}
      <section className="relative py-24 bg-[var(--color-surface-dark)] overflow-hidden">
        <BackgroundGlow variant="intense" />
        <Container className="relative z-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center">
              Don’t trust us. <span className="gradient-text">Trust them 👇</span>
            </h2>
            <p className="text-xl text-[var(--color-text-secondary)] text-center mb-12">
              The first edition of NueveFolio proved the system works. Here are examples of participants who landed design
              roles after completing the program.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: '„I managed to find a job as a UX designer”',
                  name: 'Malgosia O.',
                  image: malgosiaImage,
                  bullets: [
                    'Previously worked in IT technical support',
                    'Started a basic UI course with us in January 2024',
                    'Joined NueveFolio a month later',
                    'At the beginning of October the same year, she started working as a UX Designer at an SEO agency in Cracow'
                  ]
                },
                {
                  title: '„(...) This later allowed me to land a $500 project, which led to getting a full-time job.”',
                  name: 'Slawek K.',
                  image: slawekImage,
                  bullets: [
                    'Before program, he worked in customer service',
                    'He joined NueveFolio starting almost from scratch',
                    'He didn’t even finish his portfolio :)',
                    'He managed to find comissions, which eventually led to a product designer position',
                    'He currently works as a Product Designer at Santander Bank'
                  ]
                },
                {
                  title: '„I get so many projects that I can comfortably work as a freelancer.”',
                  name: 'Krystian K.',
                  image: krystianImage,
                  bullets: [
                    'Before the program, he had no experience in design, he was working with cryptocurrencies',
                    'After finishing the program, he prepared a portfolio',
                    'He currently works at an interactive agency and runs a freelance business',
                    'He created a website for Fame MMA'
                  ]
                },
                {
                  title: 'Career change success',
                  name: 'Monika M.',
                  image: moniqueImage,
                  bullets: [
                    'She wanted to transition from architecture to product design',
                    'Didn’t have a solid portfolio and wasn’t getting responses to applications',
                    'Started working as a UX/UI Designer at Pakart while still in the program',
                    'She is currently also running a freelance business'
                  ]
                }
              ].map((s) => (
                <div key={s.name} className="bg-[var(--color-surface)] rounded-2xl p-8 border border-[var(--color-surface-light)]">
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={s.image} 
                      alt={s.name} 
                      className="w-12 h-12 rounded-full object-cover border border-[var(--color-surface-light)]"
                    />
                    <div>
                      <div className="text-[var(--color-text-primary)] font-semibold">{s.name}</div>
                    </div>
                  </div>
                  <div className="text-lg font-semibold text-[var(--color-text-primary)] mb-5">{s.title}</div>
                  <ul className="space-y-2 text-[var(--color-text-secondary)]">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Community */}
      <section className="py-20 bg-[var(--color-surface-dark)] border-t border-[var(--color-surface-light)]">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
              Over <span className="gradient-text">2900</span> happy students.
            </div>
            <p className="text-[var(--color-text-secondary)]">
              We’ve managed to build a community of satisfied students. See what people like you are saying about NueveFolio courses.
            </p>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  )
}
