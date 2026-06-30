import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi'
import ContactForm from '@components/contact/ContactForm'
import SocialLinks from '@components/social/SocialLinks'
import './Contact.css'

const contactInfo = [
  { icon: FiMapPin, title: 'Adresse', content: 'Kinshasa, République Démocratique du Congo' },
  { icon: FiPhone, title: 'Téléphone', content: '+243 XX XXX XXXX' },
  { icon: FiMail, title: 'Email', content: 'contact@boutiquecogi.com' },
  { icon: FiClock, title: 'Horaires', content: 'Lun - Sam: 8h00 - 18h00' },
]

export default function Contact() {
  return (
    <Container className="contact-page py-5">
      <div className="text-center mb-5">
        <h1 className="section-title">Contactez-nous</h1>
        <p className="text-muted">Nous sommes à votre écoute pour toute question</p>
      </div>

      <Row className="g-4 mb-5">
        {contactInfo.map((info) => (
          <Col key={info.title} md={6} lg={3}>
            <Card className="contact-info-card text-center h-100">
              <Card.Body>
                <div className="contact-info-icon">
                  <info.icon size={24} />
                </div>
                <h6 className="contact-info-title">{info.title}</h6>
                <p className="contact-info-text mb-0">{info.content}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="g-4">
        <Col lg={7}>
          <Card className="contact-form-card">
            <Card.Body className="p-4">
              <h5 className="mb-4">Envoyez-nous un message</h5>
              <ContactForm />
            </Card.Body>
          </Card>
        </Col>
        <Col lg={5}>
          <Card className="contact-social-card h-100">
            <Card.Body className="p-4 d-flex flex-column justify-content-center text-center">
              <h5 className="mb-3">Suivez-nous</h5>
              <p className="text-muted mb-4">Restez connecté avec Boutique COGI sur les réseaux sociaux</p>
              <SocialLinks size="lg" className="justify-content-center" />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
