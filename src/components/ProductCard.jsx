import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import './ProductCard.css'

function ProductCard({ product, onAddToCart }) {
  const { t } = useTranslation()
  const [isHovered, setIsHovered] = useState(false)
  
  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onAddToCart(product)
  }

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <Link to={`/product/${product.slug}`} className="product-card-link">
      <div 
        className="product-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="product-image-container">
          <div className="image-overlay"></div>
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x300?text=Product+Image'
            }}
          />
          {discount > 0 && (
            <div className="product-discount-badge">
              -{discount}%
            </div>
          )}
          <div className={`quick-view-btn ${isHovered ? 'show' : ''}`}>
            Quick View
          </div>
        </div>
        <div className="product-info">
          <div className="product-meta-top">
            {product.category}
          </div>
          <h3 className="product-name">{product.name}</h3>
          <div className="product-footer">
            <div className="product-pricing">
              <span className="product-price">
                {product.price.toFixed(2)} €
              </span>
              {product.originalPrice && (
                <span className="product-original-price">
                  {product.originalPrice.toFixed(2)} €
                </span>
              )}
            </div>
            <button 
              className={`add-to-cart-btn ${isHovered ? 'pulse' : ''}`}
              onClick={handleAddToCart}
              aria-label={t('addToCart')}
            >
              <span className="btn-text">{t('addToCart')}</span>
              <span className="btn-icon">+</span>
            </button>
          </div>
        </div>
        <div className="card-shine"></div>
      </div>
    </Link>
  )
}

export default ProductCard

