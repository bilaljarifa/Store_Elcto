import { useState, useEffect } from 'react'
import './WelcomeBanner.css'

function WelcomeBanner({ onClose }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      if (onClose) onClose()
    }, 5000) // Disparaît après 5 secondes

    return () => clearTimeout(timer)
  }, [onClose])

  const handleClose = () => {
    setIsVisible(false)
    if (onClose) onClose()
  }

  if (!isVisible) return null

  return (
    <div className="welcome-banner">
      <div className="welcome-content">
        <div className="welcome-icon">👋</div>
        <div className="welcome-text">
          <h2 className="welcome-title">Hi World!</h2>
          <p className="welcome-message">Welcome to BILAL ELCTRO</p>
          <p className="welcome-subtitle">Your destination for the best electronics</p>
        </div>
        <button 
          className="welcome-close"
          onClick={handleClose}
          aria-label="Close welcome message"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

export default WelcomeBanner

