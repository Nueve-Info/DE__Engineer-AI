import { Container } from '../ui/Container'
import { trackMeta, capturePosthog } from '../../lib/analytics'

const TYPEFORM_URL = 'https://form.typeform.com/to/FqMZB3vy'

export function FinalCTA() {
  const handleApplyClick = () => {
    trackMeta('Lead', {
      content_name: 'Design Engineer Waitlist',
      content_category: 'application',
    })
    capturePosthog('WaitlistApply', {
      funnel_id: 'DE__Engineer-AI',
      cta_placement: 'final_cta',
    })
  }

  return (
    <section className="py-24 bg-[var(--color-surface)] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 via-transparent to-[var(--color-accent)]/10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-primary)] rounded-full blur-[200px] opacity-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--color-accent)] rounded-full blur-[200px] opacity-10" />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            The Industry Won't Wait.{' '}
            <span className="gradient-text">Will You?</span>
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] mb-10">
            Join the Design Engineer transformation today. Build your AI-powered portfolio this weekend.
          </p>

          <a
            href={TYPEFORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleApplyClick}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FD7E35] to-[#FF9B60] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#FD7E35]/25 transition hover:opacity-90 hover:-translate-y-0.5 mb-8"
            data-event="cta_click"
            data-cta-type="waitlist_apply"
            data-cta-placement="final_cta"
          >
            Start Your Application — Free
          </a>

          {/* Trust seals */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--color-text-muted)]">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>No Payment Required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Takes 2 Minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>200+ Students</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
