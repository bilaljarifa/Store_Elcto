import express from 'express'
import { query } from '../database.js'

const router = express.Router()

// Get all products
router.get('/', async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, rating, inStock } = req.query
    
    let sql = `
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE 1=1
    `
    const params = []
    
    if (category) {
      sql += ' AND c.slug = ?'
      params.push(category)
    }
    
    if (search) {
      sql += ' AND (p.name LIKE ? OR p.description LIKE ?)'
      params.push(`%${search}%`, `%${search}%`)
    }
    
    if (minPrice) {
      sql += ' AND p.price >= ?'
      params.push(minPrice)
    }
    
    if (maxPrice) {
      sql += ' AND p.price <= ?'
      params.push(maxPrice)
    }
    
    if (rating) {
      sql += ' AND p.rating >= ?'
      params.push(rating)
    }
    
    if (inStock === 'true') {
      sql += ' AND p.in_stock = 1'
    }
    
    sql += ' ORDER BY p.created_at DESC'
    
    const products = await query(sql, params)
    
    // Parse JSON specs
    const formattedProducts = products.map(product => ({
      ...product,
      specs: product.specs ? JSON.parse(product.specs) : null,
      originalPrice: product.original_price,
      inStock: Boolean(product.in_stock),
      shippingOrigin: product.shipping_origin,
      shippingTime: product.shipping_time
    }))
    
    res.json(formattedProducts)
  } catch (error) {
    console.error('Error fetching products:', error)
    res.status(500).json({ error: 'Failed to fetch products' })
  }
})

// Get product by slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params
    
    const sql = `
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.slug = ?
    `
    
    const products = await query(sql, [slug])
    
    if (products.length === 0) {
      return res.status(404).json({ error: 'Product not found' })
    }
    
    const product = products[0]
    const formattedProduct = {
      ...product,
      specs: product.specs ? JSON.parse(product.specs) : null,
      originalPrice: product.original_price,
      inStock: Boolean(product.in_stock),
      shippingOrigin: product.shipping_origin,
      shippingTime: product.shipping_time,
      category: product.category_name
    }
    
    res.json(formattedProduct)
  } catch (error) {
    console.error('Error fetching product:', error)
    res.status(500).json({ error: 'Failed to fetch product' })
  }
})

// Get categories
router.get('/categories/all', async (req, res) => {
  try {
    const categories = await query('SELECT * FROM categories ORDER BY name')
    res.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    res.status(500).json({ error: 'Failed to fetch categories' })
  }
})

export default router


