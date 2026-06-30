import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { useCurrencyStore } from '@store/currencyStore'
import { FiDollarSign } from 'react-icons/fi'
import './CurrencySelector.css'

export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrencyStore()
  const currencies = [
    { code: 'USD', symbol: '$', name: 'Dollar americain' },
    { code: 'CDF', symbol: 'FC', name: 'Franc Congolais' },
  ]
  const current = currencies.find((c) => c.code === currency)
  return (
    <Dropdown className="currency-selector">
      <Dropdown.Toggle variant="link" className="currency-toggle-btn"><FiDollarSign className="me-1" />{current?.symbol} {current?.code}</Dropdown.Toggle>
      <Dropdown.Menu className="currency-dropdown-menu">
        {currencies.map((curr) => (
          <Dropdown.Item key={curr.code} active={currency === curr.code} onClick={() => setCurrency(curr.code)} className="currency-item">
            <span className="currency-symbol">{curr.symbol}</span><span className="currency-name">{curr.name}</span><span className="currency-code">{curr.code}</span>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}