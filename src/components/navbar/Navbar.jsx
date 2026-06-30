import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar, Container, Form, Nav, Badge, Dropdown, Button } from 'react-bootstrap'
import { FiSearch, FiShoppingCart, FiHeart, FiUser, FiMenu, FiX, FiLogOut, FiSettings } from 'react-icons/fi'
import { useAuthStore } from '@store/authStore'
import { useCartStore } from '@store/cartStore'
import { useWishlistStore } from '@store/wishlistStore'
import { useCurrencyStore } from '@store/currencyStore'
import { useDebounce } from '@hooks/useDebounce'
import './Navbar.css'

export default function NavbarComponent() {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuthStore()
  const cartTotal = useCartStore((state) => state.getTotalItems())
  const wishlistTotal = useWishlistStore((state) => state.getTotalItems())
  const { currency, setCurrency } = useCurrencyStore()

  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const searchRef = useRef(null)

  const debouncedSearch = useDebounce(searchQuery, 500)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (debouncedSearch.trim()) {
      navigate(`/collection/all?search=${encodeURIComponent(debouncedSearch)}`)
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }, [debouncedSearch])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/collection/all?search=${encodeURIComponent(searchQuery)}`)
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }

  const navLinks = [
    { to: '/', label: 'Accueil' },
    { to: '/category/femme', label: 'Femme' },
    { to: '/category/homme', label: 'Homme' },
    { to: '/category/enfant', label: 'Enfant' },
    { to: '/collection/promotions', label: 'Promotions' },
    { to: '/collection/nouveautes', label: 'Nouveautés' },
  ]

  return (
    <>
      <Navbar expand="lg" className={`navbar-cogi ${scrolled ? 'scrolled' : ''}`} fixed="top">
        <Container fluid="lg">
          <Button variant="link" className="d-lg-none nav-icon-btn me-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </Button>

          <Navbar.Brand as={Link} to="/" className="navbar-brand-cogi">
            <span className="brand-turquoise">Boutique</span>
            <span className="brand-rose"> COGI</span>
          </Navbar.Brand>

          <Nav className="d-none d-lg-flex mx-auto navbar-nav-cogi">
            {navLinks.map((link) => (
              <Nav.Link key={link.to} as={Link} to={link.to} className="nav-link-cogi">{link.label}</Nav.Link>
            ))}
          </Nav>

          <div className="navbar-icons">
            <div className="search-wrapper" ref={searchRef}>
              <Button variant="link" className="nav-icon-btn" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                <FiSearch size={22} />
              </Button>
              {isSearchOpen && (
                <Form onSubmit={handleSearchSubmit} className="search-dropdown">
                  <Form.Control type="search" placeholder="Rechercher..." value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} autoFocus className="search-input" />
                </Form>
              )}
            </div>

            <Dropdown align="end">
              <Dropdown.Toggle variant="link" className="nav-icon-btn currency-toggle">{currency === 'USD' ? '$' : 'FC'}</Dropdown.Toggle>
              <Dropdown.Menu className="currency-menu">
                <Dropdown.Item active={currency === 'USD'} onClick={() => setCurrency('USD')}>USD ($)</Dropdown.Item>
                <Dropdown.Item active={currency === 'CDF'} onClick={() => setCurrency('CDF')}>CDF (FC)</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Button variant="link" as={Link} to="/wishlist" className="nav-icon-btn position-relative">
              <FiHeart size={22} />
              {wishlistTotal > 0 && <Badge bg="danger" className="nav-badge">{wishlistTotal}</Badge>}
            </Button>

            {isAuthenticated && (
              <Button variant="link" as={Link} to="/cart" className="nav-icon-btn position-relative">
                <FiShoppingCart size={22} />
                {cartTotal > 0 && <Badge bg="turquoise" className="nav-badge badge-turquoise">{cartTotal}</Badge>}
              </Button>
            )}

            {isAuthenticated ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="link" className="nav-icon-btn profile-toggle"><FiUser size={22} /></Dropdown.Toggle>
                <Dropdown.Menu className="profile-menu">
                  <Dropdown.Header>{user?.user_metadata?.firstName || user?.email}</Dropdown.Header>
                  <Dropdown.Item as={Link} to="/profile"><FiUser className="me-2" /> Mon Profil</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/orders"><FiSettings className="me-2" /> Mes Commandes</Dropdown.Item>
                  {user?.role === 'ADMIN' && <Dropdown.Item as={Link} to="/admin"><FiSettings className="me-2" /> Administration</Dropdown.Item>}
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={logout} className="text-danger"><FiLogOut className="me-2" /> Déconnexion</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button variant="link" as={Link} to="/login" className="nav-icon-btn"><FiUser size={22} /></Button>
            )}
          </div>
        </Container>
      </Navbar>

      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <span className="brand-turquoise">Boutique</span>
              <span className="brand-rose"> COGI</span>
              <Button variant="link" className="close-btn" onClick={() => setIsMobileMenuOpen(false)}><FiX size={24} /></Button>
            </div>
            <div className="mobile-menu-links">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>{link.label}</Link>
              ))}
              <Link to="/contact" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            </div>
            <div className="mobile-menu-footer">
              {!isAuthenticated ? (
                <>
                  <Button as={Link} to="/login" className="btn-turquoise w-100 mb-2">Connexion</Button>
                  <Button as={Link} to="/register" className="btn-rose w-100">Inscription</Button>
                </>
              ) : (
                <Button onClick={logout} className="btn-rose w-100">Déconnexion</Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}