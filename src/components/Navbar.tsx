import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { Button } from './ui/Button'

interface NavbarProps {
  isTimerActive?: boolean
}

export function Navbar({ isTimerActive = false }: NavbarProps) {
  const location = useLocation()
  const isOfferPage = ['/p', '/b', '/l', '/a', '/j', '/i'].includes(location.pathname)

  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist')
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed left-0 right-0 z-50 bg-[var(--color-surface-dark)]/80 backdrop-blur-md border-b border-[var(--color-surface-light)]/50 transition-all duration-300 ${
        isTimerActive ? 'top-[52px] md:top-[68px]' : 'top-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 sm:h-14">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-[#FF6600] via-[#FF9933] to-[#FF6600] bg-clip-text text-transparent">
              NueveFolio Design Engineer
            </span>
          </div>

          {/* CTA Button */}
          <Button
            type="button"
            onClick={isOfferPage ? undefined : scrollToWaitlist}
            size="sm"
            className="bg-[#FD7E35] hover:bg-[#E0601A] text-white border-none rounded-full px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold shadow-[0_4px_14px_0_rgba(253,126,53,0.39)] hover:shadow-[0_6px_20px_rgba(253,126,53,0.23)] hover:-translate-y-0.5 transition-all"
            data-event="cta_click"
            data-cta-type="waitlist_apply"
            data-cta-placement="nav"
          >
            Apply Now
          </Button>
        </div>
      </div>
    </motion.nav>
  )
}
