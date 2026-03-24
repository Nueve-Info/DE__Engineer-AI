import { Hero } from '../components/sections/Hero'
import { IndustrySplit } from '../components/sections/IndustrySplit'
import { Transformation } from '../components/sections/Transformation'
import { PortfolioSystem } from '../components/sections/PortfolioSystem'
import { Mentors } from '../components/sections/Mentors'
import { Curriculum } from '../components/sections/Curriculum'
import { SneakPeek } from '../components/sections/SneakPeek'
import { WhoIsFor } from '../components/sections/WhoIsFor'
import { SocialProof } from '../components/sections/SocialProof'
import { WaitlistCTA } from '../components/sections/WaitlistCTA'
import { FAQ } from '../components/sections/FAQ'
import { FinalCTA } from '../components/sections/FinalCTA'
import { Footer } from '../components/sections/Footer'
import { LeadMagnetSection } from '../components/sections/LeadMagnetSection'
import { Navbar } from '../components/Navbar'
import { AnnouncementBar } from '../components/AnnouncementBar'
import { useCountdown } from '../hooks/useCountdown'

export function OriginalLanding() {
  useCountdown() // keep hook active for storage key
  const isTimerActive = false // countdown hidden for now

  return (
    <main className="min-h-screen">
      <AnnouncementBar />
      <Navbar isTimerActive={isTimerActive} />
      <Hero />
      <IndustrySplit />
      <Transformation />
      <PortfolioSystem />
      <Mentors />
      <Curriculum />
      <SneakPeek />
      <WhoIsFor />
      <SocialProof />
      <WaitlistCTA />
      <FAQ />
      <LeadMagnetSection />
      <FinalCTA />
      <Footer />
    </main>
  )
}
