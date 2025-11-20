import { query } from './database.js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Import products data
const productsData = JSON.parse(
  readFileSync(join(__dirname, '../src/data/products.js'), 'utf-8')
    .replace(/export const products = /, '')
    .replace(/;$/, '')
)

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...')

    // Get categories
    const categories = await query('SELECT * FROM categories')
    const categoryMap = {}
    categories.forEach(cat => {
      categoryMap[cat.name.toLowerCase()] = cat.id
    })

    // Insert products
    for (const product of productsData) {
      const categoryId = categoryMap[product.category.toLowerCase()]
      
      if (!categoryId) {
        console.warn(`Category "${product.category}" not found, skipping product: ${product.name}`)
        continue
      }

      const sql = `
        INSERT INTO products (
          name, slug, description, price, original_price, category_id,
          image, in_stock, rating, shipping_origin, shipping_time, specs
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          name = VALUES(name),
          description = VALUES(description),
          price = VALUES(price),
          original_price = VALUES(original_price),
          image = VALUES(image),
          in_stock = VALUES(in_stock),
          rating = VALUES(rating),
          shipping_origin = VALUES(shipping_origin),
          shipping_time = VALUES(shipping_time),
          specs = VALUES(specs)
      `

      await query(sql, [
        product.name,
        product.slug,
        product.description,
        product.price,
        product.originalPrice || null,
        categoryId,
        product.image,
        product.inStock ? 1 : 0,
        product.rating || 0,
        product.shippingOrigin || null,
        product.shippingTime || null,
        product.specs ? JSON.stringify(product.specs) : null
      ])
    }

    console.log(`✅ Seeded ${productsData.length} products successfully!`)
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()

