import React, { useState } from 'react'
import { Table, Badge } from 'react-bootstrap'
import { FiClock, FiTrendingUp } from 'react-icons/fi'
import { useCurrencyStore } from '@store/currencyStore'
import './ExchangeRates.css'

export default function ExchangeRates() {
  const { exchangeRate, lastUpdated } = useCurrencyStore()
  const [rates] = useState([{ from: 'USD', to: 'CDF', rate: exchangeRate, trend: 'stable', updated: lastUpdated || new Date().toISOString() }])
  const formatDate = (dateString) => {
    if (!dateString) return 'Non mis a jour'
    const date = new Date(dateString)
    return date.toLocaleString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  }
  return (
    <div className="exchange-rates">
      <div className="rates-header d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0"><FiClock className="me-2" />Taux de change</h5>
        <Badge bg="info" className="rates-badge">Mis a jour: {formatDate(lastUpdated)}</Badge>
      </div>
      <Table responsive className="rates-table">
        <thead><tr><th>De</th><th>Vers</th><th>Taux</th><th>Tendance</th><th>Derniere MAJ</th></tr></thead>
        <tbody>
          {rates.map((rate, index) => (
            <tr key={index}><td><strong>{rate.from}</strong></td><td><strong>{rate.to}</strong></td><td className="rate-value">{rate.rate.toLocaleString()}</td><td><FiTrendingUp className="trend-stable" /></td><td className="text-muted">{formatDate(rate.updated)}</td></tr>
          ))}
        </tbody>
      </Table>
      <div className="rates-note text-muted"><small>Les taux sont mis a jour manuellement a 08h00, 12h00 et 16h00.</small></div>
    </div>
  )
}