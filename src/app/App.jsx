import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import NavbarComponent from '@components/navbar/Navbar'
import Sidebar from '@components/navbar/Sidebar'
import Footer from '@components/footer/Footer'
import ScrollToTop from '@hooks/ScrollToTop'
import { useAuthStore } from '@store/authStore'
import { ClipLoader } from 'react-spinners'

const Home = lazy(() => import('@pages/Home'))
const ProductDetail = lazy(() => import('@pages/ProductDetail'))
const Collection = lazy(() => import('@pages/Collection'))
const Contact = lazy(() => import('@pages/Contact'))
const Profile = lazy(() => import('@pages/Profile'))
const Cart = lazy(() => import('@pages/Cart'))
const Order = lazy(() => import('@pages/Order'))
const Login = lazy(() => import('@components/auth/Login'))
const Register = lazy(() => import('@components/auth/Register'))
const NotFound = lazy(() => import('@pages/NotFound'))
const AdminDashboard = lazy(() => import('@components/admin/AdminDashboard'))

function App() {
  const { user } = useAuthStore()

  return (
    <div className="app-wrapper">
      <ScrollToTop />
      <NavbarComponent />
      <Sidebar />
      <main className="main-content">
        <Suspense
          fallback={
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
              <ClipLoader color="#40E0D0" size={50} />
            </Container>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/collection/:slug" element={<Collection />} />
            <Route path="/category/:slug" element={<Collection />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<Order />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {user?.role === 'ADMIN' && (
              <Route path="/admin/*" element={<AdminDashboard />} />
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App