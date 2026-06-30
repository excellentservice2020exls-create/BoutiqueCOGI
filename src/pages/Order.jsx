import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { FiClipboard } from 'react-icons/fi'
import { useCartStore } from '@store/cartStore'
import { useCurrencyStore } from '@store/currencyStore'
import OrderForm from '@components/order/OrderForm'
import './Order.css'

export default function Order() {
  const { items, getTotalPrice } = useCartStore()
  const { formatPrice } = useCurrencyStore()

  if (items.length === 0) {
    return (
      <Container className="order-page py-5 text-center">
        <FiClipboard size={64} className="text-muted mb-4" />
        <h2>Votre panier est vide</h2>
        <p className="text-muted">Ajoutez des produits pour passer une commande</p>
      </Container>
    )
  }

  return (
    <Container className="order-page py-5">
      <h1 className="order-title mb-4">Passer la commande</h1>
      <Row className="g-4">
        <Col lg={7}>
          <Card className="order-form-card">
            <Card.Body className="p-4">
              <h5 className="mb-4">Informations de livraison</h5>
              <OrderForm />
            </Card.Body>
          </Card>
        </Col>
        <Col lg={5}>
          <Card className="order-summary-card">
            <Card.Body className="p-4">
              <h5 className="mb-4">Récapitulatif de la commande</h5>
              <div className="order-items">
                {items.map((item) => (
                  <div key={item.id} className="order-item">
                    <div className="d-flex align-items-center gap-3">
                      <img src={item.image} alt={item.name} className="order-item-img" />
                      <div className="flex-fill">
                        <p className="order-item-name mb-0">{item.name}</p>
                        <small className="text-muted">Qté: {item.quantity}</small>
                      </div>
                      <span className="order-item-price">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                ))}
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <span className="fw-bold">Total</span>
                <span className="fw-bold text-rose">{formatPrice(getTotalPrice())}</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}