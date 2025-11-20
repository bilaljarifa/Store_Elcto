import { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import './OrderTracking.css'

function OrderTracking() {
  const { t } = useTranslation()
  const [orderId, setOrderId] = useState('')
  const [order, setOrder] = useState(null)
  const [error, setError] = useState('')

  const handleTrack = (e) => {
    e.preventDefault()
    setError('')
    
    if (!orderId) {
      setError(t('enterOrderNumber') || 'Veuillez entrer un numéro de commande')
      return
    }

    // Get orders from localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    const foundOrder = orders.find(o => o.id.toUpperCase() === orderId.toUpperCase())
    
    if (foundOrder) {
      // Add tracking timeline if not exists
      if (!foundOrder.tracking || foundOrder.tracking.length === 1) {
        const trackingSteps = [
          { 
            date: foundOrder.date, 
            status: 'Commande confirmée', 
            location: 'En attente d\'expédition' 
          },
          { 
            date: new Date(new Date(foundOrder.date).getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], 
            status: 'Expédié', 
            location: foundOrder.items[0]?.shippingOrigin || 'Chine' 
          },
          { 
            date: new Date(new Date(foundOrder.date).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], 
            status: 'En transit', 
            location: 'En route vers la France' 
          },
          { 
            date: new Date(new Date(foundOrder.date).getTime() + 12 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], 
            status: 'Arrivé en France', 
            location: 'Paris, France' 
          }
        ]
        foundOrder.tracking = trackingSteps
      }
      setOrder(foundOrder)
    } else {
      setError(t('orderNotFound'))
      setOrder(null)
    }
  }

  return (
    <div className="tracking-page">
      <div className="container">
        <div className="tracking-hero">
          <h1 className="tracking-title">{t('orderTracking')}</h1>
          <p className="tracking-subtitle">{t('trackYourOrder')}</p>
        </div>

        <div className="tracking-search-card">
          <form className="tracking-form" onSubmit={handleTrack}>
            <div className="form-group">
              <label>{t('orderNumberLabel')} *</label>
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Ex: ORD123"
                required
              />
            </div>
            <button type="submit" className="track-btn">
              {t('trackButton')}
            </button>
          </form>
          {error && <div className="tracking-error">{error}</div>}
        </div>

        {order && (
          <div className="order-details">
            <div className="order-header">
              <div>
                <h2>{t('order') || 'Commande'} #{order.id}</h2>
                <p className="order-date">{t('orderDate')}: {order.date}</p>
              </div>
              <div className="order-status-badge" data-status={order.status.toLowerCase().replace(' ', '-')}>
                {order.status}
              </div>
            </div>

            <div className="order-info-grid">
              <div className="order-items-card">
                <h3>{t('orderedItems')}</h3>
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <div className="order-item-info">
                      <h4>{item.name}</h4>
                      <p>{t('quantity')}: {item.quantity}</p>
                      <p className="shipping-origin">📍 {t('shippedFrom')}: {item.shippingOrigin}</p>
                    </div>
                    <div className="order-item-price">
                      {(item.price * item.quantity).toFixed(2)} €
                    </div>
                  </div>
                ))}
                <div className="order-total">
                  <span>{t('total')}:</span>
                  <span>{order.total.toFixed(2)} €</span>
                </div>
              </div>

              <div className="tracking-timeline-card">
                <h3>{t('shippingTracking')}</h3>
                <div className="timeline">
                  {order.tracking.map((step, index) => (
                    <div key={index} className={`timeline-step ${index === order.tracking.length - 1 ? 'active' : ''}`}>
                      <div className="timeline-marker"></div>
                      <div className="timeline-content">
                        <div className="timeline-date">{step.date}</div>
                        <div className="timeline-status">{step.status}</div>
                        <div className="timeline-location">📍 {step.location}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="shipping-address-card">
              <h3>{t('shippingAddress')}</h3>
              <p>{order.shippingAddress}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderTracking

