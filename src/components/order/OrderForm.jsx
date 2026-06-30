import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { FiSend, FiUser, FiPhone, FiMapPin, FiMessageSquare } from 'react-icons/fi'
import { ClipLoader } from 'react-spinners'
import { useCartStore } from '@store/cartStore'
import { useCurrencyStore } from '@store/currencyStore'
import { orderSchema } from '@lib/cart/cartSchema'
import { toast } from 'react-toastify'
import './OrderForm.css'

const WHATSAPP_NUMBER = '+243XXXXXXXXX'

export default function OrderForm() {
  const { items, getTotalPrice, clearCart } = useCartStore()
  const { formatPrice } = useCurrencyStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', street: '', city: '', notes: '' })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const generateWhatsAppMessage = () => {
    const total = getTotalPrice()
    let message = `🛍️ *NOUVELLE COMMANDE - BOUTIQUE COGI*\n\n`
    message += `👤 *Client:* ${formData.fullName}\n`
    message += `📞 *Telephone:* ${formData.phone}\n`
    if (formData.email) message += `📧 *Email:* ${formData.email}\n`
    message += `📍 *Adresse:* ${formData.street}, ${formData.city}\n\n`
    message += `📦 *PRODUITS COMMANDES:*\n`
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`
    items.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`
      message += `   Ref: ${item.sku}\n`
      if (item.color) message += `   Couleur: ${item.color}\n`
      if (item.size) message += `   Taille: ${item.size}\n`
      message += `   Qte: ${item.quantity}\n`
      message += `   Prix: ${formatPrice(item.price * item.quantity)}\n\n`
    })
    message += `━━━━━━━━━━━━━━━━━━━━\n`
    message += `💰 *TOTAL:* ${formatPrice(total)}\n\n`
    if (formData.notes) message += `📝 *Notes:* ${formData.notes}\n\n`
    message += `Merci de confirmer ma commande ! 🙏`
    return encodeURIComponent(message)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      orderSchema.parse(formData)
      setIsSubmitting(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const message = generateWhatsAppMessage()
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`
      window.open(whatsappUrl, '_blank')
      toast.success('Redirection vers WhatsApp...')
      clearCart()
    } catch (error) {
      if (error.errors) {
        const newErrors = {}
        error.errors.forEach((err) => { newErrors[err.path[0]] = err.message })
        setErrors(newErrors)
      } else { toast.error(error.message || 'Erreur lors de la commande') }
    } finally { setIsSubmitting(false) }
  }

  return (
    <Form onSubmit={handleSubmit} className="order-form">
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="order-label"><FiUser className="me-2" />Nom complet *</Form.Label>
            <Form.Control type="text" name="fullName" placeholder="Votre nom complet" value={formData.fullName} onChange={handleChange} isInvalid={!!errors.fullName} className="order-input" />
            <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="order-label"><FiPhone className="me-2" />Telephone *</Form.Label>
            <Form.Control type="tel" name="phone" placeholder="+243 XX XXX XXXX" value={formData.phone} onChange={handleChange} isInvalid={!!errors.phone} className="order-input" />
            <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className="mb-3">
        <Form.Label className="order-label"><FiUser className="me-2" />Email (optionnel)</Form.Label>
        <Form.Control type="email" name="email" placeholder="votre@email.com" value={formData.email} onChange={handleChange} isInvalid={!!errors.email} className="order-input" />
      </Form.Group>
      <Row>
        <Col md={8}>
          <Form.Group className="mb-3">
            <Form.Label className="order-label"><FiMapPin className="me-2" />Adresse de livraison *</Form.Label>
            <Form.Control type="text" name="street" placeholder="Rue, Avenue, Quartier" value={formData.street} onChange={handleChange} isInvalid={!!errors.street} className="order-input" />
            <Form.Control.Feedback type="invalid">{errors.street}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label className="order-label"><FiMapPin className="me-2" />Ville *</Form.Label>
            <Form.Control type="text" name="city" placeholder="Ville" value={formData.city} onChange={handleChange} isInvalid={!!errors.city} className="order-input" />
            <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className="mb-4">
        <Form.Label className="order-label"><FiMessageSquare className="me-2" />Notes (optionnel)</Form.Label>
        <Form.Control as="textarea" rows={3} name="notes" placeholder="Instructions speciales pour la livraison..." value={formData.notes} onChange={handleChange} className="order-input" />
      </Form.Group>
      <Button type="submit" className="btn-rose w-100 order-submit-btn" disabled={isSubmitting || items.length === 0}>
        {isSubmitting ? <><ClipLoader size={18} color="#fff" className="me-2" />Traitement...</> : <><FiSend className="me-2" />Commander via WhatsApp</>}
      </Button>
      <p className="order-note text-muted text-center mt-3 mb-0"><small>En cliquant sur "Commander", vous serez redirige vers WhatsApp avec un message pre-rempli.</small></p>
    </Form>
  )
}