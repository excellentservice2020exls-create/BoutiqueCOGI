import React, { useState } from 'react'
import { Container, Row, Col, Card, Form, Button, Nav, Tab } from 'react-bootstrap'
import { FiUser, FiShoppingBag, FiHeart, FiSettings, FiLogOut } from 'react-icons/fi'
import { useAuthStore } from '@store/authStore'
import { useWishlistStore } from '@store/wishlistStore'
import WishlistItem from '@components/wishlist/WishlistItem'
import './Profile.css'

export default function Profile() {
  const { user, logout, updateProfile } = useAuthStore()
  const { items: wishlistItems } = useWishlistStore()
  const [activeTab, setActiveTab] = useState('profile')
  const [profileData, setProfileData] = useState({
    firstName: user?.user_metadata?.firstName || '',
    lastName: user?.user_metadata?.lastName || '',
    phone: user?.user_metadata?.phone || '',
  })

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    await updateProfile(profileData)
  }

  if (!user) {
    return (
      <Container className="py-5 text-center">
        <h2>Connectez-vous pour accéder à votre profil</h2>
      </Container>
    )
  }

  return (
    <Container className="profile-page py-5">
      <Row>
        <Col lg={3} className="mb-4">
          <Card className="profile-sidebar">
            <Card.Body className="text-center">
              <div className="profile-avatar">
                <FiUser size={40} />
              </div>
              <h5 className="profile-name">{user.user_metadata?.firstName || user.email}</h5>
              <p className="profile-email">{user.email}</p>
            </Card.Body>
            <Nav className="flex-column profile-nav">
              <Nav.Link active={activeTab === 'profile'} onClick={() => setActiveTab('profile')}>
                <FiUser className="me-2" /> Profil
              </Nav.Link>
              <Nav.Link active={activeTab === 'orders'} onClick={() => setActiveTab('orders')}>
                <FiShoppingBag className="me-2" /> Commandes
              </Nav.Link>
              <Nav.Link active={activeTab === 'wishlist'} onClick={() => setActiveTab('wishlist')}>
                <FiHeart className="me-2" /> Favoris ({wishlistItems.length})
              </Nav.Link>
              <Nav.Link active={activeTab === 'settings'} onClick={() => setActiveTab('settings')}>
                <FiSettings className="me-2" /> Paramètres
              </Nav.Link>
              <Nav.Link onClick={logout} className="text-danger">
                <FiLogOut className="me-2" /> Déconnexion
              </Nav.Link>
            </Nav>
          </Card>
        </Col>

        <Col lg={9}>
          {activeTab === 'profile' && (
            <Card className="profile-card">
              <Card.Body className="p-4">
                <h5 className="mb-4">Informations personnelles</h5>
                <Form onSubmit={handleProfileUpdate}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Prénom</Form.Label>
                        <Form.Control
                          value={profileData.firstName}
                          onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control
                          value={profileData.lastName}
                          onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Label>Téléphone</Form.Label>
                    <Form.Control
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    />
                  </Form.Group>
                  <Button type="submit" className="btn-turquoise">Mettre à jour</Button>
                </Form>
              </Card.Body>
            </Card>
          )}

          {activeTab === 'wishlist' && (
            <Card className="profile-card">
              <Card.Body className="p-4">
                <h5 className="mb-4">Ma liste de souhaits</h5>
                {wishlistItems.length === 0 ? (
                  <p className="text-muted">Votre liste de souhaits est vide</p>
                ) : (
                  <Row className="g-3">
                    {wishlistItems.map((item) => (
                      <Col key={item.id} xs={6} md={4}>
                        <WishlistItem item={item} />
                      </Col>
                    ))}
                  </Row>
                )}
              </Card.Body>
            </Card>
          )}

          {activeTab === 'orders' && (
            <Card className="profile-card">
              <Card.Body className="p-4">
                <h5 className="mb-4">Mes commandes</h5>
                <p className="text-muted">Aucune commande pour le moment</p>
              </Card.Body>
            </Card>
          )}

          {activeTab === 'settings' && (
            <Card className="profile-card">
              <Card.Body className="p-4">
                <h5 className="mb-4">Paramètres</h5>
                <p className="text-muted">Paramètres du compte à implémenter</p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  )
}
