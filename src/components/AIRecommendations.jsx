import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { useTranslation } from '../hooks/useTranslation'
import './AIRecommendations.css'

function AIRecommendations({ currentProductId, userPreferences = {} }) {
  const { t } = useTranslation()
  const [recommendations, setRecommendations] = useState([])

  useEffect(() => {
    const recs = getRecommendations(currentProductId, userPreferences)
    setRecommendations(recs)
  }, [currentProductId, userPreferences])

  const getRecommendations = (productId, preferences) => {
    if (!productId) {
      // General recommendations based on popular products
      return products
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 4)
    }

    const currentProduct = products.find(p => p.id === productId)
    if (!currentProduct) return []

    // AI-like recommendation algorithm
    const scored = products
      .filter(p => p.id !== productId)
      .map(product => {
        let score = 0

        // Same category bonus
        if (product.category === currentProduct.category) {
          score += 30
        }

        // Similar price range (within 30%)
        const priceDiff = Math.abs(product.price - currentProduct.price) / currentProduct.price
        if (priceDiff < 0.3) {
          score += 20
        }

        // High rating bonus
        if (product.rating && product.rating >= 4.5) {
          score += 25
        }

        // Discount bonus
        if (product.originalPrice) {
          score += 15
        }

        // User preferences
        if (preferences.category && product.category === preferences.category) {
          score += 20
        }

        if (preferences.priceRange) {
          const [min, max] = preferences.priceRange
          if (product.price >= min && product.price <= max) {
            score += 15
          }
        }

        return { product, score }
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map(item => item.product)

    return scored
  }

  if (recommendations.length === 0) return null

  return (
    <div className="ai-recommendations">
      <div className="recommendations-header">
        <h2>✨ {t('recommendations')}</h2>
        <p className="recommendations-subtitle">{t('basedOnPreferences')}</p>
      </div>
      <div className="recommendations-grid">
        {recommendations.map(product => (
          <Link 
            key={product.id} 
            to={`/product/${product.slug}`}
            className="recommendation-card"
          >
            <div className="recommendation-image">
              <img 
                src={product.image} 
                alt={product.name}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/200x200?text=Product'
                }}
              />
              {product.originalPrice && (
                <span className="recommendation-discount">
                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              )}
            </div>
            <div className="recommendation-info">
              <h3 className="recommendation-name">{product.name}</h3>
              <div className="recommendation-rating">
                {product.rating && (
                  <>
                    <span>⭐</span>
                    <span>{product.rating}</span>
                  </>
                )}
              </div>
              <div className="recommendation-price">
                <span className="price-current">{product.price.toFixed(2)} €</span>
                {product.originalPrice && (
                  <span className="price-original">{product.originalPrice.toFixed(2)} €</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default AIRecommendations

