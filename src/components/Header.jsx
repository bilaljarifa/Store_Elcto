import { Link } from 'react-router-dom'
import { useState } from 'react'
import LanguageSelector from './LanguageSelector'
import ThemeToggle from './ThemeToggle'
import { useTranslation } from '../hooks/useTranslation'
import './Header.css'

function Header({ cartItemCount, onCartClick, onAddToCart }) {
  const { t } = useTranslation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  return (
    <>
      <header className="header">
        <div className="header-container">
          <Link to="/" className="logo" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="logo-text">BILAL ELCTRO</span>
          </Link>
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={isMobileMenuOpen ? 'hamburger open' : 'hamburger'}></span>
          </button>
          <div className={`header-right ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <ThemeToggle />
            <LanguageSelector />
            <Link to="/tracking" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>{t('tracking')}</span>
            </Link>
            <Link to="/signin" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                <polyline points="10 17 15 12 10 7"></polyline>
                <line x1="15" y1="12" x2="3" y2="12"></line>
              </svg>
              <span>{t('signIn')}</span>
            </Link>
            <Link to="/signup" className="nav-link signup-link" onClick={() => setIsMobileMenuOpen(false)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
              </svg>
              <span>{t('signUp')}</span>
            </Link>
            <button className="cart-button" onClick={onCartClick}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount}</span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header

