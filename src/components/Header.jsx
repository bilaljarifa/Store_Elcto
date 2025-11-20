import { Link } from 'react-router-dom'
import { useState } from 'react'
import LanguageSelector from './LanguageSelector'
import BundleCreator from './BundleCreator'
import { useTranslation } from '../hooks/useTranslation'
import './Header.css'

function Header({ cartItemCount, onCartClick, onAddToCart }) {
  const { t } = useTranslation()
  const [showBundleCreator, setShowBundleCreator] = useState(false)
  
  return (
    <>
      <header className="header">
        <div className="header-container">
          <Link to="/" className="logo">
            <span className="logo-text-3d">Store Elcto</span>
          </Link>
          <div className="header-right">
            <LanguageSelector />
            <Link to="/tracking" className="nav-link">{t('tracking')}</Link>
            <Link to="/signin" className="nav-link">{t('signIn')}</Link>
            <button 
              className="bundle-creator-btn"
              onClick={() => setShowBundleCreator(!showBundleCreator)}
            >
              🎁 {t('createBundle')}
            </button>
            <button className="cart-button" onClick={onCartClick}>
              <span className="cart-icon">🛒</span>
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </button>
          </div>
        </div>
      </header>
      {showBundleCreator && (
        <div className="header-bundle-creator">
          <BundleCreator onAddBundleToCart={onAddToCart} forceShow={true} />
        </div>
      )}
    </>
  )
}

export default Header

