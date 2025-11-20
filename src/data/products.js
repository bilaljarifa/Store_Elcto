export const products = [
  {
    id: 1,
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
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24 Ultra',
    slug: 'samsung-galaxy-s24-ultra',
    description: 'Écran AMOLED 6.8", S Pen inclus, 200MP de résolution',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400',
    category: 'Smartphones',
    specs: {
      processor: 'Snapdragon 8 Gen 3',
      storage: '512GB',
      ram: '12GB',
      display: '6.8" Dynamic AMOLED 2X',
      camera: '200MP Main, 50MP Periscope, 12MP Ultra Wide',
      battery: '5000mAh',
      os: 'Android 14'
    },
    inStock: true,
    rating: 4.7,
    shippingOrigin: 'Corée du Sud',
    shippingTime: '12-18 jours'
  },
  {
    id: 3,
    name: 'MacBook Pro 16"',
    slug: 'macbook-pro-16',
    description: 'M3 Max, 32GB RAM, 1TB SSD - Parfait pour les professionnels',
    price: 3499.99,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400',
    category: 'Laptops',
    specs: {
      processor: 'Apple M3 Max (16-core CPU, 40-core GPU)',
      storage: '1TB SSD',
      ram: '32GB Unified Memory',
      display: '16.2" Liquid Retina XDR',
      graphics: '40-core GPU',
      battery: 'Jusqu\'à 22h',
      os: 'macOS Sonoma',
      ports: '3x Thunderbolt 4, HDMI, SDXC, MagSafe 3'
    },
    inStock: true,
    rating: 4.9,
    shippingOrigin: 'USA',
    shippingTime: '15-20 jours'
  },
  {
    id: 4,
    name: 'Dell XPS 15',
    slug: 'dell-xps-15',
    description: 'Intel Core i9, 32GB RAM, écran OLED 4K',
    price: 2499.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
    category: 'Laptops',
    specs: {
      processor: 'Intel Core i9-13900H',
      storage: '1TB NVMe SSD',
      ram: '32GB DDR5',
      display: '15.6" OLED 4K UHD+',
      graphics: 'NVIDIA RTX 4070',
      battery: '86Wh',
      os: 'Windows 11 Pro'
    },
    inStock: true,
    rating: 4.6,
    shippingOrigin: 'USA',
    shippingTime: '12-18 jours'
  },
  {
    id: 5,
    name: 'Sony WH-1000XM5',
    slug: 'sony-wh-1000xm5',
    description: 'Casque sans fil avec réduction de bruit active',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    category: 'Audio',
    specs: {
      type: 'Over-ear sans fil',
      battery: 'Jusqu\'à 30h',
      noiseCancelling: 'Réduction de bruit active',
      connectivity: 'Bluetooth 5.2, NFC',
      weight: '250g'
    },
    inStock: true,
    rating: 4.8,
    shippingOrigin: 'Japon',
    shippingTime: '10-15 jours'
  },
  {
    id: 6,
    name: 'AirPods Pro 2',
    slug: 'airpods-pro-2',
    description: 'Écouteurs sans fil avec réduction de bruit active',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400',
    category: 'Audio',
    specs: {
      type: 'In-ear sans fil',
      battery: 'Jusqu\'à 6h (30h avec étui)',
      noiseCancelling: 'Réduction de bruit active',
      connectivity: 'Bluetooth 5.3',
      chip: 'H2'
    },
    inStock: true,
    rating: 4.7,
    shippingOrigin: 'Chine',
    shippingTime: '10-15 jours'
  },
  {
    id: 7,
    name: 'iPad Pro 12.9"',
    slug: 'ipad-pro-12-9',
    description: 'M2, 256GB, écran Liquid Retina XDR',
    price: 1099.99,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
    category: 'Tablets',
    specs: {
      processor: 'Apple M2',
      storage: '256GB',
      ram: '8GB',
      display: '12.9" Liquid Retina XDR',
      camera: '12MP Wide, 10MP Ultra Wide',
      battery: 'Jusqu\'à 10h',
      os: 'iPadOS 17'
    },
    inStock: true,
    rating: 4.8,
    shippingOrigin: 'USA',
    shippingTime: '12-18 jours'
  },
  {
    id: 8,
    name: 'Samsung Galaxy Tab S9',
    slug: 'samsung-galaxy-tab-s9',
    description: 'Écran 12.4", S Pen inclus, 256GB',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
    category: 'Tablets',
    specs: {
      processor: 'Snapdragon 8 Gen 2',
      storage: '256GB',
      ram: '12GB',
      display: '12.4" Dynamic AMOLED 2X',
      camera: '13MP + 8MP',
      battery: '11200mAh',
      os: 'Android 13'
    },
    inStock: true,
    rating: 4.6,
    shippingOrigin: 'Corée du Sud',
    shippingTime: '12-18 jours'
  },
  {
    id: 9,
    name: 'Nintendo Switch OLED',
    slug: 'nintendo-switch-oled',
    description: 'Console portable avec écran OLED 7 pouces',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400',
    category: 'Gaming',
    specs: {
      display: '7" OLED',
      storage: '64GB (extensible)',
      battery: 'Jusqu\'à 9h',
      resolution: '1280x720',
      connectivity: 'Wi-Fi, Bluetooth'
    },
    inStock: true,
    rating: 4.5,
    shippingOrigin: 'Japon',
    shippingTime: '15-20 jours'
  },
  {
    id: 10,
    name: 'PlayStation 5',
    slug: 'playstation-5',
    description: 'Console de jeu nouvelle génération avec SSD ultra-rapide',
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400',
    category: 'Gaming',
    specs: {
      processor: 'AMD Zen 2 (8 cores)',
      storage: '825GB SSD',
      ram: '16GB GDDR6',
      graphics: 'AMD RDNA 2 (10.28 TFLOPS)',
      resolution: 'Jusqu\'à 4K 120fps',
      rayTracing: 'Oui'
    },
    inStock: true,
    rating: 4.9,
    shippingOrigin: 'Japon',
    shippingTime: '12-18 jours'
  },
  {
    id: 11,
    name: 'Apple Watch Series 9',
    slug: 'apple-watch-series-9',
    description: 'Montre connectée avec puce S9, GPS, écran Always-On',
    price: 429.99,
    image: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400',
    category: 'Wearables',
    specs: {
      processor: 'S9 SiP',
      display: 'Always-On Retina',
      battery: 'Jusqu\'à 18h',
      connectivity: 'GPS, Wi-Fi, Bluetooth 5.3',
      waterResistance: 'WR50',
      size: '45mm ou 41mm'
    },
    inStock: true,
    rating: 4.7,
    shippingOrigin: 'Chine',
    shippingTime: '10-15 jours'
  },
  {
    id: 12,
    name: 'Samsung Galaxy Watch 6',
    slug: 'samsung-galaxy-watch-6',
    description: 'Montre connectée avec écran AMOLED, suivi santé avancé',
    price: 329.99,
    image: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400',
    category: 'Wearables',
    specs: {
      processor: 'Exynos W930',
      display: 'AMOLED',
      battery: 'Jusqu\'à 40h',
      connectivity: 'GPS, Wi-Fi, Bluetooth 5.3',
      waterResistance: '5ATM + IP68',
      size: '44mm ou 40mm'
    },
    inStock: true,
    rating: 4.6,
    shippingOrigin: 'Corée du Sud',
    shippingTime: '10-15 jours'
  }
]

