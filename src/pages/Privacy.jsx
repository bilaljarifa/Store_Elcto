import './Privacy.css'

function Privacy() {
  return (
    <div className="policy-page">
      <div className="container">
        <h1 className="policy-title">Politique de Confidentialité</h1>
        <div className="policy-content">
          <section>
            <h2>1. Collecte des Informations</h2>
            <p>Nous collectons les informations que vous nous fournissez directement lors de l'utilisation de notre site, notamment lors de la création d'un compte, d'une commande ou d'une inscription à notre newsletter.</p>
          </section>
          
          <section>
            <h2>2. Utilisation des Informations</h2>
            <p>Vos informations personnelles sont utilisées pour traiter vos commandes, améliorer nos services, et vous communiquer des informations importantes concernant votre compte et vos commandes.</p>
          </section>
          
          <section>
            <h2>3. Protection des Données</h2>
            <p>Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations personnelles contre tout accès non autorisé, altération, divulgation ou destruction.</p>
          </section>
          
          <section>
            <h2>4. Cookies</h2>
            <p>Notre site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.</p>
          </section>
          
          <section>
            <h2>5. Vos Droits</h2>
            <p>Vous avez le droit d'accéder, de modifier, de supprimer vos données personnelles ou de vous opposer à leur traitement. Contactez-nous à contact@elctro.com pour exercer ces droits.</p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Privacy

