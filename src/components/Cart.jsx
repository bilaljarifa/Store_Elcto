import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../hooks/useTranslation'
import './Cart.css'

function Cart({ isOpen, onClose, items, onRemove, onUpdateQuantity, totalPrice }) {
  const navigate = useNavigate()
  const { t } = useTranslation()

  if (!isOpen) return null

  const handleCheckout = () => {
    onClose()
    navigate('/checkout')
  }

  return (
    <>
      <div className="cart-overlay" onClick={onClose}></div>
      <div className="cart-sidebar">
        <div className="cart-header">
          <h2>{t('cart')}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="cart-content">
          {items.length === 0 ? (
            <div className="cart-empty">
              <p>{t('emptyCart')}</p>
              <span>🛒</span>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {items.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-image"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/60x60?text=Image'
                      }}
                    />
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <p className="cart-item-unit-price">{item.price.toFixed(2)} €</p>
                    </div>
                    <div className="cart-item-controls">
                      <div className="quantity-controls">
                        <button
                          className="quantity-btn"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        >
                          −
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button
                          className="quantity-btn"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <div className="cart-item-total">
                        {(item.price * item.quantity).toFixed(2)} €
                      </div>
                      <button
                        className="remove-btn"
                        onClick={() => onRemove(item.id)}
                        title={t('remove')}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart-footer">
                <div className="cart-total">
                  <span>{t('total')}:</span>
                  <span className="total-price">{totalPrice.toFixed(2)} €</span>
                </div>
                <button className="checkout-btn" onClick={handleCheckout}>
                  {t('checkout')}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Cart

