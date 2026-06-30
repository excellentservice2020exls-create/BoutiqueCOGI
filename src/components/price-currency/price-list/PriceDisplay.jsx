import React from 'react'
import { useCurrencyStore } from '@store/currencyStore'
import './PriceDisplay.css'

export default function PriceDisplay({ priceInCents, className = '', showCurrency = true }) {
  const { formatPrice, currency } = useCurrencyStore()
  const formatted = formatPrice(priceInCents)
  return (
    <span className={`price-display ${className}`}>
      <span className="price-amount">{formatted}</span>
      {showCurrency && <span className="price-currency-tag">{currency}</span>}
    </span>
  )
}