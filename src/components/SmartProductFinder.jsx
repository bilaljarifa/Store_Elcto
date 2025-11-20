import { useState, useMemo } from 'react'
import { products } from '../data/products'
import { useTranslation } from '../hooks/useTranslation'
import ProductCard from './ProductCard'
import './SmartProductFinder.css'

function SmartProductFinder({ onProductSelect, onAddToCart }) {
  const { t } = useTranslation()
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    rating: '',
    inStock: false,
    hasDiscount: false
  })
  const [showFilters, setShowFilters] = useState(false)

  const categories = [...new Set(products.map(p => p.category))]

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesSearch = 
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower)
        if (!matchesSearch) return false
      }

      // Category filter
      if (filters.category && product.category !== filters.category) {
        return false
      }

      // Price filters
      if (filters.minPrice && product.price < parseFloat(filters.minPrice)) {
        return false
      }
      if (filters.maxPrice && product.price > parseFloat(filters.maxPrice)) {
        return false
      }

      // Rating filter
      if (filters.rating && (!product.rating || product.rating < parseFloat(filters.rating))) {
        return false
      }

      // Stock filter
      if (filters.inStock && !product.inStock) {
        return false
      }

      // Discount filter
      if (filters.hasDiscount && !product.originalPrice) {
        return false
      }

      return true
    })
  }, [filters])

  const resetFilters = () => {
    setFilters({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      rating: '',
      inStock: false,
      hasDiscount: false
    })
  }

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const priceRange = useMemo(() => {
    const prices = products.map(p => p.price)
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    }
  }, [])

  return (
    <div className="smart-product-finder">
      <div className="finder-header">
        <h2>🔍 {t('smartSearch')}</h2>
        <button 
          className="toggle-filters-btn"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? t('hideFilters') : t('showFilters')}
        </button>
      </div>

      <div className="finder-search">
        <input
          type="text"
          placeholder={t('searchPlaceholder')}
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          className="finder-search-input"
        />
      </div>

      {showFilters && (
        <div className="finder-filters">
          <div className="filter-group">
            <label>{t('category') || 'Catégorie'}</label>
            <select
              value={filters.category}
              onChange={(e) => updateFilter('category', e.target.value)}
              className="filter-select"
            >
              <option value="">{t('allCategories')}</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>{t('minPrice')}</label>
            <input
              type="number"
              min={priceRange.min}
              max={priceRange.max}
              value={filters.minPrice}
              onChange={(e) => updateFilter('minPrice', e.target.value)}
              placeholder={priceRange.min}
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <label>{t('maxPrice')}</label>
            <input
              type="number"
              min={priceRange.min}
              max={priceRange.max}
              value={filters.maxPrice}
              onChange={(e) => updateFilter('maxPrice', e.target.value)}
              placeholder={priceRange.max}
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <label>{t('minRating')}</label>
            <select
              value={filters.rating}
              onChange={(e) => updateFilter('rating', e.target.value)}
              className="filter-select"
            >
              <option value="">{t('allRatings')}</option>
              <option value="4.5">4.5 ⭐ {t('andMore') || 'et plus'}</option>
              <option value="4">4 ⭐ {t('andMore') || 'et plus'}</option>
              <option value="3">3 ⭐ {t('andMore') || 'et plus'}</option>
            </select>
          </div>

          <div className="filter-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => updateFilter('inStock', e.target.checked)}
                className="filter-checkbox"
              />
              {t('inStockOnly')}
            </label>
          </div>

          <div className="filter-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.hasDiscount}
                onChange={(e) => updateFilter('hasDiscount', e.target.checked)}
                className="filter-checkbox"
              />
              {t('withDiscount')}
            </label>
          </div>

          <button className="reset-filters-btn" onClick={resetFilters}>
            {t('resetFilters')}
          </button>
        </div>
      )}

      <div className="finder-results">
        <div className="results-header">
          <span className="results-count">
            {filteredProducts.length} {filteredProducts.length > 1 ? t('productsFoundPlural') : t('productsFound')}
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="no-results">
            <p>{t('noProducts')}</p>
            <button className="clear-search-btn" onClick={resetFilters}>
              {t('clearFilters')}
            </button>
          </div>
        ) : (
          <div className="results-grid">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart || onProductSelect}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SmartProductFinder

