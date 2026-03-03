import { useState } from 'react'
import { Container } from '../ui/Container'
import { BackgroundGlow } from '../ui/BackgroundGlow'
import { ChevronDown } from 'lucide-react'

const modules = [
  {
    number: '01',
    title: 'Understand New Wave',
    subtitle: 'The rules changed. Here\u2019s what\u2019s actually happening.',
    lessons: 3,
    overview:
      'Before you build anything, you need to see the full picture. You\u2019ll explore how fast AI is actually accelerating, what that means for the 2026 job market, and why the design process you learned two years ago is already outdated.',
    bullets: [
      'Understand the AI acceleration curve and why it keeps compounding',
      'See how \u201Ceveryone can ship\u201D is reshaping hiring and team structures',
      'Learn the 2026 workflow: build \u2192 test \u2192 iterate, multiple times a day',
      'Know where Figma still fits \u2014 and where it\u2019s the bottleneck',
    ],
  },
  {
    number: '02',
    title: 'Master AI Tools',
    subtitle: 'Stop chatting with AI. Start building with it.',
    lessons: 4,
    overview:
      'You\u2019ll go from \u201CI use ChatGPT sometimes\u201D to running agentic coding assistants that build, test, and iterate on their own. Learn how to write PRDs by voice, manage AI sessions like a pro, and watch a complete app get built live from a single brief.',
    bullets: [
      'Use Claude Code and other agentic tools to ship real products',
      'Write PRDs by voice and manage context, sessions, and project memory',
      'Enable browser access so AI builds, tests, and iterates on its own',
      'Follow a live build: one PRD in, working app out',
    ],
  },
  {
    number: '03',
    title: 'Craft Your Story',
    subtitle: 'Turn your projects into stories recruiters can\u2019t scroll past.',
    lessons: 7,
    overview:
      'Your portfolio needs to sell in three seconds and hold attention for three minutes. You\u2019ll learn the FOLIO framework \u2014 a five-part case study structure that turns your projects into sharp, compelling narratives ending with a transformation worth remembering.',
    bullets: [
      'Structure case studies as stories: First Impression \u2192 Obstacle \u2192 Logic & Leverage \u2192 Iteration \u2192 Outcome',
      'Write sharp diagnoses and show strategic thinking \u2014 not generic process slides',
      'Build credibility by showing real iteration, failed experiments, and pivots',
      'Use three custom AI agents to go from project notes to a coded portfolio in 24 hours',
    ],
  },
  {
    number: '04',
    title: 'Ship It',
    subtitle: 'Knowledge without execution is worthless. Go build.',
    lessons: 1,
    overview:
      'Build a new case study over the weekend, post it for feedback, book your included portfolio review, and plug into a community that keeps you shipping.',
    bullets: [
      'Build new case studies that showcase AI-driven workflows',
      'Use the included portfolio feedback session to refine your work',
      'Join Discord and weekly office hours for ongoing support',
      'Share your process publicly and iterate based on real feedback',
    ],
  },
]

export function Curriculum() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="relative py-24 bg-[var(--color-surface-dark)] overflow-hidden">
      <BackgroundGlow variant="subtle" />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Course{' '}
            <span className="gradient-text">Curriculum</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] text-base">
            4 modules &middot; 15 lessons
          </p>
        </div>

        {/* Lesson Preview Video */}
        <div className="max-w-3xl mx-auto mb-16">
          <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
            <iframe
              src="https://player.vimeo.com/video/1160305162?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '1rem' }}
              title="Agenda"
            ></iframe>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {modules.map((module, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={index}
                className="group relative bg-[var(--color-surface)] rounded-xl border border-[var(--color-surface-light)] hover:border-[var(--color-primary)]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(253,126,53,0.1)]"
              >
                {/* Collapsed header — always visible */}
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full flex items-center gap-4 p-6 sm:p-8 text-left cursor-pointer"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--color-surface-dark)] border border-[var(--color-surface-light)] group-hover:border-[var(--color-primary)]/30 flex items-center justify-center font-mono text-lg font-bold transition-colors">
                    <span className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">
                      {module.number}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-lg font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary-light)] transition-colors">
                        {module.title}
                      </h3>
                      <span className="text-[11px] font-medium tracking-wide text-[var(--color-text-secondary)]">
                        {module.lessons} {module.lessons === 1 ? 'lesson' : 'lessons'}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)] italic mt-0.5">
                      {module.subtitle}
                    </p>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-[var(--color-text-secondary)] transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Expanded content */}
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: isOpen ? '600px' : '0px',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0">
                    <div className="border-t border-[var(--color-surface-light)] pt-6" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      {/* Left — Overview */}
                      <div>
                        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                          {module.overview}
                        </p>
                      </div>

                      {/* Right — What you'll learn */}
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)] mb-3">
                          What you'll learn
                        </h4>
                        <ul className="space-y-2.5">
                          {module.bullets.map((bullet, bi) => (
                            <li key={bi} className="flex items-start gap-2.5">
                              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-primary)]" />
                              <span className="text-sm text-[var(--color-text-secondary)] leading-snug">
                                {bullet}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
