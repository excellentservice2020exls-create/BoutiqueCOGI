import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'
import { FiHome, FiSearch } from 'react-icons/fi'
import './NotFound.css'

export default function NotFound() {
  return (
    <Container className="not-found-page">
      <div className="not-found-content text-center">
        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-title">Page non trouvée</h2>
        <p className="not-found-text">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div className="not-found-actions">
          <Button as={Link} to="/" className="btn-turquoise">
            <FiHome className="me-2" /> Retour à l'accueil
          </Button>
        </div>
      </div>
    </Container>
  )
}
