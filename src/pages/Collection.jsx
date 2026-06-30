import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Container, Row, Col, Form, Button, Offcanvas } from 'react-bootstrap'
import { FiFilter, FiX, FiGrid, FiList } from 'react-icons/fi'
import { useProductStore } from '@store/productStore'
import ProductGrid from '@components/product/ProductGrid'
import { useDebounce } from '@hooks/useDebounce'
import './Collection.css'

export default function Collection() {
  const { slug } = useParams()
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') || ''

  const { products, categories, catalogs, fetchProducts, fetchCategories, fetchCatalogs, isLoading } = useProductStore()

  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    category: slug?.startsWith('category-') ? slug.replace('category-', '') : '',
    catalog: slug && !slug.startsWith('category-') && slug !== 'all' ? slug : '',
    search: searchQuery,
    priceMin: '',
    priceMax: '',
    sortBy: 'newest',
  })

  const debouncedFilters = useDebounce(filters, 300)

  useEffect(() => {
    fetchCategories()
    fetchCatalogs()
  }, [])

  useEffect(() => {
    fetchProducts({
      category: filters.category,
      catalog: filters.catalog,
      search: filters.search,
    })
  }, [debouncedFilters])

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const getPageTitle = () => {
    if (searchQuery) return `Résultats pour "${searchQuery}"`
    if (slug === 'all') return 'Tous les produits'
    const catalog = catalogs.find((c) => c.slug === slug)
    if (catalog) return catalog.name
    const category = categories.find((c) => c.slug === slug)
    if (category) return category.name
    return 'Collection'
  }

  return (
    <Container className="collection-page py-5">
      {/* Header */}
      <div className="collection-header d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="collection-title">{getPageTitle()}</h1>
          <p className="collection-count text-muted">{products.length} produit(s) trouvé(s)</p>
        </div>
        <div className="collection-controls">
          <Button variant="light" className="filter-toggle d-lg-none" onClick={() => setShowFilters(true)}>
            <FiFilter className="me-2" /> Filtres
          </Button>
          <div className="view-toggle d-none d-md-flex">
            <Button variant={viewMode === 'grid' ? 'primary' : 'light'} onClick={() => setViewMode('grid')}>
              <FiGrid />
            </Button>
            <Button variant={viewMode === 'list' ? 'primary' : 'light'} onClick={() => setViewMode('list')}>
              <FiList />
            </Button>
          </div>
        </div>
      </div>

      <Row>
        {/* Sidebar Filters - Desktop */}
        <Col lg={3} className="d-none d-lg-block">
          <div className="filters-sidebar">
            <h5 className="filters-title">Filtres</h5>

            <div className="filter-group">
              <h6>Catégories</h6>
              {categories.map((cat) => (
                <Form.Check
                  key={cat.id}
                  type="checkbox"
                  label={cat.name}
                  checked={filters.category === cat.slug}
                  onChange={() => handleFilterChange('category', filters.category === cat.slug ? '' : cat.slug)}
                />
              ))}
            </div>

            <div className="filter-group">
              <h6>Catalogues</h6>
              {catalogs.map((cat) => (
                <Form.Check
                  key={cat.id}
                  type="checkbox"
                  label={cat.name}
                  checked={filters.catalog === cat.slug}
                  onChange={() => handleFilterChange('catalog', filters.catalog === cat.slug ? '' : cat.slug)}
                />
              ))}
            </div>

            <div className="filter-group">
              <h6>Prix</h6>
              <Row className="g-2">
                <Col>
                  <Form.Control
                    type="number"
                    placeholder="Min"
                    value={filters.priceMin}
                    onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="number"
                    placeholder="Max"
                    value={filters.priceMax}
                    onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                  />
                </Col>
              </Row>
            </div>

            <Button variant="outline-secondary" className="w-100" onClick={() => setFilters({
              category: '', catalog: '', search: '', priceMin: '', priceMax: '', sortBy: 'newest'
            })}>
              Réinitialiser
            </Button>
          </div>
        </Col>

        {/* Products */}
        <Col lg={9}>
          <ProductGrid products={products} isLoading={isLoading} />
        </Col>
      </Row>

      {/* Mobile Filters */}
      <Offcanvas show={showFilters} onHide={() => setShowFilters(false)} placement="start">
        <Offcanvas.Header>
          <Offcanvas.Title>Filtres</Offcanvas.Title>
          <Button variant="link" onClick={() => setShowFilters(false)}><FiX /></Button>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* Mêmes filtres que desktop */}
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  )
}
