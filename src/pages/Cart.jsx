import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FiShoppingBag, FiArrowRight } from 'react-icons/fi'
import { useCartStore } from '@store/cartStore'
import { useAuthStore } from '@store/authStore'
import CartItem from '@components/cart/CartItem'
import CartSummary from '@components/cart/CartSummary'
import './Cart.css'

export default function Cart() {
  const { items } = useCartStore()
  const { isAuthenticated } = useAuthStore()

  if (items.length === 0) {
    return (
      <Container className="cart-page py-5 text-center">
        <div className="empty-cart">
          <FiShoppingBag size={64} className="text-muted mb-4" />
          <h2>Votre panier est vide</h2>
          <p className="text-muted mb-4">Découvrez nos produits et ajoutez-les à votre panier</p>
          <Button as={Link} to="/" className="btn-turquoise">
            Continuer les achats <FiArrowRight className="ms-2" />
          </Button>
        </div>
      </Container>
    )
  }

  return (
    <Container className="cart-page py-5">
      <h1 className="cart-title mb-4">Mon Panier</h1>

      <Row className="g-4">
        <Col lg={8}>
          <div className="cart-items">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </Col>
        <Col lg={4}>
          <CartSummary />
        </Col>
      </Row>
    </Container>
  )
}
