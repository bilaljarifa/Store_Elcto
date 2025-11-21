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
    brand: '',
    model: '',
    condition: '',
    minPrice: '',
    maxPrice: '',
    rating: '',
    color: '',
    freeShipping: false,
    fastShipping: false,
    warranty: false,
    sellerType: '',
    inStore: false,
    sortBy: '',
    ram: '',
    storage: '',
    screenSize: '',
    material: '',
    ecoFriendly: false,
    specialOffer: '',
    inStock: false,
    hasDiscount: false
  })
  const [showFilters, setShowFilters] = useState(false)

  const categories = [...new Set(products.map(p => p.category))]
  const brands = [...new Set(products.map(p => {
    const brandMatch = p.name.match(/^(iPhone|Samsung|MacBook|Dell|Sony|AirPods|iPad|Nintendo|PlayStation|Apple)/i)
    return brandMatch ? brandMatch[1] : p.name.split(' ')[0]
  }).filter(Boolean))]
  
  const conditions = ['Neuf', 'Reconditionné', 'Occasion']
  const sellerTypes = ['Professionnel', 'Particulier']
  const sortOptions = [
    { value: '', label: 'Par défaut' },
    { value: 'popularity', label: 'Popularité' },
    { value: 'newest', label: 'Plus récents' },
    { value: 'bestseller', label: 'Meilleures ventes' },
    { value: 'price-asc', label: 'Prix croissant' },
    { value: 'price-desc', label: 'Prix décroissant' },
    { value: 'rating', label: 'Meilleures notes' }
  ]
  const ramOptions = ['4GB', '8GB', '12GB', '16GB', '32GB']
  const storageOptions = ['64GB', '128GB', '256GB', '512GB', '1TB']
  const screenSizes = ['6"', '6.1"', '6.8"', '12.4"', '12.9"', '15.6"', '16"', '16.2"']
  const materials = ['Aluminium', 'Plastique', 'Verre', 'Acier', 'Cuir', 'Tissu']
  
  const availableColors = [
    { name: 'Black', value: 'black', hex: '#000000' },
    { name: 'White', value: 'white', hex: '#FFFFFF' },
    { name: 'Blue', value: 'blue', hex: '#3b82f6' },
    { name: 'Red', value: 'red', hex: '#ef4444' },
    { name: 'Green', value: 'green', hex: '#10b981' },
    { name: 'Silver', value: 'silver', hex: '#94a3b8' },
    { name: 'Gold', value: 'gold', hex: '#f59e0b' },
    { name: 'Purple', value: 'purple', hex: '#a855f7' },
    { name: 'Pink', value: 'pink', hex: '#ec4899' },
    { name: 'Gray', value: 'gray', hex: '#6b7280' },
    { name: 'Orange', value: 'orange', hex: '#f97316' },
    { name: 'Yellow', value: 'yellow', hex: '#eab308' },
    { name: 'Cyan', value: 'cyan', hex: '#06b6d4' },
    { name: 'Brown', value: 'brown', hex: '#92400e' },
    { name: 'Rose', value: 'rose', hex: '#f43f5e' },
    { name: 'Indigo', value: 'indigo', hex: '#6366f1' },
    { name: 'Teal', value: 'teal', hex: '#14b8a6' },
    { name: 'Lime', value: 'lime', hex: '#84cc16' }
  ]

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
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

      // Color filter
      if (filters.color) {
        const productNameLower = product.name.toLowerCase()
        const productDescLower = product.description.toLowerCase()
        const productCategoryLower = product.category.toLowerCase()
        const colorLower = filters.color.toLowerCase()
        const colorName = availableColors.find(c => c.value === filters.color)?.name.toLowerCase() || ''
        
        const matchesColor = 
          productNameLower.includes(colorLower) ||
          productDescLower.includes(colorLower) ||
          productCategoryLower.includes(colorLower) ||
          (colorName && (productNameLower.includes(colorName) || productDescLower.includes(colorName))) ||
          (product.color && product.color.toLowerCase() === colorLower)
        
        if (!matchesColor) return false
      }

      // Stock filter
      if (filters.inStock && !product.inStock) {
        return false
      }

      // Discount filter
      if (filters.hasDiscount && !product.originalPrice) {
        return false
      }

      // Brand filter
      if (filters.brand) {
        const productBrand = product.name.split(' ')[0]
        if (productBrand.toLowerCase() !== filters.brand.toLowerCase()) {
          return false
        }
      }

      // Model filter
      if (filters.model) {
        const modelLower = filters.model.toLowerCase()
        if (!product.name.toLowerCase().includes(modelLower) && 
            !product.description.toLowerCase().includes(modelLower)) {
          return false
        }
      }

      // Condition filter
      if (filters.condition) {
        const productCondition = product.condition || 'Neuf'
        if (productCondition !== filters.condition) {
          return false
        }
      }

      // Free shipping filter
      if (filters.freeShipping && product.price < 50) {
        return false
      }

      // Fast shipping filter
      if (filters.fastShipping) {
        const fastShippingTime = product.shippingTime?.includes('24h') || 
                                 product.shippingTime?.includes('express') ||
                                 parseInt(product.shippingTime) <= 3
        if (!fastShippingTime) {
          return false
        }
      }

      // Warranty filter
      if (filters.warranty && !product.warranty) {
        return false
      }

      // Seller type filter
      if (filters.sellerType) {
        const sellerType = product.sellerType || 'Professionnel'
        if (sellerType !== filters.sellerType) {
          return false
        }
      }

      // In-store availability
      if (filters.inStore && !product.inStore) {
        return false
      }

      // RAM filter
      if (filters.ram && product.specs?.ram) {
        if (!product.specs.ram.includes(filters.ram)) {
          return false
        }
      }

      // Storage filter
      if (filters.storage && product.specs?.storage) {
        if (!product.specs.storage.includes(filters.storage)) {
          return false
        }
      }

      // Screen size filter
      if (filters.screenSize && product.specs?.display) {
        if (!product.specs.display.includes(filters.screenSize)) {
          return false
        }
      }

      // Material filter
      if (filters.material) {
        const materialLower = filters.material.toLowerCase()
        const productText = (product.name + ' ' + product.description).toLowerCase()
        if (!productText.includes(materialLower)) {
          return false
        }
      }

      // Eco-friendly filter
      if (filters.ecoFriendly && !product.ecoFriendly) {
        return false
      }

      // Special offer filter
      if (filters.specialOffer) {
        if (filters.specialOffer === 'cashback' && !product.cashback) {
          return false
        }
        if (filters.specialOffer === 'bundle' && !product.bundleAvailable) {
          return false
        }
      }

      return true
    })

    // Sort products
    if (filters.sortBy) {
      filtered = [...filtered].sort((a, b) => {
        switch (filters.sortBy) {
          case 'price-asc':
            return a.price - b.price
          case 'price-desc':
            return b.price - a.price
          case 'rating':
            return (b.rating || 0) - (a.rating || 0)
          case 'newest':
            return (b.id || 0) - (a.id || 0)
          case 'popularity':
            return (b.popularity || 0) - (a.popularity || 0)
          case 'bestseller':
            return (b.salesCount || 0) - (a.salesCount || 0)
          default:
            return 0
        }
      })
    }

    return filtered
  }, [filters])

  const resetFilters = () => {
    setFilters({
      search: '',
      category: '',
      brand: '',
      model: '',
      condition: '',
      minPrice: '',
      maxPrice: '',
      rating: '',
      color: '',
      freeShipping: false,
      fastShipping: false,
      warranty: false,
      sellerType: '',
      inStore: false,
      sortBy: '',
      ram: '',
      storage: '',
      screenSize: '',
      material: '',
      ecoFriendly: false,
      specialOffer: '',
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
        <h2 className="finder-title">Recherche Intelligente</h2>
        <button 
          className="toggle-filters-btn"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? 'Masquer les filtres' : 'Afficher les filtres'}
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

          <div className="filter-group">
            <label>{t('color') || 'Color'}</label>
            <div className="color-filter">
              {availableColors.map(color => (
                <button
                  key={color.value}
                  type="button"
                  className={`color-swatch ${filters.color === color.value ? 'active' : ''}`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => updateFilter('color', filters.color === color.value ? '' : color.value)}
                  title={color.name}
                  aria-label={color.name}
                >
                  {filters.color === color.value && <span className="color-check">✓</span>}
                </button>
              ))}
            </div>
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

          <div className="filter-group">
            <label>Marque</label>
            <select
              value={filters.brand}
              onChange={(e) => updateFilter('brand', e.target.value)}
              className="filter-select"
            >
              <option value="">Toutes les marques</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Modèle</label>
            <input
              type="text"
              value={filters.model}
              onChange={(e) => updateFilter('model', e.target.value)}
              placeholder="Rechercher un modèle"
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <label>État du produit</label>
            <select
              value={filters.condition}
              onChange={(e) => updateFilter('condition', e.target.value)}
              className="filter-select"
            >
              <option value="">Tous les états</option>
              {conditions.map(condition => (
                <option key={condition} value={condition}>{condition}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>RAM</label>
            <select
              value={filters.ram}
              onChange={(e) => updateFilter('ram', e.target.value)}
              className="filter-select"
            >
              <option value="">Toutes les RAM</option>
              {ramOptions.map(ram => (
                <option key={ram} value={ram}>{ram}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Stockage</label>
            <select
              value={filters.storage}
              onChange={(e) => updateFilter('storage', e.target.value)}
              className="filter-select"
            >
              <option value="">Tous les stockages</option>
              {storageOptions.map(storage => (
                <option key={storage} value={storage}>{storage}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Taille d'écran</label>
            <select
              value={filters.screenSize}
              onChange={(e) => updateFilter('screenSize', e.target.value)}
              className="filter-select"
            >
              <option value="">Toutes les tailles</option>
              {screenSizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Matériau</label>
            <select
              value={filters.material}
              onChange={(e) => updateFilter('material', e.target.value)}
              className="filter-select"
            >
              <option value="">Tous les matériaux</option>
              {materials.map(material => (
                <option key={material} value={material}>{material}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Type de vendeur</label>
            <select
              value={filters.sellerType}
              onChange={(e) => updateFilter('sellerType', e.target.value)}
              className="filter-select"
            >
              <option value="">Tous les vendeurs</option>
              {sellerTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Offres spéciales</label>
            <select
              value={filters.specialOffer}
              onChange={(e) => updateFilter('specialOffer', e.target.value)}
              className="filter-select"
            >
              <option value="">Aucune offre</option>
              <option value="cashback">Cashback</option>
              <option value="bundle">Bundle/Pack</option>
            </select>
          </div>

          <div className="filter-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.freeShipping}
                onChange={(e) => updateFilter('freeShipping', e.target.checked)}
                className="filter-checkbox"
              />
              Livraison gratuite
            </label>
          </div>

          <div className="filter-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.fastShipping}
                onChange={(e) => updateFilter('fastShipping', e.target.checked)}
                className="filter-checkbox"
              />
              Livraison rapide (24-48h)
            </label>
          </div>

          <div className="filter-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.warranty}
                onChange={(e) => updateFilter('warranty', e.target.checked)}
                className="filter-checkbox"
              />
              Avec garantie
            </label>
          </div>

          <div className="filter-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.inStore}
                onChange={(e) => updateFilter('inStore', e.target.checked)}
                className="filter-checkbox"
              />
              Disponible en magasin
            </label>
          </div>

          <div className="filter-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.ecoFriendly}
                onChange={(e) => updateFilter('ecoFriendly', e.target.checked)}
                className="filter-checkbox"
              />
              Produit éco-responsable
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
            {filteredAndSortedProducts.length} {filteredAndSortedProducts.length > 1 ? t('productsFoundPlural') : t('productsFound')}
          </span>
          <div className="sort-filter">
            <label>Trier par:</label>
            <select
              value={filters.sortBy}
              onChange={(e) => updateFilter('sortBy', e.target.value)}
              className="sort-select"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>

        {filteredAndSortedProducts.length === 0 ? (
          <div className="no-results">
            <p>{t('noProducts')}</p>
            <button className="clear-search-btn" onClick={resetFilters}>
              {t('clearFilters')}
            </button>
          </div>
        ) : (
          <div className="results-grid">
            {filteredAndSortedProducts.map(product => (
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

