import { Hero } from '../components/sections/Hero'
import { IndustrySplit } from '../components/sections/IndustrySplit'
import { Transformation } from '../components/sections/Transformation'
import { PortfolioSystem } from '../components/sections/PortfolioSystem'
import { Mentors } from '../components/sections/Mentors'
import { Curriculum } from '../components/sections/Curriculum'
import { SneakPeek } from '../components/sections/SneakPeek'
import { WhoIsFor } from '../components/sections/WhoIsFor'
import { SocialProof } from '../components/sections/SocialProof'
import { Pricing } from '../components/sections/Pricing'
import { FAQ } from '../components/sections/FAQ'
import { FinalCTA } from '../components/sections/FinalCTA'
import { Footer } from '../components/sections/Footer'
import { LeadMagnetSection } from '../components/sections/LeadMagnetSection'
import { LeadMagnetPopup } from '../components/sections/LeadMagnetPopup'
import { Navbar } from '../components/Navbar'
import { AnnouncementBar } from '../components/AnnouncementBar'
import { useCountdown } from '../hooks/useCountdown'
import { usePriceTest } from '../experiments/priceTest'
import { useLeadMagnetTrigger } from '../hooks/useLeadMagnetTrigger'

export function OriginalLanding() {
  const { price, priceLabel, priceId, variant } = usePriceTest()
  useCountdown() // keep hook active for storage key
  const isTimerActive = false // countdown hidden for now
  const { showPopup, dismissPopup } = useLeadMagnetTrigger(false)

  return (
    <main className="min-h-screen">
      <AnnouncementBar />
      <Navbar priceOverride={priceLabel} isTimerActive={isTimerActive} />
      <Hero />
      <IndustrySplit />
      <Transformation />
      <PortfolioSystem />
      <Mentors />
      <Curriculum />
      <SneakPeek />
      <WhoIsFor />
      <SocialProof />
      <Pricing />
      <FAQ />
      <LeadMagnetSection />
      <FinalCTA price={price} priceId={priceId} variant={variant} />
      <Footer />
      <LeadMagnetPopup isOpen={showPopup} onClose={dismissPopup} />
    </main>
  )
}
