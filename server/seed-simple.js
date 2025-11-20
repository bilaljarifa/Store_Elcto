import { query } from './database.js'

// Sample products data (you can import from your products.js file manually)
const products = [
  {
    name: 'iPhone 15 Pro',
    slug: 'iphone-15-pro',
    description: 'Dernier modèle iPhone avec puce A17 Pro et caméra professionnelle',
    price: 1199.99,
    originalPrice: 1299.99,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
    category: 'Smartphones',
    specs: {
      processor: 'A17 Pro',
      storage: '256GB',
      ram: '8GB',
      display: '6.1" Super Retina XDR',
      camera: '48MP Main, 12MP Ultra Wide, 12MP Telephoto',
      battery: 'Jusqu\'à 23h vidéo',
      os: 'iOS 17'
    },
    inStock: true,
    rating: 4.8,
    shippingOrigin: 'Chine',
    shippingTime: '10-15 jours'
  }
  // Add more products here or import from your products.js file
]

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
    for (const product of products) {
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

    console.log(`✅ Seeded ${products.length} products successfully!`)
    console.log('💡 Tip: You can manually copy products from src/data/products.js to this file')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()


