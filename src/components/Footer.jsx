import { Link } from 'react-router-dom'
import { useTranslation } from '../hooks/useTranslation'
import './Footer.css'

function Footer() {
  const { t } = useTranslation()
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Store Elcto</h3>
            <p className="footer-description">
              {t('aboutDescription')}
            </p>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">{t('quickLinks')}</h4>
            <ul className="footer-links">
              <li><Link to="/">{t('home')}</Link></li>
              <li><Link to="/about">{t('about')}</Link></li>
              <li><Link to="/contact">{t('contact')}</Link></li>
              <li><Link to="/tracking">{t('tracking')}</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">{t('account')}</h4>
            <ul className="footer-links">
              <li><Link to="/signin">{t('signIn')}</Link></li>
              <li><Link to="/signup">{t('signUp')}</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">{t('contactInfo')}</h4>
            <ul className="footer-links">
              <li>Email: contact@storeelcto.com</li>
              <li>{t('phoneNumber')}: +33 1 23 45 67 89</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">{t('followUs') || 'Suivez-nous'}</h4>
            <div className="social-media">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                📷
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                👥
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="TikTok">
                🎵
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter">
                🐦
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Store Elcto. {t('allRightsReserved')}.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

