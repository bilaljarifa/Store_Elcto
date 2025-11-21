import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import Header from './components/Header'
import AnnouncementBanner from './components/AnnouncementBanner'
import WelcomeBanner from './components/WelcomeBanner'
import Footer from './components/Footer'
import Cart from './components/Cart'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Checkout from './pages/Checkout'
import About from './pages/About'
import Contact from './pages/Contact'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import OrderTracking from './pages/OrderTracking'
import AdminPanel from './pages/AdminPanel'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Shipping from './pages/Shipping'
import Returns from './pages/Returns'
import Warranty from './pages/Warranty'
import Services from './pages/Services'
import './App.css'

function App() {
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevItems, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    )
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  }

  return (
    <LanguageProvider>
      <Router>
        <div className="app">
        <Header
          cartItemCount={getTotalItems()}
          onCartClick={() => setIsCartOpen(!isCartOpen)}
          onAddToCart={addToCart}
        />
        {showWelcome && <WelcomeBanner onClose={() => setShowWelcome(false)} />}
        <AnnouncementBanner className={showWelcome ? 'with-welcome' : ''} />
        <main className={`main-content ${showWelcome ? 'with-welcome' : ''}`}>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  onAddToCart={addToCart}
                />
              }
            />
            <Route
              path="/product/:slug"
              element={<ProductDetail onAddToCart={addToCart} />}
            />
            <Route
              path="/checkout"
              element={
                <Checkout
                  cartItems={cartItems}
                  totalPrice={getTotalPrice()}
                  onClearCart={clearCart}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/tracking" element={<OrderTracking />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/warranty" element={<Warranty />} />
            <Route path="/services" element={<Services />} />
          </Routes>
        </main>
        <Footer />
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onRemove={removeFromCart}
          onUpdateQuantity={updateQuantity}
          totalPrice={getTotalPrice()}
        />
        </div>
      </Router>
    </LanguageProvider>
  )
}

export default App

