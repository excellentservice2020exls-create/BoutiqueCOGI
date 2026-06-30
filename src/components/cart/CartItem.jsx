import React from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi'
import { useCartStore } from '@store/cartStore'
import { useCurrencyStore } from '@store/currencyStore'
import { Link } from 'react-router-dom'
import './CartItem.css'

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCartStore()
  const { formatPrice } = useCurrencyStore()

  return (
    <div className="cart-item">
      <Row className="align-items-center g-3">
        <Col xs={3} sm={2}>
          <Link to={`/product/${item.slug || '#'}`}>
            <img src={item.image} alt={item.name} className="cart-item-image" />
          </Link>
        </Col>
        <Col xs={9} sm={4}>
          <Link to={`/product/${item.slug || '#'}`} className="cart-item-name">{item.name}</Link>
          {item.color && <p className="cart-item-variant mb-0">Couleur: <span>{item.color}</span></p>}
          {item.size && <p className="cart-item-variant mb-0">Taille: <span>{item.size}</span></p>}
          <p className="cart-item-sku mb-0">Ref: {item.sku}</p>
        </Col>
        <Col xs={6} sm={3} className="text-center">
          <div className="quantity-control">
            <Button variant="light" className="qty-btn" onClick={() => updateQuantity(item.variantId, item.quantity - 1)}><FiMinus size={14} /></Button>
            <Form.Control type="number" value={item.quantity} onChange={(e) => updateQuantity(item.variantId, parseInt(e.target.value) || 1)} className="qty-input" min="1" />
            <Button variant="light" className="qty-btn" onClick={() => updateQuantity(item.variantId, item.quantity + 1)}><FiPlus size={14} /></Button>
          </div>
        </Col>
        <Col xs={4} sm={2} className="text-end">
          <p className="cart-item-price mb-0">{formatPrice(item.price * item.quantity)}</p>
          <p className="cart-item-unit-price mb-0">{formatPrice(item.price)} / unite</p>
        </Col>
        <Col xs={2} sm={1} className="text-end">
          <Button variant="link" className="cart-item-remove" onClick={() => removeItem(item.variantId)}><FiTrash2 size={18} /></Button>
        </Col>
      </Row>
    </div>
  )
}