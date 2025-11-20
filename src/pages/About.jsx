import { useTranslation } from '../hooks/useTranslation'
import './About.css'

function About() {
  const { t } = useTranslation()
  
  return (
    <div className="about-page">
      <div className="container">
        <div className="about-hero">
          <h1 className="about-title">Store Elcto</h1>
          <p className="about-subtitle">{t('aboutSubtitle') || 'Votre partenaire technologique de confiance'}</p>
        </div>
        
        <div className="about-grid">
          <div className="about-card">
            <div className="card-icon">🚀</div>
            <h3>{t('innovation') || 'Innovation'}</h3>
            <p>{t('innovationDesc') || 'Nous sélectionnons les dernières innovations technologiques pour vous offrir le meilleur.'}</p>
          </div>
          
          <div className="about-card">
            <div className="card-icon">💎</div>
            <h3>{t('quality') || 'Qualité'}</h3>
            <p>{t('qualityDesc') || 'Chaque produit est soigneusement choisi pour garantir une qualité exceptionnelle.'}</p>
          </div>
          
          <div className="about-card">
            <div className="card-icon">⚡</div>
            <h3>{t('speed') || 'Rapidité'}</h3>
            <p>{t('speedDesc') || 'Livraison express pour que vous receviez vos produits au plus vite.'}</p>
          </div>
          
          <div className="about-card">
            <div className="card-icon">🛡️</div>
            <h3>{t('security') || 'Sécurité'}</h3>
            <p>{t('securityDesc') || 'Paiements sécurisés et garantie complète sur tous nos produits.'}</p>
          </div>
          
          <div className="about-card">
            <div className="card-icon">👥</div>
            <h3>{t('support') || 'Support'}</h3>
            <p>{t('supportDesc') || 'Une équipe dédiée à votre service pour répondre à toutes vos questions.'}</p>
          </div>
          
          <div className="about-card">
            <div className="card-icon">💰</div>
            <h3>{t('price') || 'Prix'}</h3>
            <p>{t('priceDesc') || 'Les meilleurs prix du marché sans compromis sur la qualité.'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About

