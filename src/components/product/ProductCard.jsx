import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Badge, Button } from 'react-bootstrap'
import { FiHeart, FiShoppingCart, FiEye } from 'react-icons/fi'
import { useCurrencyStore } from '@store/currencyStore'
import { useWishlistStore } from '@store/wishlistStore'
import { useCartStore } from '@store/cartStore'
import { useAuthStore } from '@store/authStore'
import './ProductCard.css'

export default function ProductCard({ product }) {
  const { formatPrice } = useCurrencyStore()
  const { isInWishlist, toggleItem } = useWishlistStore()
  const { addItem } = useCartStore()
  const { isAuthenticated } = useAuthStore()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const defaultVariant = product.variants?.find((v) => v.isDefault) || product.variants?.[0]
  const mainImage = product.images?.find((img) => img.isMain) || product.images?.[0]
  const allImages = product.images?.slice(0, 3) || []
  const categories = product.categories?.slice(0, 4) || []
  const catalogs = product.catalogs?.slice(0, 3) || []

  const getStatusBadge = (status) => {
    switch (status) {
      case 'IN_STOCK': return <Badge bg="success">En stock</Badge>
      case 'OUT_OF_STOCK': return <Badge bg="danger">Rupture</Badge>
      case 'PREORDER': return <Badge bg="warning" text="dark">Precommande</Badge>
      default: return null
    }
  }

  const getCatalogBadge = (catalog) => {
    switch (catalog.slug) {
      case 'nouveautes': return <Badge className="catalog-badge badge-new">Nouveau</Badge>
      case 'promotions': return <Badge className="catalog-badge badge-sale">Promo</Badge>
      default: return null
    }
  }

  const handleAddToCart = (e) => {
    e.preventDefault(); e.stopPropagation()
    if (!isAuthenticated) return
    if (defaultVariant && defaultVariant.status === 'IN_STOCK') addItem(product, defaultVariant, 1)
  }

  const handleWishlist = (e) => { e.preventDefault(); e.stopPropagation(); toggleItem(product) }

  return (
    <Card className="product-card card-hover">
      <div className="product-image-wrapper">
        <Link to={`/product/${product.slug}`}>
          <Card.Img variant="top" src={mainImage?.url || '/placeholder.jpg'} alt={product.name} className="product-image" />
        </Link>
        <div className="product-badges-top">
          {catalogs.map((catalog) => (<React.Fragment key={catalog.id}>{getCatalogBadge(catalog)}</React.Fragment>))}
        </div>
        <div className="product-badges-bottom">{getStatusBadge(defaultVariant?.status)}</div>
        <div className="product-actions">
          <Button variant="light" className={`action-btn ${isInWishlist(product.id) ? 'active' : ''}`} onClick={handleWishlist} title="Ajouter aux favoris"><FiHeart size={18} /></Button>
          <Button variant="light" className="action-btn" as={Link} to={`/product/${product.slug}`} title="Voir le produit"><FiEye size={18} /></Button>
          {isAuthenticated && defaultVariant?.status === 'IN_STOCK' && (
            <Button variant="light" className="action-btn" onClick={handleAddToCart} title="Ajouter au panier"><FiShoppingCart size={18} /></Button>
          )}
        </div>
        {allImages.length > 1 && (
          <div className="product-thumbnails">
            {allImages.map((img, index) => (
              <button key={img.id} className={`thumbnail-btn ${currentImageIndex === index ? 'active' : ''}`} onMouseEnter={() => setCurrentImageIndex(index)}>
                <img src={img.url} alt={`${product.name} - ${index + 1}`} />
              </button>
            ))}
          </div>
        )}
      </div>
      <Card.Body className="product-body">
        <Link to={`/product/${product.slug}`} className="product-link"><Card.Title className="product-name">{product.name}</Card.Title></Link>
        <Card.Text className="product-description">
          {product.description?.substring(0, 80)}{product.description?.length > 80 ? '...' : ''}
        </Card.Text>
        <div className="product-categories">
          {categories.map((cat) => (<Link key={cat.id} to={`/category/${cat.slug}`} className="category-tag">{cat.name}</Link>))}
        </div>
        <div className="product-price">
          {defaultVariant ? (<span className="price-current">{formatPrice(defaultVariant.price)}</span>) : (<span className="price-unavailable">Prix non disponible</span>)}
        </div>
      </Card.Body>
    </Card>
  )
}