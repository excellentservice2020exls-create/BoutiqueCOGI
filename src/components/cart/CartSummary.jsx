import React from 'react'
import { Card, Button, ListGroup } from 'react-bootstrap'
import { FiShoppingBag, FiArrowRight } from 'react-icons/fi'
import { useCartStore } from '@store/cartStore'
import { useCurrencyStore } from '@store/currencyStore'
import { Link } from 'react-router-dom'
import './CartSummary.css'

export default function CartSummary() {
  const { items, getTotalItems, getTotalPrice, clearCart } = useCartStore()
  const { formatPrice } = useCurrencyStore()
  const subtotal = getTotalPrice()
  const shipping = subtotal > 500000 ? 0 : 10000
  const total = subtotal + shipping

  return (
    <Card className="cart-summary">
      <Card.Body className="p-4">
        <h4 className="summary-title"><FiShoppingBag className="me-2" />Recapitulatif</h4>
        <ListGroup variant="flush" className="summary-list mb-4">
          <ListGroup.Item className="summary-item d-flex justify-content-between"><span>Sous-total ({getTotalItems()} articles)</span><span className="fw-semibold">{formatPrice(subtotal)}</span></ListGroup.Item>
          <ListGroup.Item className="summary-item d-flex justify-content-between"><span>Livraison</span><span className={shipping === 0 ? 'text-success fw-semibold' : 'fw-semibold'}>{shipping === 0 ? 'Gratuite' : formatPrice(shipping)}</span></ListGroup.Item>
          {shipping > 0 && <ListGroup.Item className="summary-note text-muted"><small>Livraison gratuite a partir de {formatPrice(500000)}</small></ListGroup.Item>}
          <ListGroup.Item className="summary-total d-flex justify-content-between"><span className="fw-bold">Total</span><span className="fw-bold text-rose">{formatPrice(total)}</span></ListGroup.Item>
        </ListGroup>
        <Button as={Link} to="/order" className="btn-turquoise w-100 mb-2" disabled={items.length === 0}>Passer la commande <FiArrowRight className="ms-2" /></Button>
        <Button variant="outline-secondary" className="w-100" onClick={clearCart} disabled={items.length === 0}>Vider le panier</Button>
      </Card.Body>
    </Card>
  )
}