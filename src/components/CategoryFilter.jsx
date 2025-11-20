import { useTranslation } from '../hooks/useTranslation'
import './CategoryFilter.css'

function CategoryFilter({ selectedCategory, onCategoryChange }) {
  const { t } = useTranslation()
  
  const categories = [
    { key: '', label: t('all') },
    { key: 'Smartphones', label: 'Smartphones' },
    { key: 'Laptops', label: 'Laptops' },
    { key: 'Audio', label: 'Audio' },
    { key: 'Tablets', label: 'Tablets' },
    { key: 'Gaming', label: 'Gaming' },
    { key: 'Wearables', label: 'Wearables' }
  ]
  
  return (
    <div className="category-filter">
      {categories.map((category) => (
        <button
          key={category.key}
          className={`category-btn ${selectedCategory === category.key ? 'active' : ''}`}
          onClick={() => onCategoryChange(category.key)}
        >
          {category.label}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter

