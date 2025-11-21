import './AnnouncementBanner.css'

function AnnouncementBanner({ className = '' }) {
  return (
    <div className={`announcement-banner ${className}`}>
      <div className="banner-content">
        <div className="banner-item">
          <span className="banner-icon">🎉</span>
          <span className="banner-text">Livraison GRATUITE pour toutes les commandes supérieures à 50€</span>
        </div>
        <div className="banner-separator">•</div>
        <div className="banner-item">
          <span className="banner-icon">💻</span>
          <span className="banner-text">Sarah a acheté un MacBook Pro 16" - Livraison express en 24h</span>
        </div>
        <div className="banner-separator">•</div>
        <div className="banner-item">
          <span className="banner-icon">🔥</span>
          <span className="banner-text">Promotion spéciale: -20% sur tous les laptops jusqu'à la fin du mois</span>
        </div>
        <div className="banner-separator">•</div>
        <div className="banner-item">
          <span className="banner-icon">💻</span>
          <span className="banner-text">Marc vient d'acheter un Dell XPS 15 - Satisfait à 100%</span>
        </div>
        <div className="banner-separator">•</div>
        <div className="banner-item">
          <span className="banner-icon">⚡</span>
          <span className="banner-text">Garantie 2 ans incluse sur tous les produits électroniques</span>
        </div>
        <div className="banner-separator">•</div>
        <div className="banner-item">
          <span className="banner-icon">💻</span>
          <span className="banner-text">Sophie a choisi un MacBook Pro - Installation à domicile offerte</span>
        </div>
        <div className="banner-separator">•</div>
        <div className="banner-item">
          <span className="banner-icon">🎁</span>
          <span className="banner-text">Retour gratuit sous 30 jours - Achetez en toute confiance</span>
        </div>
      </div>
      <div className="banner-content" aria-hidden="true">
        <div className="banner-item">
          <span className="banner-icon">🎉</span>
          <span className="banner-text">Livraison GRATUITE pour toutes les commandes supérieures à 50€</span>
        </div>
        <div className="banner-separator">•</div>
        <div className="banner-item">
          <span className="banner-icon">💻</span>
          <span className="banner-text">Sarah a acheté un MacBook Pro 16" - Livraison express en 24h</span>
        </div>
        <div className="banner-separator">•</div>
        <div className="banner-item">
          <span className="banner-icon">🔥</span>
          <span className="banner-text">Promotion spéciale: -20% sur tous les laptops jusqu'à la fin du mois</span>
        </div>
        <div className="banner-separator">•</div>
        <div className="banner-item">
          <span className="banner-icon">💻</span>
          <span className="banner-text">Marc vient d'acheter un Dell XPS 15 - Satisfait à 100%</span>
        </div>
        <div className="banner-separator">•</div>
        <div className="banner-item">
          <span className="banner-icon">⚡</span>
          <span className="banner-text">Garantie 2 ans incluse sur tous les produits électroniques</span>
        </div>
        <div className="banner-separator">•</div>
        <div className="banner-item">
          <span className="banner-icon">💻</span>
          <span className="banner-text">Sophie a choisi un MacBook Pro - Installation à domicile offerte</span>
        </div>
        <div className="banner-separator">•</div>
        <div className="banner-item">
          <span className="banner-icon">🎁</span>
          <span className="banner-text">Retour gratuit sous 30 jours - Achetez en toute confiance</span>
        </div>
      </div>
    </div>
  )
}

export default AnnouncementBanner

