import './Services.css'

function Services() {
  return (
    <div className="services-page">
      <div className="container">
        <h1 className="page-title">Services & Contact</h1>
        
        <div className="services-content">
          <section className="services-section">
            <h2 className="section-title">Nos Services</h2>
            <div className="services-grid">
              <div className="service-card">
                <div className="service-icon">🚚</div>
                <h3 className="service-name">Livraison Gratuite</h3>
                <p className="service-description">
                  Livraison gratuite pour toutes les commandes supérieures à 50€. 
                  Recevez vos produits rapidement et en toute sécurité.
                </p>
              </div>

              <div className="service-card">
                <div className="service-icon">↩️</div>
                <h3 className="service-name">Retour Gratuit sous 30 jours</h3>
                <p className="service-description">
                  Vous n'êtes pas satisfait ? Retournez votre achat gratuitement 
                  dans les 30 jours suivant la réception.
                </p>
              </div>

              <div className="service-card">
                <div className="service-icon">🛡️</div>
                <h3 className="service-name">Garantie 2 ans</h3>
                <p className="service-description">
                  Tous nos produits électroniques bénéficient d'une garantie 
                  constructeur de 2 ans pour votre tranquillité d'esprit.
                </p>
              </div>

              <div className="service-card">
                <div className="service-icon">💬</div>
                <h3 className="service-name">Support Client 24/7</h3>
                <p className="service-description">
                  Notre équipe de support est disponible 24h/24 et 7j/7 
                  pour répondre à toutes vos questions.
                </p>
              </div>

              <div className="service-card">
                <div className="service-icon">🏠</div>
                <h3 className="service-name">Installation à domicile</h3>
                <p className="service-description">
                  Profitez de notre service d'installation à domicile pour 
                  vos produits électroniques. Service professionnel garanti.
                </p>
              </div>
            </div>
          </section>

          <section className="contact-section">
            <h2 className="section-title">Contact</h2>
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div className="contact-details">
                  <h3>Email</h3>
                  <a href="mailto:contact@elctro.com">contact@elctro.com</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div className="contact-details">
                  <h3>Téléphone</h3>
                  <a href="tel:+33123456789">+33 1 23 45 67 89</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div className="contact-details">
                  <h3>Adresse</h3>
                  <p>123 Rue de la Tech, Paris</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">🕒</div>
                <div className="contact-details">
                  <h3>Horaires</h3>
                  <p>Lun-Ven: 9h-18h</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Services

