import { motion } from 'framer-motion'
import { Container } from '../ui/Container'

export function SneakPeek() {
  return (
    <section className="relative py-24 md:py-32 bg-[var(--color-surface-dark)] overflow-hidden">
      <Container className="relative z-10">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)]">
            Have a sneak-peek
          </h2>

          {/* Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="rounded-full border border-[#FD7E35]/30 px-4 py-1.5 text-sm font-medium text-[#FD7E35]">
              no email required
            </span>
            <span className="rounded-full border border-[#FD7E35]/30 px-4 py-1.5 text-sm font-medium text-[#FD7E35]">
              free preview
            </span>
          </div>

          {/* Copy */}
          <p className="mx-auto mt-8 max-w-lg text-lg font-medium leading-relaxed text-[var(--color-text-secondary)]">
            We know you're cautious… and that's a good thing!
          </p>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-[var(--color-text-secondary)]">
            You can preview 3 lessons from{' '}
            <span className="font-bold text-[var(--color-text-primary)]">NueveFolio 2.0</span>{' '}
            completely for free.<br />
            Check them out by clicking the button below
          </p>

          {/* CTA */}
          <div className="mt-8">
            <a
              href="https://nueve.podia.com/nueve-folio-2-0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#FD7E35] px-8 py-3 text-lg font-semibold text-white transition-all hover:bg-[#E0601A] hover:-translate-y-0.5 shadow-[0_4px_14px_0_rgba(253,126,53,0.39)]"
            >
              Preview course
            </a>
          </div>
        </motion.div>

        {/* Vimeo Embed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-16 max-w-4xl"
        >
          <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
            <iframe
              src="https://player.vimeo.com/video/1174147551?autoplay=1&loop=1&muted=1&background=1&badge=0&autopause=0&dnt=1"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '1rem' }}
              title="Sneak Peek Preview"
            />
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
