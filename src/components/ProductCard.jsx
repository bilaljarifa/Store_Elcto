import { Link } from 'react-router-dom'
import { useTranslation } from '../hooks/useTranslation'
import './ProductCard.css'

function ProductCard({ product, onAddToCart }) {
  const { t } = useTranslation()
  
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
      <div className="product-card">
        <div className="product-image-container">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x300?text=Product+Image'
            }}
          />
          <span className="product-category">{product.category}</span>
          {discount > 0 && (
            <span className="product-discount">-{discount}%</span>
          )}
          {product.rating && (
            <div className="product-rating">
              <span>⭐</span>
              <span>{product.rating}</span>
            </div>
          )}
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description}</p>
          {product.shippingOrigin && (
            <p className="product-shipping">
              📍 {t('shippedFrom')}: {product.shippingOrigin} ({product.shippingTime})
            </p>
          )}
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
              className="add-to-cart-btn" 
              onClick={handleAddToCart}
              aria-label={t('addToCart')}
            >
              {t('addToCart')}
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard

