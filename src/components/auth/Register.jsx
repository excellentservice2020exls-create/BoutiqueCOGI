import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'
import { FiUser, FiMail, FiPhone, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { ClipLoader } from 'react-spinners'
import { useAuthStore } from '@store/authStore'
import { registerSchema } from '@lib/auth/authSchema'
import { toast } from 'react-toastify'
import './Auth.css'

export default function Register() {
  const navigate = useNavigate()
  const { register, isLoading } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '', acceptTerms: false })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      registerSchema.parse(formData)
      const result = await register(formData.email, formData.password, { firstName: formData.firstName, lastName: formData.lastName, phone: formData.phone })
      if (result.success) navigate('/login')
    } catch (error) {
      if (error.errors) {
        const newErrors = {}
        error.errors.forEach((err) => { newErrors[err.path[0]] = err.message })
        setErrors(newErrors)
      } else { toast.error(error.message || "Erreur d'inscription") }
    }
  }

  return (
    <Container className="auth-page py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6} xl={5}>
          <Card className="auth-card">
            <Card.Body className="p-4 p-md-5">
              <div className="auth-header text-center mb-4">
                <h1 className="auth-title gradient-text">Inscription</h1>
                <p className="auth-subtitle">Creez votre compte Boutique COGI</p>
              </div>
              <Form onSubmit={handleSubmit} noValidate>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="auth-label">Prenom</Form.Label>
                      <div className="auth-input-wrapper"><FiUser className="auth-input-icon" /><Form.Control type="text" name="firstName" placeholder="Prenom" value={formData.firstName} onChange={handleChange} isInvalid={!!errors.firstName} className="auth-input" /></div>
                      <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="auth-label">Nom</Form.Label>
                      <div className="auth-input-wrapper"><FiUser className="auth-input-icon" /><Form.Control type="text" name="lastName" placeholder="Nom" value={formData.lastName} onChange={handleChange} isInvalid={!!errors.lastName} className="auth-input" /></div>
                      <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label className="auth-label">Email</Form.Label>
                  <div className="auth-input-wrapper"><FiMail className="auth-input-icon" /><Form.Control type="email" name="email" placeholder="votre@email.com" value={formData.email} onChange={handleChange} isInvalid={!!errors.email} className="auth-input" /></div>
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="auth-label">Telephone</Form.Label>
                  <div className="auth-input-wrapper"><FiPhone className="auth-input-icon" /><Form.Control type="tel" name="phone" placeholder="+243 XX XXX XXXX" value={formData.phone} onChange={handleChange} isInvalid={!!errors.phone} className="auth-input" /></div>
                  <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="auth-label">Mot de passe</Form.Label>
                  <div className="auth-input-wrapper"><FiLock className="auth-input-icon" /><Form.Control type={showPassword ? 'text' : 'password'} name="password" placeholder="8 caracteres minimum" value={formData.password} onChange={handleChange} isInvalid={!!errors.password} className="auth-input" /><Button variant="link" className="password-toggle" onClick={() => setShowPassword(!showPassword)} type="button">{showPassword ? <FiEyeOff /> : <FiEye />}</Button></div>
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="auth-label">Confirmer le mot de passe</Form.Label>
                  <div className="auth-input-wrapper"><FiLock className="auth-input-icon" /><Form.Control type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" placeholder="Confirmez votre mot de passe" value={formData.confirmPassword} onChange={handleChange} isInvalid={!!errors.confirmPassword} className="auth-input" /><Button variant="link" className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)} type="button">{showConfirmPassword ? <FiEyeOff /> : <FiEye />}</Button></div>
                  <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Check type="checkbox" name="acceptTerms" checked={formData.acceptTerms} onChange={handleChange} isInvalid={!!errors.acceptTerms} label={<span className="auth-checkbox-label">J'accepte les <Link to="/conditions-utilisation">conditions d'utilisation</Link> et la <Link to="/politique-confidentialite">politique de confidentialite</Link></span>} />
                  {errors.acceptTerms && <div className="text-danger small mt-1">{errors.acceptTerms}</div>}
                </Form.Group>
                <Button type="submit" className="btn-rose w-100 mb-3" disabled={isLoading}>
                  {isLoading ? <ClipLoader size={20} color="#fff" /> : "S'inscrire"}
                </Button>
              </Form>
              <hr className="auth-divider" />
              <p className="auth-footer text-center mb-0">Deja un compte ? <Link to="/login" className="auth-link-bold">Se connecter</Link></p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}