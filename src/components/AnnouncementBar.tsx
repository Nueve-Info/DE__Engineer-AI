import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'
import { useCountdown } from '../hooks/useCountdown'

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-black text-white text-base md:text-lg tabular-nums leading-none">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[10px] md:text-xs uppercase tracking-widest text-white/80 mt-1">
        {label}
      </span>
    </div>
  )
}

export function AnnouncementBar() {
  // Countdown hidden for now
  return null

  const { days, hours, minutes, seconds, isExpired, isPaused } = useCountdown()

  if (isExpired) return null
  if (isPaused) return null

  const scrollToPricing = () => {
    const el = document.getElementById('pricing')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 cursor-pointer overflow-hidden bg-[#FD7E35]"
      onClick={scrollToPricing}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:20px_20px]" />
      </div>

      <div className="relative z-10 mx-auto flex items-center justify-center gap-4 md:gap-6 px-4 py-3 md:py-5">
        {/* Label */}
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-white shrink-0 animate-pulse" />
          <span className="text-xs md:text-sm font-black uppercase tracking-[0.2em] text-white">
            Pioneer Access Ends
          </span>
        </div>

        {/* Separator */}
        <div className="h-5 w-px bg-white/30 hidden sm:block" />

        {/* Countdown */}
        <div className="flex items-center gap-3 md:gap-4">
          <TimeBox value={days} label="Days" />
          <span className="text-white/60 text-sm font-bold">:</span>
          <TimeBox value={hours} label="Hrs" />
          <span className="text-white/60 text-sm font-bold">:</span>
          <TimeBox value={minutes} label="Min" />
          <span className="text-white/60 text-sm font-bold">:</span>
          <TimeBox value={seconds} label="Sec" />
        </div>
      </div>
    </motion.div>
  )
}
