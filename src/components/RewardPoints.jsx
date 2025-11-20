import { useState, useEffect } from 'react'
import './RewardPoints.css'

function RewardPoints() {
  const [points, setPoints] = useState(0)
  const [history, setHistory] = useState([])

  useEffect(() => {
    const savedPoints = parseInt(localStorage.getItem('rewardPoints') || '0')
    const savedHistory = JSON.parse(localStorage.getItem('rewardHistory') || '[]')
    setPoints(savedPoints)
    setHistory(savedHistory)
  }, [])

  const addPoints = (amount, reason) => {
    const newPoints = points + amount
    setPoints(newPoints)
    localStorage.setItem('rewardPoints', newPoints.toString())
    
    const newHistoryItem = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      points: `+${amount}`,
      reason: reason,
      type: 'earned'
    }
    const newHistory = [newHistoryItem, ...history]
    setHistory(newHistory)
    localStorage.setItem('rewardHistory', JSON.stringify(newHistory))
  }

  const redeemPoints = (amount, reason) => {
    if (points >= amount) {
      const newPoints = points - amount
      setPoints(newPoints)
      localStorage.setItem('rewardPoints', newPoints.toString())
      
      const newHistoryItem = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        points: `-${amount}`,
        reason: reason,
        type: 'redeemed'
      }
      const newHistory = [newHistoryItem, ...history]
      setHistory(newHistory)
      localStorage.setItem('rewardHistory', JSON.stringify(newHistory))
      return true
    }
    return false
  }

  const pointsToEuros = (pts) => {
    return (pts / 100).toFixed(2)
  }

  return (
    <div className="reward-points">
      <div className="points-header">
        <h2>Points de récompense</h2>
        <div className="points-balance">
          <div className="points-value">{points}</div>
          <div className="points-label">points</div>
          <div className="points-equivalent">≈ {pointsToEuros(points)} €</div>
        </div>
      </div>

      <div className="points-info">
        <div className="info-card">
          <h3>Comment gagner des points ?</h3>
          <ul>
            <li>✅ Achat: 1 point par euro dépensé</li>
            <li>✅ Avis produit: 50 points</li>
            <li>✅ Partage sur réseaux: 25 points</li>
            <li>✅ Parrainage: 100 points</li>
          </ul>
        </div>
        <div className="info-card">
          <h3>Comment utiliser vos points ?</h3>
          <ul>
            <li>💳 100 points = 1 € de réduction</li>
            <li>💳 Utilisable sur tous les produits</li>
            <li>💳 Cumulable avec les promotions</li>
          </ul>
        </div>
      </div>

      <div className="points-history">
        <h3>Historique</h3>
        {history.length === 0 ? (
          <div className="no-history">Aucun historique pour le moment</div>
        ) : (
          <div className="history-list">
            {history.map(item => (
              <div key={item.id} className={`history-item ${item.type}`}>
                <div className="history-date">{item.date}</div>
                <div className="history-details">
                  <span className="history-reason">{item.reason}</span>
                  <span className={`history-points ${item.type}`}>
                    {item.points} points
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default RewardPoints


