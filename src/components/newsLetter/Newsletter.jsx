import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { FiMail, FiSend } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { newsletterSchema } from '@lib/contact/contactSchema'
import './Newsletter.css'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      newsletterSchema.parse({ email })
      setIsSubmitting(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success('Inscription reussie ! Merci de votre confiance.')
      setEmail('')
    } catch (error) { toast.error(error.errors?.[0]?.message || 'Email invalide') }
    finally { setIsSubmitting(false) }
  }

  return (
    <div className="newsletter-section">
      <div className="newsletter-content text-center">
        <FiMail className="newsletter-icon" />
        <h3 className="newsletter-title">Newsletter</h3>
        <p className="newsletter-text">Inscrivez-vous pour recevoir nos offres exclusives et nouveautes en avant-premiere.</p>
        <Form onSubmit={handleSubmit} className="newsletter-form">
          <div className="newsletter-input-group">
            <Form.Control type="email" placeholder="Votre adresse email" value={email} onChange={(e) => setEmail(e.target.value)} className="newsletter-input" required />
            <Button type="submit" className="btn-rose newsletter-btn" disabled={isSubmitting}><FiSend size={18} /></Button>
          </div>
        </Form>
      </div>
    </div>
  )
}