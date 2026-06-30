import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const DEFAULT_RATE = 2800

export const useCurrencyStore = create(
  persist(
    (set, get) => ({
      currency: 'USD',
      exchangeRate: DEFAULT_RATE,
      lastUpdated: null,

      setCurrency: (currency) => set({ currency }),
      setExchangeRate: (rate) => set({ exchangeRate: rate, lastUpdated: new Date().toISOString() }),

      convertPrice: (priceInCents) => {
        const { currency, exchangeRate } = get()
        if (currency === 'USD') {
          return { amount: priceInCents / 100, formatted: `$${(priceInCents / 100).toFixed(2)}`, symbol: '$' }
        }
        const amount = (priceInCents / 100) * exchangeRate
        return { amount, formatted: `${amount.toLocaleString('fr-CD')} FC`, symbol: 'FC' }
      },

      formatPrice: (priceInCents) => get().convertPrice(priceInCents).formatted,
    }),
    { name: 'cogi-currency-storage' }
  )
)