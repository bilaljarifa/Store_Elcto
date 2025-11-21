import './Privacy.css'

function Shipping() {
  return (
    <div className="policy-page">
      <div className="container">
        <h1 className="policy-title">Politique de Livraison</h1>
        <div className="policy-content">
          <section>
            <h2>1. Zones de Livraison</h2>
            <p>Nous livrons dans toute la France métropolitaine. Les délais de livraison varient selon votre localisation et la méthode de livraison choisie.</p>
          </section>
          
          <section>
            <h2>2. Délais de Livraison</h2>
            <p>Les commandes sont généralement expédiées sous 24-48 heures. Le délai de livraison standard est de 3-5 jours ouvrés. La livraison express (24h) est disponible pour certains produits.</p>
          </section>
          
          <section>
            <h2>3. Frais de Livraison</h2>
            <p>Livraison gratuite pour les commandes supérieures à 50€. Pour les commandes inférieures, les frais de livraison sont de 5,99€. La livraison express coûte 9,99€.</p>
          </section>
          
          <section>
            <h2>4. Suivi de Commande</h2>
            <p>Vous recevrez un email de confirmation avec un numéro de suivi dès que votre commande sera expédiée. Vous pourrez suivre votre colis en temps réel.</p>
          </section>
          
          <section>
            <h2>5. Problèmes de Livraison</h2>
            <p>En cas de problème avec votre livraison, contactez-nous immédiatement à contact@elctro.com. Nous ferons notre maximum pour résoudre le problème rapidement.</p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Shipping

