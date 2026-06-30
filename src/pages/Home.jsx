import React, { useEffect } from 'react'
import { Container, Row, Col, Button, Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiShoppingBag, FiTruck, FiShield, FiHeadphones } from 'react-icons/fi'
import { useProductStore } from '@store/productStore'
import ProductGrid from '@components/product/ProductGrid'
import Newsletter from '@components/newsLetter/Newsletter'
import './Home.css'

const features = [
  { icon: FiShoppingBag, title: 'Large Choix', desc: 'Des milliers de produits tendance' },
  { icon: FiTruck, title: 'Livraison Rapide', desc: 'Partout en RDC' },
  { icon: FiShield, title: 'Paiement Sécurisé', desc: 'Via WhatsApp' },
  { icon: FiHeadphones, title: 'Support 24/7', desc: "À votre écoute" },
]

const heroSlides = [
  {
    image: '/images/hero-1.jpg',
    title: 'Nouvelle Collection',
    subtitle: 'Découvrez les dernières tendances mode',
    cta: 'Découvrir',
    link: '/collection/nouveautes',
  },
  {
    image: '/images/hero-2.jpg',
    title: 'Promotions Spéciales',
    subtitle: "Jusqu'à 50% de réduction",
    cta: 'Profiter',
    link: '/collection/promotions',
  },
]

export default function Home() {
  const {
    featuredProducts,
    newArrivals,
    promotions,
    fetchFeatured,
    fetchNewArrivals,
    fetchPromotions,
    isLoading,
  } = useProductStore()

  useEffect(() => {
    fetchFeatured()
    fetchNewArrivals()
    fetchPromotions()
  }, [])

  return (
    <div className="home-page">
      {/* Hero Carousel */}
      <section className="hero-section">
        <Carousel indicators={false} controls={true} fade>
          {heroSlides.map((slide, index) => (
            <Carousel.Item key={index}>
              <div
                className="hero-slide"
                style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.image})` }}
              >
                <Container>
                  <div className="hero-content">
                    <h1 className="hero-title animate-fade-in">{slide.title}</h1>
                    <p className="hero-subtitle animate-fade-in">{slide.subtitle}</p>
                    <Button as={Link} to={slide.link} className="btn-turquoise hero-cta">
                      {slide.cta} <FiArrowRight className="ms-2" />
                    </Button>
                  </div>
                </Container>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>

      {/* Features */}
      <section className="features-section">
        <Container>
          <Row className="g-4">
            {features.map((feature, index) => (
              <Col key={index} xs={6} lg={3}>
                <div className="feature-card text-center">
                  <div className="feature-icon">
                    <feature.icon size={28} />
                  </div>
                  <h5 className="feature-title">{feature.title}</h5>
                  <p className="feature-desc">{feature.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* New Arrivals */}
      <section className="products-section">
        <Container>
          <ProductGrid
            products={newArrivals}
            isLoading={isLoading}
            title="Nouveautés"
            subtitle="Les derniers produits ajoutés à notre collection"
          />
          <div className="text-center mt-4">
            <Button as={Link} to="/collection/nouveautes" variant="outline-primary" className="rounded-pill px-4">
              Voir tout <FiArrowRight className="ms-2" />
            </Button>
          </div>
        </Container>
      </section>

      {/* Promotions Banner */}
      <section className="promo-banner">
        <Container>
          <div className="promo-content text-center">
            <h2 className="promo-title">Soldes d'Été</h2>
            <p className="promo-text">Profitez de réductions exceptionnelles sur une sélection de produits</p>
            <Button as={Link} to="/collection/promotions" className="btn-rose">
              Voir les promotions
            </Button>
          </div>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="products-section">
        <Container>
          <ProductGrid
            products={featuredProducts}
            isLoading={isLoading}
            title="Nos Favoris"
            subtitle="Les produits les plus appréciés par nos clients"
          />
        </Container>
      </section>

      {/* Newsletter */}
      <Container>
        <Newsletter />
      </Container>
    </div>
  )
}