import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { FiFacebook, FiInstagram, FiTwitter, FiPlay, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { newsletterSchema } from '@lib/contact/contactSchema'
import './Footer.css'

export default function Footer() {
  const [email, setEmail] = useState('')
  const currentYear = new Date().getFullYear()

  const handleNewsletter = (e) => {
    e.preventDefault()
    try {
      newsletterSchema.parse({ email })
      toast.success('Merci pour votre inscription !')
      setEmail('')
    } catch (error) { toast.error(error.errors?.[0]?.message || 'Email invalide') }
  }

  const catalogLinks = [
    { to: '/collection/generale', label: 'Generale' },
    { to: '/collection/nouveautes', label: 'Nouveautes' },
    { to: '/collection/promotions', label: 'Promotions' },
  ]
  const categoryLinks = [
    { to: '/category/femme', label: 'Femme' },
    { to: '/category/homme', label: 'Homme' },
    { to: '/category/enfant', label: 'Enfant' },
    { to: '/category/chaussures', label: 'Chaussures' },
    { to: '/category/sacs', label: 'Sacs' },
    { to: '/category/accessoires', label: 'Accessoires' },
  ]
  const infoLinks = [
    { to: '/contact', label: 'Contact' },
    { to: '/conditions-utilisation', label: "Conditions d'utilisation" },
    { to: '/conditions-vente', label: 'Conditions generales de vente' },
    { to: '/politique-confidentialite', label: 'Politique de confidentialite' },
    { to: '/cookies', label: 'Gestionnaire de cookies' },
  ]
  const socialLinks = [
    { icon: FiFacebook, href: 'https://facebook.com/boutiquecogi', label: 'Facebook' },
    { icon: FiInstagram, href: 'https://instagram.com/boutiquecogi', label: 'Instagram' },
    { icon: FiTwitter, href: 'https://twitter.com/boutiquecogi', label: 'Twitter' },
    { icon: FiPlay, href: 'https://tiktok.com/@boutiquecogi', label: 'TikTok' },
  ]

  return (
    <footer className="footer-cogi">
      <div className="footer-newsletter">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-3 mb-lg-0">
              <h3 className="newsletter-title">Restez informe !</h3>
              <p className="newsletter-text">Inscrivez-vous a notre newsletter pour recevoir nos offres exclusives et nouveautes.</p>
            </Col>
            <Col lg={6}>
              <Form onSubmit={handleNewsletter} className="newsletter-form">
                <Form.Control type="email" placeholder="Votre adresse email" value={email} onChange={(e) => setEmail(e.target.value)} className="newsletter-input" required />
                <Button type="submit" className="btn-rose newsletter-btn">S'inscrire</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="footer-main">
        <Container>
          <Row>
            <Col lg={3} md={6} className="mb-4 mb-lg-0">
              <Link to="/" className="footer-brand"><span className="brand-turquoise">Boutique</span><span className="brand-rose"> COGI</span></Link>
              <p className="footer-description">Votre destination mode en ligne. Decouvrez notre collection de vetements, chaussures, sacs et accessoires pour toute la famille.</p>
              <div className="footer-contact">
                <div className="contact-item"><FiMapPin className="contact-icon" /><span>Kinshasa, RDC</span></div>
                <div className="contact-item"><FiPhone className="contact-icon" /><span>+243 XX XXX XXXX</span></div>
                <div className="contact-item"><FiMail className="contact-icon" /><span>contact@boutiquecogi.com</span></div>
              </div>
            </Col>
            <Col lg={2} md={6} className="mb-4 mb-lg-0">
              <h4 className="footer-column-title">Catalogues</h4>
              <ul className="footer-links">{catalogLinks.map((link) => (<li key={link.to}><Link to={link.to} className="footer-link">{link.label}</Link></li>))}</ul>
            </Col>
            <Col lg={2} md={6} className="mb-4 mb-lg-0">
              <h4 className="footer-column-title">Categories</h4>
              <ul className="footer-links">{categoryLinks.map((link) => (<li key={link.to}><Link to={link.to} className="footer-link">{link.label}</Link></li>))}</ul>
            </Col>
            <Col lg={2} md={6} className="mb-4 mb-lg-0">
              <h4 className="footer-column-title">Informations</h4>
              <ul className="footer-links">{infoLinks.map((link) => (<li key={link.to}><Link to={link.to} className="footer-link">{link.label}</Link></li>))}</ul>
            </Col>
            <Col lg={3} md={12}>
              <h4 className="footer-column-title">Reseaux Sociaux</h4>
              <p className="footer-social-text">Suivez-nous pour ne rien manquer !</p>
              <div className="footer-social">
                {socialLinks.map((social) => (
                  <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="social-link" aria-label={social.label}><social.icon size={20} /></a>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="footer-bottom">
        <Container>
          <div className="footer-bottom-content">
            <p className="copyright">&copy; {currentYear} Boutique COGI. Tous droits reserves.</p>
            <div className="footer-bottom-links">
              <Link to="/conditions-utilisation">Conditions d'utilisation</Link>
              <span className="separator">|</span>
              <Link to="/politique-confidentialite">Politique de confidentialite</Link>
              <span className="separator">|</span>
              <Link to="/cookies">Cookies</Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  )
}