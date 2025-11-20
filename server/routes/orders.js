import express from 'express'
import { query } from '../database.js'

const router = express.Router()

// Create new order
router.post('/', async (req, res) => {
  try {
    const { orderId, userId, items, total, shippingAddress } = req.body
    
    // Create order
    const orderSql = `
      INSERT INTO orders (order_id, user_id, total, shipping_address, status)
      VALUES (?, ?, ?, ?, 'Commande confirmée')
    `
    await query(orderSql, [orderId, userId || null, total, shippingAddress])
    
    // Get the inserted order ID
    const [orderResult] = await query('SELECT id FROM orders WHERE order_id = ?', [orderId])
    const orderDbId = orderResult.id
    
    // Create order items
    for (const item of items) {
      const itemSql = `
        INSERT INTO order_items (order_id, product_id, quantity, price, shipping_origin)
        VALUES (?, ?, ?, ?, ?)
      `
      await query(itemSql, [
        orderDbId,
        item.productId,
        item.quantity,
        item.price,
        item.shippingOrigin || null
      ])
    }
    
    // Create initial tracking entry
    const trackingSql = `
      INSERT INTO order_tracking (order_id, status, location, tracking_date)
      VALUES (?, 'Commande confirmée', 'En attente d\'expédition', CURDATE())
    `
    await query(trackingSql, [orderDbId])
    
    res.json({ success: true, orderId })
  } catch (error) {
    console.error('Error creating order:', error)
    res.status(500).json({ error: 'Failed to create order' })
  }
})

// Get order by order ID
router.get('/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params
    
    // Get order
    const orderSql = 'SELECT * FROM orders WHERE order_id = ?'
    const orders = await query(orderSql, [orderId])
    
    if (orders.length === 0) {
      return res.status(404).json({ error: 'Order not found' })
    }
    
    const order = orders[0]
    
    // Get order items
    const itemsSql = `
      SELECT oi.*, p.name, p.image, p.slug
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ?
    `
    const items = await query(itemsSql, [order.id])
    
    // Get tracking
    const trackingSql = `
      SELECT * FROM order_tracking
      WHERE order_id = ?
      ORDER BY tracking_date ASC, created_at ASC
    `
    const tracking = await query(trackingSql, [order.id])
    
    const formattedOrder = {
      id: order.order_id,
      date: order.created_at.toISOString().split('T')[0],
      status: order.status,
      total: parseFloat(order.total),
      shippingAddress: order.shipping_address,
      items: items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: parseFloat(item.price),
        shippingOrigin: item.shipping_origin,
        image: item.image,
        slug: item.slug
      })),
      tracking: tracking.map(t => ({
        date: t.tracking_date.toISOString().split('T')[0],
        status: t.status,
        location: t.location
      }))
    }
    
    res.json(formattedOrder)
  } catch (error) {
    console.error('Error fetching order:', error)
    res.status(500).json({ error: 'Failed to fetch order' })
  }
})

// Get all orders (for admin)
router.get('/', async (req, res) => {
  try {
    const sql = `
      SELECT o.*, u.username, u.email
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
    `
    const orders = await query(sql)
    
    // Get items for each order
    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        const itemsSql = `
          SELECT oi.*, p.name
          FROM order_items oi
          JOIN products p ON oi.product_id = p.id
          WHERE oi.order_id = ?
        `
        const items = await query(itemsSql, [order.id])
        
        return {
          id: order.order_id,
          date: order.created_at.toISOString().split('T')[0],
          status: order.status,
          total: parseFloat(order.total),
          shippingAddress: order.shipping_address,
          items: items.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: parseFloat(item.price)
          }))
        }
      })
    )
    
    res.json(ordersWithItems)
  } catch (error) {
    console.error('Error fetching orders:', error)
    res.status(500).json({ error: 'Failed to fetch orders' })
  }
})

// Update order status
router.put('/:orderId/status', async (req, res) => {
  try {
    const { orderId } = req.params
    const { status, location } = req.body
    
    // Update order status
    const updateSql = 'UPDATE orders SET status = ? WHERE order_id = ?'
    await query(updateSql, [status, orderId])
    
    // Get order DB ID
    const [order] = await query('SELECT id FROM orders WHERE order_id = ?', [orderId])
    
    // Add tracking entry
    const trackingSql = `
      INSERT INTO order_tracking (order_id, status, location, tracking_date)
      VALUES (?, ?, ?, CURDATE())
    `
    await query(trackingSql, [order.id, status, location || ''])
    
    res.json({ success: true })
  } catch (error) {
    console.error('Error updating order status:', error)
    res.status(500).json({ error: 'Failed to update order status' })
  }
})

export default router


