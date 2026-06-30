import React, { useState } from 'react'
import { Container, Row, Col, Card, Nav, Tab } from 'react-bootstrap'
import { FiGrid, FiPackage, FiUsers, FiShoppingCart, FiBarChart2, FiSettings } from 'react-icons/fi'
import './AdminDashboard.css'

function DashboardOverview() {
  const stats = [
    { label: 'Commandes', value: '156', icon: FiShoppingCart, color: 'turquoise' },
    { label: 'Produits', value: '482', icon: FiPackage, color: 'rose' },
    { label: 'Clients', value: '1,240', icon: FiUsers, color: 'info' },
    { label: 'Revenus', value: '$12,450', icon: FiBarChart2, color: 'success' },
  ]
  return (
    <div className="admin-overview">
      <Row className="g-4">
        {stats.map((stat) => (
          <Col key={stat.label} md={6} lg={3}>
            <Card className={`stat-card stat-${stat.color}`}>
              <Card.Body className="d-flex align-items-center">
                <div className="stat-icon"><stat.icon size={24} /></div>
                <div className="ms-3"><p className="stat-label mb-0">{stat.label}</p><p className="stat-value mb-0">{stat.value}</p></div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row className="mt-4">
        <Col lg={8}><Card className="admin-card"><Card.Body><h5 className="admin-card-title">Commandes recentes</h5><p className="text-muted">Liste des dernieres commandes recues...</p></Card.Body></Card></Col>
        <Col lg={4}><Card className="admin-card"><Card.Body><h5 className="admin-card-title">Activite</h5><p className="text-muted">Dernieres activites du site...</p></Card.Body></Card></Col>
      </Row>
    </div>
  )
}

function ProductsManager() { return (<Card className="admin-card"><Card.Body><h5 className="admin-card-title">Gestion des produits</h5><p className="text-muted">Ajouter, modifier ou supprimer des produits.</p><div className="admin-placeholder"><FiPackage size={48} className="text-muted mb-3" /><p>Interface de gestion des produits a implementer</p></div></Card.Body></Card>) }
function UsersManager() { return (<Card className="admin-card"><Card.Body><h5 className="admin-card-title">Gestion des utilisateurs</h5><p className="text-muted">Gerer les roles et permissions des utilisateurs.</p><div className="admin-placeholder"><FiUsers size={48} className="text-muted mb-3" /><p>Interface de gestion des utilisateurs a implementer</p></div></Card.Body></Card>) }
function OrdersManager() { return (<Card className="admin-card"><Card.Body><h5 className="admin-card-title">Gestion des commandes</h5><p className="text-muted">Suivre et gerer toutes les commandes.</p><div className="admin-placeholder"><FiShoppingCart size={48} className="text-muted mb-3" /><p>Interface de gestion des commandes a implementer</p></div></Card.Body></Card>) }
function SettingsManager() { return (<Card className="admin-card"><Card.Body><h5 className="admin-card-title">Parametres</h5><p className="text-muted">Configurer les parametres du site.</p><div className="admin-placeholder"><FiSettings size={48} className="text-muted mb-3" /><p>Interface de parametres a implementer</p></div></Card.Body></Card>) }

export default function AdminDashboard() {
  const [activeKey, setActiveKey] = useState('dashboard')
  const navItems = [
    { key: 'dashboard', label: 'Tableau de bord', icon: FiGrid },
    { key: 'products', label: 'Produits', icon: FiPackage },
    { key: 'orders', label: 'Commandes', icon: FiShoppingCart },
    { key: 'users', label: 'Utilisateurs', icon: FiUsers },
    { key: 'settings', label: 'Parametres', icon: FiSettings },
  ]
  return (
    <Container fluid className="admin-dashboard py-4">
      <h2 className="admin-title mb-4"><span className="gradient-text">Administration</span></h2>
      <Tab.Container activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
        <Row>
          <Col lg={2} md={3} className="mb-4">
            <Nav className="admin-nav flex-column">
              {navItems.map((item) => (
                <Nav.Link key={item.key} eventKey={item.key} className={`admin-nav-link ${activeKey === item.key ? 'active' : ''}`}><item.icon className="me-2" size={18} />{item.label}</Nav.Link>
              ))}
            </Nav>
          </Col>
          <Col lg={10} md={9}>
            <Tab.Content>
              <Tab.Pane eventKey="dashboard"><DashboardOverview /></Tab.Pane>
              <Tab.Pane eventKey="products"><ProductsManager /></Tab.Pane>
              <Tab.Pane eventKey="orders"><OrdersManager /></Tab.Pane>
              <Tab.Pane eventKey="users"><UsersManager /></Tab.Pane>
              <Tab.Pane eventKey="settings"><SettingsManager /></Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  )
}