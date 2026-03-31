import { motion } from 'framer-motion'
import { Container } from '../ui/Container'
import portImage from '../../assets/port.png'

export function Mentors() {
  return (
    <section className="py-24 bg-[var(--color-surface-dark)] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-primary)]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Visuals */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative flex justify-center lg:justify-end pr-8"
          >
            <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
              {/* Main Image from port.png */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 w-full h-full"
              >
                <img 
                  src={portImage} 
                  alt="Learn from pros" 
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </motion.div>

              {/* Decorative Circle behind */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary)]/20 to-transparent rounded-full blur-3xl -z-10" />
            </div>
          </motion.div>

          {/* Right Column: Content */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Learn from <span className="text-[var(--color-primary)]">pros</span>
            </h2>
            
            <p className="text-lg text-[var(--color-text-secondary)] mb-8 leading-relaxed">
              At NueveFolio, you’ll learn Silicon Valley design techniques from our mentor. He has 10 years of industry experience and has worked with global companies like Vans and Mattel (the makers of Barbie). Thanks to him, you’ll find out which techniques are actually used in practice - and which should stay on campus.
            </p>

            <ul className="space-y-4">
              {[
                "Silicon Valley AI techniques",
                "24/7 access to a mentor"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="text-lg font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
