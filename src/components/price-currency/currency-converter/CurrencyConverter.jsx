import React, { useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import { useCurrencyStore } from '@store/currencyStore'
import { FiArrowRight, FiRefreshCw } from 'react-icons/fi'
import './CurrencyConverter.css'

export default function CurrencyConverter() {
  const { currency, exchangeRate } = useCurrencyStore()
  const [amount, setAmount] = useState('')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const convert = () => {
    const val = parseFloat(amount)
    if (isNaN(val)) return { usd: 0, cdf: 0 }
    if (fromCurrency === 'USD') return { usd: val, cdf: val * exchangeRate }
    return { usd: val / exchangeRate, cdf: val }
  }
  const result = convert()
  return (
    <Card className="converter-card">
      <Card.Body className="p-4">
        <h4 className="converter-title mb-4"><FiRefreshCw className="me-2" />Convertisseur</h4>
        <div className="converter-form">
          <Form.Group className="mb-3">
            <Form.Label>Montant</Form.Label>
            <Form.Control type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Entrez un montant" className="converter-input" />
          </Form.Group>
          <div className="converter-direction mb-3">
            <Button variant="outline-secondary" className={`currency-btn ${fromCurrency === 'USD' ? 'active' : ''}`} onClick={() => setFromCurrency('USD')}>USD</Button>
            <FiArrowRight className="converter-arrow" />
            <Button variant="outline-secondary" className={`currency-btn ${fromCurrency === 'CDF' ? 'active' : ''}`} onClick={() => setFromCurrency('CDF')}>CDF</Button>
          </div>
          {amount && (
            <div className="converter-result">
              <div className="result-item"><span className="result-label">USD:</span><span className="result-value">${result.usd.toFixed(2)}</span></div>
              <div className="result-item"><span className="result-label">CDF:</span><span className="result-value">{result.cdf.toLocaleString('fr-CD')} FC</span></div>
            </div>
          )}
          <div className="converter-rate mt-3"><small className="text-muted">Taux: 1 USD = {exchangeRate.toLocaleString()} CDF</small></div>
        </div>
      </Card.Body>
    </Card>
  )
}