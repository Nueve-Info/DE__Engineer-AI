import { useState } from 'react'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { CheckoutModal } from '../EmbeddedCheckout'
import { trackMeta, capturePosthog } from '../../lib/analytics'

interface FinalCTAProps {
  price?: number
  priceId?: string
  variant?: string
}

export function FinalCTA({
  price = 9,
  priceId = '',
  variant = 'control',
}: FinalCTAProps) {
  const priceLabel = `$${price}/mo`
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const handleCheckout = () => {
    trackMeta('InitiateCheckout', {
      content_name: 'Nueve Design Engineer',
      value: price,
      currency: 'USD',
    })
    capturePosthog('InitiateCheckout', {
      label: 'Claim Early Adopter Access',
      path: window.location.pathname,
      ab_experiment: 'price-test',
      ab_variant: variant,
      price,
    })
    setIsCheckoutOpen(true)
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

          <Button
            type="button"
            variant="cta"
            size="lg"
            className="js-select-plan mb-8"
            onClick={handleCheckout}
            data-event="select_plan"
            data-plan-type="early_adopter"
            data-billing="subscription"
            data-price={String(price)}
            data-currency="USD"
            data-cta-placement="final_cta"
          >
            Claim Early Adopter Access ({priceLabel})
          </Button>

          {/* Trust seals */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--color-text-muted)]">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>30-Day Money Back</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Stripe Secure Checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>2,900 Students</span>
            </div>
          </div>
        </div>
      </Container>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        priceId={priceId}
        tierName="Do It Yourself - Nueve Sub"
        abVariant={variant}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </section>
  )
}
