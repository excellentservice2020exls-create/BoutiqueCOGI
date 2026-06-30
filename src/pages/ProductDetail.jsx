import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Row, Col, Button, Badge, Form, Breadcrumb } from 'react-bootstrap'
import { FiHeart, FiShoppingCart, FiShare2, FiCheck, FiTruck, FiRefreshCw, FiShield } from 'react-icons/fi'
import { ClipLoader } from 'react-spinners'
import { useProductStore } from '@store/productStore'
import { useCartStore } from '@store/cartStore'
import { useWishlistStore } from '@store/wishlistStore'
import { useCurrencyStore } from '@store/currencyStore'
import { useAuthStore } from '@store/authStore'
import ProductGrid from '@components/product/ProductGrid'
import './ProductDetail.css'

export default function ProductDetail() {
  const { slug } = useParams()
  const { selectedProduct, fetchProductBySlug, isLoading } = useProductStore()
  const { addItem } = useCartStore()
  const { isInWishlist, toggleItem } = useWishlistStore()
  const { formatPrice } = useCurrencyStore()
  const { isAuthenticated } = useAuthStore()

  const [selectedVariant, setSelectedVariant] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    fetchProductBySlug(slug)
  }, [slug])

  useEffect(() => {
    if (selectedProduct?.variants?.length > 0) {
      const defaultV = selectedProduct.variants.find((v) => v.isDefault) || selectedProduct.variants[0]
      setSelectedVariant(defaultV)
    }
  }, [selectedProduct])

  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
        <ClipLoader color="#40E0D0" size={50} />
      </Container>
    )
  }

  if (!selectedProduct) {
    return (
      <Container className="py-5 text-center">
        <h2>Produit non trouvé</h2>
        <Button as={Link} to="/" className="btn-turquoise mt-3">Retour à l'accueil</Button>
      </Container>
    )
  }

  const images = selectedProduct.images || []
  const variants = selectedProduct.variants || []
  const categories = selectedProduct.categories || []
  const catalogs = selectedProduct.catalogs || []

  const handleAddToCart = () => {
    if (!isAuthenticated) return
    if (selectedVariant && selectedVariant.status === 'IN_STOCK') {
      addItem(selectedProduct, selectedVariant, quantity)
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'IN_STOCK': return <Badge bg="success"><FiCheck className="me-1" /> En stock</Badge>
      case 'OUT_OF_STOCK': return <Badge bg="danger">Rupture</Badge>
      case 'PREORDER': return <Badge bg="warning" text="dark">Précommande</Badge>
      default: return null
    }
  }

  return (
    <Container className="product-detail-page py-5">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item as={Link} to="/">Accueil</Breadcrumb.Item>
        {categories[0] && (
          <Breadcrumb.Item as={Link} to={`/category/${categories[0].slug}`}>{categories[0].name}</Breadcrumb.Item>
        )}
        <Breadcrumb.Item active>{selectedProduct.name}</Breadcrumb.Item>
      </Breadcrumb>

      <Row className="g-5">
        <Col lg={6}>
          <div className="product-gallery">
            <div className="main-image-wrapper">
              <img src={images[selectedImage]?.url || '/placeholder.jpg'} alt={selectedProduct.name} className="main-image" />
              {catalogs.map((cat) => cat.slug === 'promotions' && <Badge key={cat.id} className="gallery-badge badge-sale">Promo</Badge>)}
            </div>
            {images.length > 1 && (
              <div className="thumbnail-list">
                {images.slice(0, 4).map((img, idx) => (
                  <button key={img.id} className={`gallery-thumb ${selectedImage === idx ? 'active' : ''}`} onClick={() => setSelectedImage(idx)}>
                    <img src={img.url} alt={`${selectedProduct.name} ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>
        </Col>

        <Col lg={6}>
          <div className="product-info">
            <div className="product-meta">
              {catalogs.slice(0, 3).map((cat) => (
                <Link key={cat.id} to={`/collection/${cat.slug}`} className="catalog-tag">{cat.name}</Link>
              ))}
            </div>
            <h1 className="product-title">{selectedProduct.name}</h1>
            <p className="product-sku">Référence: {selectedVariant?.sku || selectedProduct.sku}</p>
            <div className="product-price-section">
              {selectedVariant && <span className="product-price">{formatPrice(selectedVariant.price)}</span>}
              {getStatusBadge(selectedVariant?.status)}
            </div>
            <p className="product-description">{selectedProduct.description}</p>

            {variants.length > 1 && (
              <div className="variant-section mb-4">
                <h6 className="variant-label">Variantes:</h6>
                <div className="variant-list">
                  {variants.map((variant) => (
                    <button key={variant.id} className={`variant-btn ${selectedVariant?.id === variant.id ? 'active' : ''}`} onClick={() => setSelectedVariant(variant)}>
                      {variant.color && <span className="variant-color" style={{ background: variant.color }} />}
                      {variant.size && <span className="variant-size">{variant.size}</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="product-actions-section">
              <div className="quantity-selector">
                <Button variant="light" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</Button>
                <Form.Control type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="qty-field" />
                <Button variant="light" onClick={() => setQuantity(quantity + 1)}>+</Button>
              </div>
              <Button className="btn-turquoise add-to-cart-btn" onClick={handleAddToCart} disabled={!isAuthenticated || selectedVariant?.status !== 'IN_STOCK'}>
                <FiShoppingCart className="me-2" />
                {isAuthenticated ? 'Ajouter au panier' : 'Connectez-vous pour commander'}
              </Button>
              <Button variant="light" className={`wishlist-btn ${isInWishlist(selectedProduct.id) ? 'active' : ''}`} onClick={() => toggleItem(selectedProduct)}>
                <FiHeart />
              </Button>
              <Button variant="light" className="share-btn"><FiShare2 /></Button>
            </div>

            <div className="product-guarantees">
              <div className="guarantee-item"><FiTruck /> Livraison rapide</div>
              <div className="guarantee-item"><FiRefreshCw /> Retours sous 14 jours</div>
              <div className="guarantee-item"><FiShield /> Paiement sécurisé</div>
            </div>

            <div className="product-categories-detail">
              <strong>Catégories:</strong>
              {categories.map((cat) => <Link key={cat.id} to={`/category/${cat.slug}`} className="category-link">{cat.name}</Link>)}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}