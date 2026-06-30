import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { FiTrash2, FiEye } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useWishlistStore } from '@store/wishlistStore'
import { useCurrencyStore } from '@store/currencyStore'
import './WishlistItem.css'

export default function WishlistItem({ item }) {
  const { removeItem } = useWishlistStore()
  const { formatPrice } = useCurrencyStore()

  return (
    <Card className="wishlist-item card-hover">
      <div className="wishlist-image-wrapper">
        <Link to={`/product/${item.slug}`}>
          <Card.Img variant="top" src={item.image} alt={item.name} className="wishlist-image" />
        </Link>
        <Button variant="light" className="wishlist-remove-btn" onClick={() => removeItem(item.productId)}><FiTrash2 size={16} /></Button>
      </div>
      <Card.Body className="p-3">
        <Link to={`/product/${item.slug}`} className="wishlist-name">{item.name}</Link>
        <p className="wishlist-price">{formatPrice(item.price)}</p>
        <div className="wishlist-actions">
          <Button as={Link} to={`/product/${item.slug}`} variant="outline-primary" className="wishlist-btn-outline w-100"><FiEye className="me-1" /> Voir</Button>
        </div>
      </Card.Body>
    </Card>
  )
}