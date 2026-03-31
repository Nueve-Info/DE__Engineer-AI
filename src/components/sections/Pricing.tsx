import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../ui/Button'
import { BackgroundGlow } from '../ui/BackgroundGlow'
import { useCountdown } from '../../hooks/useCountdown'
import { useSpots } from '../../hooks/useSpots'
import { CheckoutModal } from '../EmbeddedCheckout'
import { trackMeta, capturePosthog } from '../../lib/analytics'
import {
  ArrowRight,
  Flame, Clock, Star, Lock, ShieldCheck,
  Video, Code2, ClipboardCheck, BookOpen, FlaskConical, Bot, Users,
  MessageCircle, Users2, Map as MapIcon, LayoutGrid, Briefcase,
  Plus,
} from 'lucide-react'

// ─── Feature type ──────────────────────────────────────────────────────────────
type FeatureIcon = React.ComponentType<{ className?: string; strokeWidth?: number }>

interface Feature {
  icon: FeatureIcon
  label: string
}

// ─── Feature lists ──────────────────────────────────────────────────────────────
const TIER1_FEATURES: Feature[] = [
  { icon: Video,           label: 'Pre-recorded step-by-step DE portfolio lessons' },
  { icon: Code2,           label: 'Live code build-along sessions' },
  { icon: ClipboardCheck,  label: 'Portfolio audit checklist (DE roles)' },
  { icon: BookOpen,        label: 'DE case study creation workflow' },
  { icon: FlaskConical,    label: 'Design system validation template' },
  { icon: Bot,             label: 'Case study AI Agent' },
]

const TIER2_EXTRAS: Feature[] = [
  { icon: MessageCircle, label: '3 personalised 1:1 mentor feedback sessions' },
  { icon: Users2,        label: 'Weekly group accountability check-ins' },
  { icon: Lock,          label: 'Private Discord community' },
  { icon: MapIcon,       label: 'Personalised DE career roadmap' },
  { icon: LayoutGrid,    label: '3 months free Grid access (job outreach tool)' },
  { icon: Briefcase,     label: 'Curated DE job opportunities board' },
]

// ─── Tier definitions ───────────────────────────────────────────────────────────
interface Tier {
  id: 1 | 2 | 3
  name: string
  price: number
  tagline: string
  badge: string | null
  access: string
  priceId: string
  extraFeatures: Feature[]
  inheritLabel: string | null
  inheritNote: string | null
  isDark: boolean
  isPopular: boolean
}

const TIERS: Tier[] = [
  {
    id: 1,
    name: 'Do It Yourself - NueveFolio Sub',
    price: 9,
    tagline: 'Build your portfolio solo — AI does the heavy lifting.',
    badge: null,
    access: 'NueveFolio Subscription — new course every month',
    priceId: import.meta.env.VITE_STRIPE_DE_TIER1_PRICE_ID ?? '',
    extraFeatures: TIER1_FEATURES,
    inheritLabel: null,
    inheritNote: null,
    isDark: false,
    isPopular: false,
  },
  {
    id: 2,
    name: 'Mentor Support - NueveFolio Sub',
    price: 399,
    tagline: 'Mentor accountability to complete your career shift.',
    badge: null,
    access: 'NueveFolio Subscription — new course every month',
    priceId: import.meta.env.VITE_STRIPE_DE_TIER2_PRICE_ID ?? '',
    extraFeatures: TIER2_EXTRAS,
    inheritLabel: 'Everything in Do It Yourself - NueveFolio Sub, plus:',
    inheritNote: '+ all Do It Yourself - NueveFolio Sub features included',
    isDark: false,
    isPopular: false,
  },
]

// ─── Main Pricing section ────────────────────────────────────────────────────────
export function Pricing() {
  const variant = 'control'
  const { days, hours, minutes, seconds, isExpired, isPaused } = useCountdown()
  const { pctRemaining } = useSpots()
  const [selectedPriceId, setSelectedPriceId] = useState('')
  const [selectedTierName, setSelectedTierName] = useState('')
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isStripSticky, setIsStripSticky] = useState(false)
  const stripRef = useRef<HTMLDivElement>(null)

  const showTimer = !isExpired && !isPaused

  // Sticky bottom bar: appears when social-proof strip scrolls above viewport,
  // but hides again while the countdown strip is still visible.
  useEffect(() => {
    const check = () => {
      const stripEl = stripRef.current
      if (!stripEl) return

      const stripGone = stripEl.getBoundingClientRect().bottom <= 0

      // Query the countdown by ID (it's conditionally rendered, so ref can be null)
      const countdownEl = document.getElementById('pricing-countdown')
      let countdownVisible = false
      if (countdownEl) {
        const rect = countdownEl.getBoundingClientRect()
        countdownVisible = rect.bottom > 0 && rect.top < window.innerHeight
      }

      setIsStripSticky(stripGone && !countdownVisible)
    }

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(() => {
          check()
          ticking = false
        })
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    check()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleTierClick = (tier: Tier) => {
    setSelectedPriceId(tier.priceId)
    setSelectedTierName(tier.name)
    trackMeta('InitiateCheckout', {
      content_name: tier.name,
      value: tier.price,
      currency: 'USD',
    })
    capturePosthog('InitiateCheckout', {
      tier: tier.name,
      price: tier.price,
      ab_variant: variant,
    })
    setIsCheckoutOpen(true)
  }

  return (
    <section id="pricing" className="relative py-16 lg:py-24 bg-[var(--color-surface)] overflow-hidden">
      <BackgroundGlow variant="intense" />

      <div className="relative z-10 px-5 sm:px-12 lg:px-24 xl:px-36">
        {/* ── Social-proof strip (inline version) ── */}
        <motion.div
          ref={stripRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className={`mx-auto mb-12 max-w-7xl rounded-2xl border border-white/[0.06] bg-white/[0.04] px-4 py-3 sm:px-6 ${
            isStripSticky ? 'invisible' : ''
          }`}
        >
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between sm:gap-4">
            {/* Left: Stars + Avatars */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-[#FD7E35] text-[#FD7E35]" />
                ))}
              </div>
              <span className="text-xs text-white/30">|</span>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[
                    { src: '/avatars/alumni-3.png', alt: 'Student 1' },
                    { src: '/avatars/krystian.png', alt: 'Student 2' },
                    { src: '/avatars/monique.png', alt: 'Student 3' },
                  ].map((avatar, i) => (
                    <div key={i} className="h-6 w-6 overflow-hidden rounded-full border-2 border-[var(--color-surface)] sm:h-7 sm:w-7">
                      <img src={avatar.src} alt={avatar.alt} className="h-full w-full object-cover" loading="lazy" decoding="async" />
                    </div>
                  ))}
                </div>
                <span className="text-xs font-bold text-white sm:text-sm">200+ students</span>
              </div>
            </div>

            {/* Right: Guarantee */}
            <div className="group flex items-center gap-2 sm:gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 sm:h-8 sm:w-8">
                <ShieldCheck className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4" />
              </div>
              <span className="text-xs font-bold text-white sm:text-sm">30-Day Money-Back Guarantee</span>
            </div>
          </div>
        </motion.div>

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#FD7E35]/10 border border-[#FD7E35]/25 text-[#FD7E35] text-xs font-black uppercase tracking-widest mb-8">
            Limited Access
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
            Launch Your Design Engineering Career
          </h2>
          <p className="text-[var(--color-text-secondary)] text-base max-w-2xl mx-auto">
            Join the NueveFolio Subscription — instant access to the Design Engineer course plus a new course every month.
          </p>
        </motion.div>

        {/* ── Countdown strip (hidden for now) ── */}
        {false && showTimer && (
          <motion.div
            id="pricing-countdown"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mx-auto mb-14 max-w-7xl border-y border-white/[0.06] py-8"
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Left — label + clock */}
              <div className="flex flex-col items-center border-white/[0.06] md:items-start md:border-r md:pr-12">
                <div className="mb-4 flex items-center gap-2">
                  <Flame className="h-4 w-4 animate-pulse text-[#FD7E35]" />
                  <span className="text-sm font-black uppercase tracking-widest text-white/70">
                    Pioneer Access Ends
                  </span>
                </div>
                <div className="flex items-center gap-5">
                  {[
                    { value: days, label: 'Days' },
                    { value: hours, label: 'Hours' },
                    { value: minutes, label: 'Mins' },
                    { value: seconds, label: 'Secs' },
                  ].map((unit, i, arr) => (
                    <div key={unit.label} className="flex items-center gap-5">
                      <div className="flex flex-col items-center">
                        <span className="text-3xl font-black tabular-nums text-white sm:text-4xl md:text-5xl">
                          {String(unit.value).padStart(2, '0')}
                        </span>
                        <span className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/30">
                          {unit.label}
                        </span>
                      </div>
                      {i < arr.length - 1 && (
                        <span className="mb-5 text-xl font-black text-white/20">:</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — seats claimed */}
              <div className="flex flex-col items-center md:items-start md:pl-12">
                <div className="mb-4 flex items-center gap-2">
                  <Users className="h-4 w-4 text-[#FD7E35]" />
                  <span className="text-sm font-black uppercase tracking-widest text-white/70">
                    Seats claimed
                  </span>
                </div>
                <div className="flex w-full flex-col items-center md:items-start">
                  <div className="relative mt-1.5 w-4/5">
                    <div className="h-6 w-full overflow-hidden rounded-xl bg-white/[0.06] sm:h-7 md:h-9">
                      <div
                        className="h-full rounded-xl bg-[#FD7E35] transition-[width] duration-700 ease-out"
                        style={{ width: `${100 - pctRemaining}%`, boxShadow: '0 0 24px rgba(253, 126, 53, 0.4)' }}
                      />
                    </div>
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-black tabular-nums text-white">
                      {100 - pctRemaining}%
                    </span>
                  </div>
                  <span className="mt-2.5 text-[10px] font-bold uppercase tracking-widest text-white/30">
                    {pctRemaining}% seats left
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── 3-card grid ── */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 md:grid-cols-2 md:max-w-4xl lg:gap-6 items-stretch">
          {TIERS.map((tier, index) => (
            <div
              key={tier.name}
              className={`relative ${
                tier.isPopular ? 'z-10 md:scale-[1.04]' : ''
              }`}
            >
              {/* Orange glow halo — popular card */}
              {tier.isPopular && (
                <div className="absolute -inset-2 bg-gradient-to-b from-[#FD7E35]/25 to-[#FF9B60]/10 blur-2xl rounded-[1.9rem]" />
              )}

              {/* Subtle glow — dark card */}
              {tier.isDark && (
                <div
                  className="pointer-events-none absolute inset-0 rounded-[1.5rem] bg-[#FD7E35]/5 blur-[80px]"
                  aria-hidden
                />
              )}

              {/* Badge — floating above card border */}
              {tier.badge && (
                <div className="absolute -top-3.5 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#FD7E35] px-3.5 py-1 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-[#FD7E35]/30">
                  {tier.badge}
                </div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.12 }}
                className={`relative flex h-full flex-col rounded-[1.5rem] p-5 sm:p-7 ${
                  tier.isDark
                    ? 'border border-[#FD7E35]/40 bg-[var(--color-surface-dark)] text-white'
                    : tier.isPopular
                      ? 'border-2 border-[#FD7E35] bg-white'
                      : 'border border-[#FD7E35]/40 bg-white'
                }`}
              >
                {/* Name */}
                <h3
                  className={`mt-5 text-center text-xl font-black tracking-tight ${
                    tier.isDark ? 'text-white' : 'text-[var(--color-surface-dark)]'
                  }`}
                >
                  {tier.name}
                </h3>

                {/* Price */}
                <div className="mt-5 text-center">
                  <span
                    className={`text-5xl font-black ${
                      tier.isDark ? 'text-white' : 'text-[var(--color-surface-dark)]'
                    }`}
                  >
                    ${tier.price.toLocaleString()}
                  </span>
                  <p className="mt-1 text-sm font-black text-[#FD7E35]/70">
                    {tier.id === 3 ? 'One-time payment' : 'per month'}
                  </p>
                </div>

                {/* Access duration badge */}
                <div
                  className={`mt-5 flex min-h-[3rem] items-center gap-2.5 rounded-xl border px-3.5 py-2.5 ${
                    tier.isDark
                      ? 'border-[#FD7E35]/25 bg-[#FD7E35]/10'
                      : 'border-[#FD7E35]/20 bg-[#FD7E35]/[0.08]'
                  }`}
                >
                  <Clock
                    className="h-4 w-4 shrink-0 text-[#FD7E35]"
                    strokeWidth={2.5}
                  />
                  <span
                    className={`text-sm font-bold ${
                      tier.isDark ? 'text-white' : 'text-[var(--color-surface-dark)]'
                    }`}
                  >
                    {tier.access}
                  </span>
                </div>

                {/* Tagline */}
                <p
                  className={`mt-4 min-h-[2.5rem] text-sm leading-relaxed ${
                    tier.isDark ? 'text-white/60' : 'text-gray-500'
                  }`}
                >
                  {tier.tagline}
                </p>

                {/* Divider */}
                <div
                  className={`my-6 h-px ${
                    tier.isDark ? 'bg-white/[0.08]' : 'bg-black/5'
                  }`}
                />

                {/* Features */}
                <div className="flex-1">
                  <ul className="space-y-3.5">
                    {tier.inheritLabel && (
                      <li className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                            tier.isDark ? 'bg-[#FD7E35]/15' : 'bg-[#FD7E35]/10'
                          }`}
                        >
                          <Plus className="h-3 w-3 text-[#FD7E35]" />
                        </div>
                        <span
                          className={`text-sm font-black leading-snug ${
                            tier.isDark ? 'text-white/70' : 'text-[var(--color-surface-dark)]'
                          }`}
                        >
                          {tier.inheritLabel}
                        </span>
                      </li>
                    )}
                    {tier.extraFeatures.map((feature, fi) => (
                      <li key={fi} className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                            tier.isDark ? 'bg-[#FD7E35]/15' : 'bg-[#FD7E35]/10'
                          }`}
                        >
                          <feature.icon className="h-3 w-3 text-[#FD7E35]" />
                        </div>
                        <span
                          className={`text-sm font-medium leading-snug ${
                            tier.isDark ? 'text-white/70' : 'text-[var(--color-surface-dark)]'
                          }`}
                        >
                          {feature.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="mt-10">
                  <p className="mb-3 flex items-center justify-center gap-1.5 text-center text-xs font-black uppercase tracking-widest text-[#FD7E35]">
                    <Flame className="h-3 w-3" />
                    Instant Access
                  </p>
                  {tier.isDark ? (
                    <Button
                      variant="outline"
                      size="lg"
                      className="group w-full border-[#FD7E35] text-[#FD7E35] hover:bg-[#FD7E35]/5"
                      href="https://syh5xi59tr6.typeform.com/to/HtpRsu32"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant={tier.isPopular ? 'cta' : 'primary'}
                      size="lg"
                      className={`w-full ${
                        tier.isPopular
                          ? 'bg-emerald-500 hover:bg-emerald-600 shadow-[0_4px_20px_rgba(16,185,129,0.4)] hover:shadow-[0_6px_25px_rgba(16,185,129,0.6)]'
                          : 'bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/20 hover:opacity-90'
                      }`}
                      onClick={() => handleTierClick(tier)}
                    >
                      <span>{tier.id === 1 ? 'Start Free Trial' : 'Enroll Now'}</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  )}
                </div>

                {/* Trust row */}
                <div
                  className={`mt-4 flex items-center justify-center text-xs font-medium ${
                    tier.isDark ? 'text-white/30' : 'text-gray-400'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <Lock className="h-3 w-3" />
                    Secure checkout
                  </span>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Sticky bottom bar ── */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 border-t border-white/[0.08] bg-[var(--color-surface)]/90 backdrop-blur-lg ${
          isStripSticky ? '' : 'pointer-events-none invisible'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2.5 sm:justify-between sm:px-6 sm:py-3">
          {/* Stars + Students */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-[#FD7E35] text-[#FD7E35] sm:h-3.5 sm:w-3.5" />
              ))}
            </div>
            <span className="text-white/20">|</span>
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              <div className="flex -space-x-1.5 sm:-space-x-2">
                {[
                  { src: '/avatars/alumni-3.png', alt: 'Student 1' },
                  { src: '/avatars/krystian.png', alt: 'Student 2' },
                  { src: '/avatars/monique.png', alt: 'Student 3' },
                ].map((avatar, i) => (
                  <div key={i} className="h-5 w-5 overflow-hidden rounded-full border border-[var(--color-surface)] sm:h-7 sm:w-7 sm:border-2">
                    <img src={avatar.src} alt={avatar.alt} className="h-full w-full object-cover" loading="lazy" decoding="async" />
                  </div>
                ))}
              </div>
              <span className="text-[11px] font-bold text-white sm:text-sm">200+</span>
            </div>
          </div>

          {/* Guarantee — desktop */}
          <div className="group hidden items-center gap-2.5 sm:flex">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600">
              <ShieldCheck className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-sm font-bold text-white">30-Day Money-Back Guarantee</span>
          </div>
          {/* Guarantee — mobile */}
          <div className="flex items-center gap-1.5 sm:hidden">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-[11px] font-bold text-white">30-Day Guarantee</span>
          </div>
        </div>
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        priceId={selectedPriceId}
        tierName={selectedTierName}
        abVariant={variant}
        onClose={() => {
          setIsCheckoutOpen(false)
          setSelectedPriceId('')
          setSelectedTierName('')
        }}
      />
    </section>
  )
}
