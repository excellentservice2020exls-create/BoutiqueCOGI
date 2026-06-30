import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Offcanvas, Button, Badge } from 'react-bootstrap'
import { FiMenu, FiX, FiShoppingCart, FiHeart, FiUser, FiLogOut, FiHome } from 'react-icons/fi'
import { useAuthStore } from '@store/authStore'
import { useCartStore } from '@store/cartStore'
import { useWishlistStore } from '@store/wishlistStore'
import './Sidebar.css'

export default function Sidebar() {
  const [show, setShow] = useState(false)
  const { user, isAuthenticated, logout } = useAuthStore()
  const cartTotal = useCartStore((state) => state.getTotalItems())
  const wishlistTotal = useWishlistStore((state) => state.getTotalItems())

  const sidebarLinks = [
    { to: '/', label: 'Accueil', icon: FiHome },
    { to: '/category/femme', label: 'Femme' },
    { to: '/category/homme', label: 'Homme' },
    { to: '/category/enfant', label: 'Enfant' },
    { to: '/category/chaussures', label: 'Chaussures' },
    { to: '/category/sacs', label: 'Sacs' },
    { to: '/category/accessoires', label: 'Accessoires' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <Button variant="link" className="sidebar-toggle d-none d-lg-flex" onClick={() => setShow(true)}>
        <FiMenu size={24} />
      </Button>
      <Offcanvas show={show} onHide={() => setShow(false)} placement="start" className="sidebar-cogi">
        <Offcanvas.Header className="sidebar-header">
          <Offcanvas.Title className="sidebar-brand">
            <span className="brand-turquoise">COGI</span>
            <span className="brand-rose"> Boutique</span>
          </Offcanvas.Title>
          <Button variant="link" className="sidebar-close" onClick={() => setShow(false)}><FiX size={24} /></Button>
        </Offcanvas.Header>
        <Offcanvas.Body className="sidebar-body">
          <nav className="sidebar-nav">
            {sidebarLinks.map((link) => (
              <Link key={link.to} to={link.to} className="sidebar-link" onClick={() => setShow(false)}>
                {link.icon && <link.icon className="sidebar-link-icon" />}{link.label}
              </Link>
            ))}
          </nav>
          <hr className="sidebar-divider" />
          <Link to="/wishlist" className="sidebar-action" onClick={() => setShow(false)}>
            <FiHeart className="sidebar-action-icon" /><span>Favoris</span>
            {wishlistTotal > 0 && <Badge bg="rose" className="ms-auto badge-rose">{wishlistTotal}</Badge>}
          </Link>
          {isAuthenticated && (
            <Link to="/cart" className="sidebar-action" onClick={() => setShow(false)}>
              <FiShoppingCart className="sidebar-action-icon" /><span>Panier</span>
              {cartTotal > 0 && <Badge bg="turquoise" className="ms-auto badge-turquoise">{cartTotal}</Badge>}
            </Link>
          )}
          <div className="sidebar-auth">
            {isAuthenticated ? (
              <>
                <div className="sidebar-user">
                  <FiUser className="sidebar-user-icon" />
                  <div>
                    <p className="sidebar-user-name">{user?.user_metadata?.firstName || user?.email}</p>
                    <p className="sidebar-user-role">{user?.role === 'ADMIN' ? 'Administrateur' : 'Client'}</p>
                  </div>
                </div>
                <Link to="/profile" className="sidebar-action" onClick={() => setShow(false)}><FiUser className="sidebar-action-icon" />Mon Profil</Link>
                <button className="sidebar-action text-danger" onClick={() => { logout(); setShow(false); }}><FiLogOut className="sidebar-action-icon" />Déconnexion</button>
              </>
            ) : (
              <>
                <Link to="/login" className="sidebar-action" onClick={() => setShow(false)}><FiUser className="sidebar-action-icon" />Connexion</Link>
                <Link to="/register" className="sidebar-action" onClick={() => setShow(false)}><FiUser className="sidebar-action-icon" />Inscription</Link>
              </>
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}