import { useState, useEffect } from 'react'
import './AdminPanel.css'

function AdminPanel() {
  const [orders, setOrders] = useState([])
  const [filter, setFilter] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = () => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]')
    setOrders(savedOrders)
  }

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        const updatedTracking = [...order.tracking]
        updatedTracking.push({
          date: new Date().toISOString().split('T')[0],
          status: newStatus,
          location: getStatusLocation(newStatus)
        })
        return {
          ...order,
          status: newStatus,
          tracking: updatedTracking
        }
      }
      return order
    })
    setOrders(updatedOrders)
    localStorage.setItem('orders', JSON.stringify(updatedOrders))
    if (selectedOrder?.id === orderId) {
      setSelectedOrder(updatedOrders.find(o => o.id === orderId))
    }
  }

  const getStatusLocation = (status) => {
    const locations = {
      'Commande confirmée': 'En attente d\'expédition',
      'Expédié': 'Entrepôt',
      'En transit': 'En route',
      'Arrivé en France': 'Paris, France',
      'Livré': 'Adresse de livraison'
    }
    return locations[status] || 'En transit'
  }

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status.toLowerCase().includes(filter.toLowerCase()))

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'Commande confirmée').length,
    shipped: orders.filter(o => o.status === 'Expédié' || o.status === 'En transit').length,
    delivered: orders.filter(o => o.status === 'Livré').length
  }

  return (
    <div className="admin-panel">
      <div className="container">
        <div className="admin-header">
          <h1>Panneau d'administration</h1>
          <p>Gérez les commandes et le suivi</p>
        </div>

        <div className="admin-stats">
          <div className="stat-card">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total commandes</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.pending}</div>
            <div className="stat-label">En attente</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.shipped}</div>
            <div className="stat-label">Expédiées</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.delivered}</div>
            <div className="stat-label">Livrées</div>
          </div>
        </div>

        <div className="admin-filters">
          <button 
            className={filter === 'all' ? 'active' : ''} 
            onClick={() => setFilter('all')}
          >
            Toutes
          </button>
          <button 
            className={filter === 'pending' ? 'active' : ''} 
            onClick={() => setFilter('pending')}
          >
            En attente
          </button>
          <button 
            className={filter === 'shipped' ? 'active' : ''} 
            onClick={() => setFilter('shipped')}
          >
            Expédiées
          </button>
          <button 
            className={filter === 'delivered' ? 'active' : ''} 
            onClick={() => setFilter('delivered')}
          >
            Livrées
          </button>
        </div>

        <div className="orders-list">
          {filteredOrders.length === 0 ? (
            <div className="no-orders">Aucune commande trouvée</div>
          ) : (
            filteredOrders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-card-header">
                  <div>
                    <h3>Commande #{order.id}</h3>
                    <p className="order-card-date">{order.date}</p>
                  </div>
                  <div className="order-card-status" data-status={order.status.toLowerCase().replace(' ', '-')}>
                    {order.status}
                  </div>
                </div>
                <div className="order-card-body">
                  <div className="order-items-preview">
                    {order.items.slice(0, 2).map((item, idx) => (
                      <span key={idx} className="item-tag">{item.name} x{item.quantity}</span>
                    ))}
                    {order.items.length > 2 && (
                      <span className="item-tag">+{order.items.length - 2} autres</span>
                    )}
                  </div>
                  <div className="order-total-preview">
                    Total: {order.total.toFixed(2)} €
                  </div>
                </div>
                <div className="order-card-actions">
                  <button 
                    className="view-btn"
                    onClick={() => setSelectedOrder(order)}
                  >
                    Voir détails
                  </button>
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className="status-select"
                  >
                    <option value="Commande confirmée">Commande confirmée</option>
                    <option value="Expédié">Expédié</option>
                    <option value="En transit">En transit</option>
                    <option value="Arrivé en France">Arrivé en France</option>
                    <option value="Livré">Livré</option>
                  </select>
                </div>
              </div>
            ))
          )}
        </div>

        {selectedOrder && (
          <div className="order-modal" onClick={() => setSelectedOrder(null)}>
            <div className="order-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Commande #{selectedOrder.id}</h2>
                <button className="close-btn" onClick={() => setSelectedOrder(null)}>×</button>
              </div>
              <div className="modal-body">
                <div className="modal-section">
                  <h3>Articles</h3>
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="modal-item">
                      <span>{item.name}</span>
                      <span>Qté: {item.quantity}</span>
                      <span>{(item.price * item.quantity).toFixed(2)} €</span>
                    </div>
                  ))}
                  <div className="modal-total">
                    <span>Total:</span>
                    <span>{selectedOrder.total.toFixed(2)} €</span>
                  </div>
                </div>
                <div className="modal-section">
                  <h3>Adresse de livraison</h3>
                  <p>{selectedOrder.shippingAddress}</p>
                </div>
                <div className="modal-section">
                  <h3>Suivi</h3>
                  <div className="modal-timeline">
                    {selectedOrder.tracking?.map((step, idx) => (
                      <div key={idx} className="modal-timeline-step">
                        <div className="modal-timeline-date">{step.date}</div>
                        <div className="modal-timeline-status">{step.status}</div>
                        <div className="modal-timeline-location">📍 {step.location}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel


