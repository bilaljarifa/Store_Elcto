const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

export const api = {
  // Products
  async getProducts(filters = {}) {
    const params = new URLSearchParams()
    Object.keys(filters).forEach(key => {
      if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
        params.append(key, filters[key])
      }
    })
    const url = `${API_BASE_URL}/products${params.toString() ? '?' + params.toString() : ''}`
    const response = await fetch(url)
    if (!response.ok) throw new Error('Failed to fetch products')
    return response.json()
  },

  async getProductBySlug(slug) {
    const response = await fetch(`${API_BASE_URL}/products/${slug}`)
    if (!response.ok) throw new Error('Failed to fetch product')
    return response.json()
  },

  async getCategories() {
    const response = await fetch(`${API_BASE_URL}/products/categories/all`)
    if (!response.ok) throw new Error('Failed to fetch categories')
    return response.json()
  },

  // Orders
  async createOrder(orderData) {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    })
    if (!response.ok) throw new Error('Failed to create order')
    return response.json()
  },

  async getOrder(orderId) {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`)
    if (!response.ok) throw new Error('Failed to fetch order')
    return response.json()
  },

  async getAllOrders() {
    const response = await fetch(`${API_BASE_URL}/orders`)
    if (!response.ok) throw new Error('Failed to fetch orders')
    return response.json()
  },

  async updateOrderStatus(orderId, status, location) {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, location })
    })
    if (!response.ok) throw new Error('Failed to update order status')
    return response.json()
  },

  // Comments
  async getComments(productId) {
    const response = await fetch(`${API_BASE_URL}/comments/product/${productId}`)
    if (!response.ok) throw new Error('Failed to fetch comments')
    return response.json()
  },

  async createComment(commentData) {
    const response = await fetch(`${API_BASE_URL}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commentData)
    })
    if (!response.ok) throw new Error('Failed to create comment')
    return response.json()
  }
}

export default api


