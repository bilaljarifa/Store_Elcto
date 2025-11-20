import BundleCreator from '../components/BundleCreator'
import SmartProductFinder from '../components/SmartProductFinder'
import './Home.css'

function Home({ onAddToCart }) {
  return (
    <div className="home-page">
      <div className="container">
        <SmartProductFinder onAddToCart={onAddToCart} />
      </div>
    </div>
  )
}

export default Home

