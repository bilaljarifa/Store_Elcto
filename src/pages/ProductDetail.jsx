import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { products } from '../data/products'
import Product3DPreview from '../components/Product3DPreview'
import AIRecommendations from '../components/AIRecommendations'
import { useTranslation } from '../hooks/useTranslation'
import './ProductDetail.css'

function ProductDetail({ onAddToCart }) {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const product = products.find((p) => p.slug === slug)
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Jean Dupont',
      rating: 5,
      date: '2024-01-15',
      text: 'Excellent produit ! Qualité au rendez-vous, livraison rapide. Je recommande vivement.'
    },
    {
      id: 2,
      author: 'Marie Martin',
      rating: 4,
      date: '2024-01-10',
      text: 'Très satisfaite de mon achat. Le produit correspond parfaitement à la description.'
    },
    {
      id: 3,
      author: 'Pierre Bernard',
      rating: 5,
      date: '2024-01-05',
      text: 'Parfait ! Fonctionne très bien, je suis très content de mon achat.'
    }
  ])
  const [newComment, setNewComment] = useState({ author: '', rating: 5, text: '' })

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div className="product-not-found">
            <h2>{t('productNotFound')}</h2>
            <button onClick={() => navigate('/')} className="back-btn">
              {t('backToHome')}
            </button>
          </div>
        </div>
      </div>
    )
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = () => {
    onAddToCart(product)
  }

  const handleSubmitComment = (e) => {
    e.preventDefault()
    if (newComment.author.trim() && newComment.text.trim()) {
      const comment = {
        id: comments.length + 1,
        author: newComment.author,
        rating: newComment.rating,
        date: new Date().toISOString().split('T')[0],
        text: newComment.text
      }
      setComments([comment, ...comments])
      setNewComment({ author: '', rating: 5, text: '' })
    }
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← {t('back')}
        </button>
        <div className="product-detail-grid">
          <div className="product-detail-images">
            <Product3DPreview product={product} />
          </div>
          <div className="product-detail-info">
            <div className="detail-header">
              <span className="detail-category">{product.category}</span>
              {product.rating && (
                <div className="detail-rating">
                  <span>⭐</span>
                  <span>{product.rating}</span>
                  <span className="rating-count">(128 {t('reviewsCount')})</span>
                </div>
              )}
            </div>
            <h1 className="detail-name">{product.name}</h1>
            <p className="detail-description">{product.description}</p>
            <div className="detail-pricing">
              <div className="price-container">
                <span className="detail-price">{product.price.toFixed(2)} €</span>
                {product.originalPrice && (
                  <span className="detail-original-price">
                    {product.originalPrice.toFixed(2)} €
                  </span>
                )}
              </div>
              {product.inStock ? (
                <span className="stock-badge in-stock">✓ {t('inStock')}</span>
              ) : (
                <span className="stock-badge out-of-stock">✗ {t('outOfStock')}</span>
              )}
            </div>
            <div className="detail-specs">
              <h2>{t('characteristics')}</h2>
              <div className="specs-grid">
                {product.specs && Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="spec-item">
                    <span className="spec-label">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                    <span className="spec-value">{value}</span>
                  </div>
                ))}
                {product.shippingOrigin && (
                  <div className="spec-item shipping-info">
                    <span className="spec-label">{t('shipping')}:</span>
                    <span className="spec-value">📍 {product.shippingOrigin} ({product.shippingTime})</span>
                  </div>
                )}
              </div>
            </div>
            <div className="detail-actions">
              <button
                className="add-to-cart-btn-large"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {product.inStock ? t('addToCart') : t('outOfStock')}
              </button>
              <button className="wishlist-btn">
                ♡ {t('addToFavorites')}
              </button>
            </div>
          </div>
        </div>
        
        <AIRecommendations currentProductId={product.id} />
        
        <div className="product-comments">
          <h2 className="comments-title">{t('customerReviews')}</h2>
          
          <form className="comment-form" onSubmit={handleSubmitComment}>
            <div className="form-row">
              <input
                type="text"
                placeholder={t('yourName')}
                value={newComment.author}
                onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
                className="comment-input"
                required
              />
              <select
                value={newComment.rating}
                onChange={(e) => setNewComment({ ...newComment, rating: parseInt(e.target.value) })}
                className="comment-rating-select"
              >
                <option value={5}>5 ⭐</option>
                <option value={4}>4 ⭐</option>
                <option value={3}>3 ⭐</option>
                <option value={2}>2 ⭐</option>
                <option value={1}>1 ⭐</option>
              </select>
            </div>
            <textarea
              placeholder={t('yourReview')}
              value={newComment.text}
              onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
              className="comment-textarea"
              rows="4"
              required
            />
            <button type="submit" className="submit-comment-btn">
              {t('publishReview')}
            </button>
          </form>
          
          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <div className="comment-header">
                  <div className="comment-author-info">
                    <span className="comment-author">{comment.author}</span>
                    <div className="comment-rating">
                      {'⭐'.repeat(comment.rating)}
                    </div>
                  </div>
                  <span className="comment-date">{comment.date}</span>
                </div>
                <p className="comment-text">{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

