import React from 'react'
import { Row, Col } from 'react-bootstrap'
import ProductCard from './ProductCard'
import { ClipLoader } from 'react-spinners'
import './ProductGrid.css'

export default function ProductGrid({ products, isLoading, title, subtitle }) {
  if (isLoading) return (
    <div className="product-grid-loading"><ClipLoader color="#40E0D0" size={50} /><p className="mt-3 text-muted">Chargement des produits...</p></div>
  )
  if (!products || products.length === 0) return (
    <div className="product-grid-empty"><div className="empty-icon">📦</div><h3>Aucun produit trouve</h3><p className="text-muted">Revenez plus tard pour decouvrir nos nouveautes.</p></div>
  )
  return (
    <section className="product-grid-section">
      {(title || subtitle) && (
        <div className="product-grid-header text-center mb-5">
          {title && <h2 className="section-title">{title}</h2>}
          {subtitle && <p className="text-muted">{subtitle}</p>}
        </div>
      )}
      <Row className="g-4">
        {products.map((product) => (<Col key={product.id} xs={6} md={4} lg={3}><ProductCard product={product} /></Col>))}
      </Row>
    </section>
  )
}