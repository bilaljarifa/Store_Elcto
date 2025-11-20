import { useState } from 'react'
import { products } from '../data/products'
import { Link } from 'react-router-dom'
import { useTranslation } from '../hooks/useTranslation'
import './BundleCreator.css'

function BundleCreator({ onAddBundleToCart, forceShow = false }) {
  const { t } = useTranslation()
  const [selectedProducts, setSelectedProducts] = useState([])
  const [bundleName, setBundleName] = useState('')
  const [showCreator, setShowCreator] = useState(forceShow)

  const toggleProduct = (product) => {
    setSelectedProducts(prev => {
      const exists = prev.find(p => p.id === product.id)
      if (exists) {
        return prev.filter(p => p.id !== product.id)
      } else {
        return [...prev, product]
      }
    })
  }

  const calculateBundlePrice = () => {
    const total = selectedProducts.reduce((sum, p) => sum + p.price, 0)
    const discount = total * 0.15 // 15% discount on bundles
    return {
      original: total,
      discounted: total - discount,
      savings: discount
    }
  }

  const handleCreateBundle = () => {
    if (selectedProducts.length < 2) {
      alert(t('selectAtLeast'))
      return
    }

    const bundle = {
      id: `BUNDLE-${Date.now()}`,
      name: bundleName || `${t('bundleCreator')} ${selectedProducts.length} ${t('products') || 'produits'}`,
      products: selectedProducts,
      price: calculateBundlePrice().discounted,
      originalPrice: calculateBundlePrice().original,
      type: 'bundle'
    }

    if (onAddBundleToCart) {
      onAddBundleToCart(bundle)
    }

    // Reset
    setSelectedProducts([])
    setBundleName('')
    setShowCreator(false)
    alert(t('bundleCreated') || 'Bundle créé et ajouté au panier !')
  }

  const bundlePrice = selectedProducts.length >= 2 ? calculateBundlePrice() : null

  if (!showCreator && !forceShow) {
    return (
      <div className="bundle-creator-toggle">
        <button 
          className="show-bundle-creator-btn"
          onClick={() => setShowCreator(true)}
        >
          🎁 {t('createBundle')}
        </button>
      </div>
    )
  }

  return (
    <div className="bundle-creator">
      <div className="bundle-header">
        <h2>{t('bundleCreator')}</h2>
        {!forceShow && (
          <button className="close-bundle-btn" onClick={() => setShowCreator(false)}>×</button>
        )}
      </div>

      <div className="bundle-content">
        <div className="bundle-products-selector">
          <h3>{t('selectProducts')} ({selectedProducts.length} {t('selected')})</h3>
          <div className="products-grid">
            {products.slice(0, 12).map(product => {
              const isSelected = selectedProducts.find(p => p.id === product.id)
              return (
                <div
                  key={product.id}
                  className={`product-select-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => toggleProduct(product)}
                >
                  <div className="select-item-checkbox">
                    {isSelected && '✓'}
                  </div>
                  <img src={product.image} alt={product.name} />
                  <div className="select-item-info">
                    <span className="select-item-name">{product.name}</span>
                    <span className="select-item-price">{product.price.toFixed(2)} €</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bundle-summary">
          <h3>{t('bundleSummary')}</h3>
          
          {selectedProducts.length === 0 ? (
            <p className="no-selection">{t('selectAtLeast')}</p>
          ) : (
            <>
              <div className="selected-products-list">
                {selectedProducts.map(product => (
                  <div key={product.id} className="selected-product-item">
                    <span>{product.name}</span>
                    <span>{product.price.toFixed(2)} €</span>
                    <button 
                      className="remove-product-btn"
                      onClick={() => toggleProduct(product)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              {bundlePrice && (
                <div className="bundle-pricing">
                  <div className="price-row">
                    <span>{t('totalPrice') || 'Prix total'}:</span>
                    <span className="original-price">{bundlePrice.original.toFixed(2)} €</span>
                  </div>
                  <div className="price-row discount">
                    <span>{t('bundleDiscount')}:</span>
                    <span className="discount-amount">-{bundlePrice.savings.toFixed(2)} €</span>
                  </div>
                  <div className="price-row total">
                    <span>{t('bundlePrice')}:</span>
                    <span className="bundle-total">{bundlePrice.discounted.toFixed(2)} €</span>
                  </div>
                </div>
              )}

              <div className="bundle-name-input">
                <label>{t('bundleName')}</label>
                <input
                  type="text"
                  value={bundleName}
                  onChange={(e) => setBundleName(e.target.value)}
                  placeholder="Ex: Bundle Gaming"
                />
              </div>

              <button
                className="create-bundle-btn"
                onClick={handleCreateBundle}
                disabled={selectedProducts.length < 2}
              >
                {t('createAndAdd')}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default BundleCreator

