import express from 'express'
import { query } from '../database.js'

const router = express.Router()

// Get comments for a product
router.get('/product/:productId', async (req, res) => {
  try {
    const { productId } = req.params
    
    const sql = `
      SELECT c.*, u.username
      FROM comments c
      LEFT JOIN users u ON c.user_id = u.id
      WHERE c.product_id = ?
      ORDER BY c.created_at DESC
    `
    
    const comments = await query(sql, [productId])
    
    const formattedComments = comments.map(comment => ({
      id: comment.id,
      author: comment.author,
      rating: comment.rating,
      date: comment.created_at.toISOString().split('T')[0],
      text: comment.text
    }))
    
    res.json(formattedComments)
  } catch (error) {
    console.error('Error fetching comments:', error)
    res.status(500).json({ error: 'Failed to fetch comments' })
  }
})

// Create comment
router.post('/', async (req, res) => {
  try {
    const { productId, userId, author, rating, text } = req.body
    
    const sql = `
      INSERT INTO comments (product_id, user_id, author, rating, text)
      VALUES (?, ?, ?, ?, ?)
    `
    
    const result = await query(sql, [productId, userId || null, author, rating, text])
    
    res.json({ success: true, id: result.insertId })
  } catch (error) {
    console.error('Error creating comment:', error)
    res.status(500).json({ error: 'Failed to create comment' })
  }
})

export default router


