import { motion } from 'framer-motion'
import { Container } from '../ui/Container'
import accentLogo from '../../assets/accent.png'
import behaLogo from '../../assets/beha.png'
import comarLogo from '../../assets/comar.png'
import matteLogo from '../../assets/matte.png'
import mediuLogo from '../../assets/mediu.png'
import samsungLogo from '../../assets/samsung.png'
import moniqueImage from '../../assets/Monique.png'
import krystianImage from '../../assets/krystian.png'
import alumniPhoto1 from '../../assets/pics/photo-1507003211169-0a1dd7228f2d.jpeg'

const logos = [
  { src: accentLogo, alt: 'Accent' },
  { src: behaLogo, alt: 'Beha' },
  { src: comarLogo, alt: 'Comar' },
  { src: matteLogo, alt: 'Matte' },
  { src: mediuLogo, alt: 'Medium' },
  { src: samsungLogo, alt: 'Samsung' },
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-32 sm:pt-36 pb-32 overflow-hidden bg-[var(--color-surface-dark)]">
      
      {/* Background Enhancements */}
      {/* 1. Subtle Texture (Dots) */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', 
          backgroundSize: '32px 32px' 
        }} 
      />
      
      {/* 2. Top Light Gradient (Warm Orange Glow) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% -20%, rgba(253, 126, 53, 0.15), transparent 70%)'
        }}
      />
      
      {/* 3. Secondary Ambient Glow (Bottom Left) */}
      <div 
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"
      />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-4 lg:gap-12 items-end mb-12 lg:mb-12">
          
          {/* Left Column: Badge + Title */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-primary)] text-[var(--color-primary)] text-sm font-medium mb-8 bg-[var(--color-primary)]/5 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
              Enrollment Open for Batch #04
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]"
            >
              Become a <br />
              <span className="bg-gradient-to-r from-[#FF6600] via-[#FF9933] to-[#FF6600] bg-clip-text text-transparent">Design Engineer</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 text-xl text-[var(--color-text-secondary)] font-medium"
            >
              <span className="lg:hidden">Create Live Portfolio in 24 Hours Using AI</span>
              <span className="hidden lg:inline">Build Production-Ready Portfolio in 24 Hours Using AI</span>
            </motion.p>
          </div>

          {/* Right Column: Description + CTA */}
          <div className="lg:col-span-5 lg:pb-2">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-[var(--color-text-secondary)] mb-8 leading-relaxed max-w-md"
            >
              <span className="block lg:hidden">Start building real products. Bridge the gap between Figma and production.</span>
              <span className="hidden lg:block">Stop just designing static pixels. Start building real products. Master AI-assisted coding and bridge the gap between Figma and production.</span>
            </motion.p>

            {/* Social Proof */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex items-center gap-3 mb-10"
            >
              <div className="flex -space-x-3.5">
                {[alumniPhoto1, krystianImage, moniqueImage].map((pic, i) => (
                  <img
                    key={i}
                    src={pic}
                    alt={`Alumni ${i + 1}`}
                    className="w-8 h-8 rounded-full border-2 border-[var(--color-surface-dark)] object-cover"
                  />
                ))}
              </div>
              <div className="text-sm text-[var(--color-text-secondary)]">
                <span className="font-semibold text-[var(--color-text-primary)]">Over 2,900</span> Nueve alumni
              </div>
            </motion.div>



          </div>
        </div>
      </Container>

      {/* Video Interface Card - Replaced Chat Card */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="relative w-full flex justify-center px-4 sm:px-6 lg:px-8 mt-6 lg:mt-8"
      >
        <div className="bg-white rounded-[2rem] p-4 md:p-6 shadow-2xl relative z-10 text-gray-900 max-w-4xl w-full overflow-hidden">
          <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
            <iframe 
              src="https://player.vimeo.com/video/1160304896?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1" 
              frameBorder="0" 
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '1rem' }} 
              title="Introduction"
            ></iframe>
          </div>
        </div>

        {/* Decorative Elements around card */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FD7E35]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      </motion.div>

      {/* Logo Marquee - Below Chat Card */}
      <div className="mt-24 overflow-hidden relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-16 animate-logo-scroll">
          {/* Duplicate set for seamless infinite loop */}
          {[...logos, ...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center h-12 w-32 opacity-60 hover:opacity-100 transition-opacity duration-300"
            >
              <img 
                src={logo.src} 
                alt={logo.alt} 
                className="h-full w-auto max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
