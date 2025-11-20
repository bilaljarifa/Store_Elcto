import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../hooks/useTranslation'
import './Checkout.css'

function Checkout({ cartItems, totalPrice, onClearCart }) {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    paymentMethod: 'card'
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId, setOrderId] = useState('')

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const generateOrderId = () => {
    return 'ORD' + Math.random().toString(36).substr(2, 6).toUpperCase()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Generate order ID
    const newOrderId = generateOrderId()
    setOrderId(newOrderId)
    
    // Save order to localStorage for tracking
    const order = {
      id: newOrderId,
      date: new Date().toISOString().split('T')[0],
      status: 'En transit',
      items: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        shippingOrigin: item.shippingOrigin || 'Chine'
      })),
      total: totalPrice,
      shippingAddress: `${formData.address}, ${formData.city} ${formData.postalCode}, ${formData.country}`,
      tracking: [
        { 
          date: new Date().toISOString().split('T')[0], 
          status: 'Commande confirmée', 
          location: 'En attente d\'expédition' 
        }
      ]
    }
    
    // Save order (in real app, send to backend)
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    orders.push(order)
    localStorage.setItem('orders', JSON.stringify(orders))
    
    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false)
      setOrderPlaced(true)
      onClearCart()
    }, 2000)
  }

  if (orderPlaced) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="order-success">
            <div className="success-icon">✓</div>
            <h1>{t('orderSuccess')}</h1>
            <p>{t('orderSuccessMessage')}: <strong>{orderId}</strong></p>
            <p>{t('orderSuccessThankYou')}</p>
            <div className="success-actions">
              <button onClick={() => navigate('/tracking')} className="track-order-btn">
                {t('trackMyOrder')}
              </button>
              <button onClick={() => navigate('/')} className="continue-shopping-btn">
                {t('continueShopping')}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="empty-cart-message">
            <h2>{t('emptyCart')}</h2>
            <button onClick={() => navigate('/')} className="continue-shopping-btn">
              {t('backToHome')}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="checkout-title">{t('checkoutTitle')}</h1>
        <div className="checkout-grid">
          <div className="checkout-form-section">
            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-section">
                <h2>{t('deliveryInfo')}</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label>{t('firstName')} *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>{t('lastName')} *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>{t('email')} *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>{t('phone')} *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>{t('address')} *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>{t('city')} *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>{t('postalCode')} *</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>{t('country')} *</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="France">France</option>
                    <option value="Belgique">Belgique</option>
                    <option value="Suisse">Suisse</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
              </div>

              <div className="form-section">
                <h2>{t('paymentInfo')}</h2>
                <div className="payment-methods">
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                    />
                    <span>💳 {t('cardNumber')}</span>
                  </label>
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={handleInputChange}
                    />
                    <span>PayPal</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="submit-order-btn"
                disabled={isProcessing}
              >
                {isProcessing ? t('processing') : `${t('confirmOrder')} - ${totalPrice.toFixed(2)} €`}
              </button>
            </form>
          </div>

          <div className="checkout-summary">
            <h2>{t('orderSummary') || 'Résumé de la commande'}</h2>
            <div className="summary-items">
              {cartItems.map((item) => (
                <div key={item.id} className="summary-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="summary-item-image"
                  />
                  <div className="summary-item-info">
                    <h4>{item.name}</h4>
                    <p>{t('quantity')}: {item.quantity}</p>
                  </div>
                  <div className="summary-item-price">
                    {(item.price * item.quantity).toFixed(2)} €
                  </div>
                </div>
              ))}
            </div>
            <div className="summary-totals">
              <div className="summary-row">
                <span>{t('subtotal') || 'Sous-total'}</span>
                <span>{totalPrice.toFixed(2)} €</span>
              </div>
              <div className="summary-row">
                <span>{t('shipping')}</span>
                <span>{t('free') || 'Gratuite'}</span>
              </div>
              <div className="summary-row total">
                <span>{t('total')}</span>
                <span>{totalPrice.toFixed(2)} €</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout

