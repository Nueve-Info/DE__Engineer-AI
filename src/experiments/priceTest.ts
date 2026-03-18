/**
 * Fixed pricing for the Nueve subscription model.
 * No A/B test — all users see the same prices.
 *
 * Tier 1 (Do It Yourself): $9/mo
 * Tier 2 (Mentor Support):  $399/mo
 */

interface PriceTestResult {
  price: number
  priceLabel: string
  checkoutHref: string
  priceId: string
  variant: 'control'
}

const STRIPE_PRICE_TIER1 = import.meta.env.VITE_STRIPE_DE_TIER1_PRICE_ID || ''

const RESULT: PriceTestResult = {
  price: 9,
  priceLabel: '$9/mo',
  checkoutHref: '/',
  priceId: STRIPE_PRICE_TIER1,
  variant: 'control',
}

export function usePriceTest(): PriceTestResult {
  return RESULT
}
