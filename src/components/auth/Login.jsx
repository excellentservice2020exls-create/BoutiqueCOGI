import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { ClipLoader } from 'react-spinners'
import { useAuthStore } from '@store/authStore'
import { loginSchema } from '@lib/auth/authSchema'
import { toast } from 'react-toastify'
import './Auth.css'

export default function Login() {
  const navigate = useNavigate()
  const { login, isLoading } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      loginSchema.parse(formData)
      const result = await login(formData.email, formData.password)
      if (result.success) navigate('/')
    } catch (error) {
      if (error.errors) {
        const newErrors = {}
        error.errors.forEach((err) => { newErrors[err.path[0]] = err.message })
        setErrors(newErrors)
      } else { toast.error(error.message || 'Erreur de connexion') }
    }
  }

  return (
    <Container className="auth-page py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5} xl={4}>
          <Card className="auth-card">
            <Card.Body className="p-4 p-md-5">
              <div className="auth-header text-center mb-4">
                <h1 className="auth-title gradient-text">Connexion</h1>
                <p className="auth-subtitle">Connectez-vous a votre compte</p>
              </div>
              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group className="mb-3">
                  <Form.Label className="auth-label">Email</Form.Label>
                  <div className="auth-input-wrapper">
                    <FiMail className="auth-input-icon" />
                    <Form.Control type="email" name="email" placeholder="votre@email.com" value={formData.email} onChange={handleChange} isInvalid={!!errors.email} className="auth-input" />
                  </div>
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label className="auth-label">Mot de passe</Form.Label>
                  <div className="auth-input-wrapper">
                    <FiLock className="auth-input-icon" />
                    <Form.Control type={showPassword ? 'text' : 'password'} name="password" placeholder="Votre mot de passe" value={formData.password} onChange={handleChange} isInvalid={!!errors.password} className="auth-input" />
                    <Button variant="link" className="password-toggle" onClick={() => setShowPassword(!showPassword)} type="button">{showPassword ? <FiEyeOff /> : <FiEye />}</Button>
                  </div>
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" className="btn-turquoise w-100 mb-3" disabled={isLoading}>
                  {isLoading ? <ClipLoader size={20} color="#fff" /> : 'Se connecter'}
                </Button>
                <div className="auth-links text-center">
                  <Link to="/forgot-password" className="auth-link">Mot de passe oublie ?</Link>
                </div>
              </Form>
              <hr className="auth-divider" />
              <p className="auth-footer text-center mb-0">Pas encore de compte ? <Link to="/register" className="auth-link-bold">S'inscrire</Link></p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}