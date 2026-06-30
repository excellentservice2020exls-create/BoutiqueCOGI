import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { FiUser, FiMail, FiTag, FiMessageSquare, FiSend } from 'react-icons/fi'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { contactSchema } from '@lib/contact/contactSchema'
import './ContactForm.css'

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      contactSchema.parse(formData)
      setIsSubmitting(true)
      await new Promise((resolve) => setTimeout(resolve, 1500))
      toast.success('Message envoye avec succes ! Nous vous repondrons rapidement.')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      if (error.errors) {
        const newErrors = {}
        error.errors.forEach((err) => { newErrors[err.path[0]] = err.message })
        setErrors(newErrors)
      }
    } finally { setIsSubmitting(false) }
  }

  return (
    <Form onSubmit={handleSubmit} className="contact-form">
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="contact-label"><FiUser className="me-2" />Nom *</Form.Label>
            <Form.Control type="text" name="name" placeholder="Votre nom" value={formData.name} onChange={handleChange} isInvalid={!!errors.name} className="contact-input" />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="contact-label"><FiMail className="me-2" />Email *</Form.Label>
            <Form.Control type="email" name="email" placeholder="votre@email.com" value={formData.email} onChange={handleChange} isInvalid={!!errors.email} className="contact-input" />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className="mb-3">
        <Form.Label className="contact-label"><FiTag className="me-2" />Sujet *</Form.Label>
        <Form.Control type="text" name="subject" placeholder="Sujet de votre message" value={formData.subject} onChange={handleChange} isInvalid={!!errors.subject} className="contact-input" />
        <Form.Control.Feedback type="invalid">{errors.subject}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label className="contact-label"><FiMessageSquare className="me-2" />Message *</Form.Label>
        <Form.Control as="textarea" rows={5} name="message" placeholder="Votre message..." value={formData.message} onChange={handleChange} isInvalid={!!errors.message} className="contact-input" />
        <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
      </Form.Group>
      <Button type="submit" className="btn-turquoise w-100" disabled={isSubmitting}>
        {isSubmitting ? <><ClipLoader size={18} color="#fff" className="me-2" />Envoi en cours...</> : <><FiSend className="me-2" />Envoyer le message</>}
      </Button>
    </Form>
  )
}