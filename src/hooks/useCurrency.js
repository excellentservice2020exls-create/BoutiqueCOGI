import { useCurrencyStore } from '@store/currencyStore'

export function useCurrency() {
  const store = useCurrencyStore()
  return { currency: store.currency, exchangeRate: store.exchangeRate, setCurrency: store.setCurrency, convertPrice: store.convertPrice, formatPrice: store.formatPrice }
}