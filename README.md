# Store Electronique - Electronic Store

A modern, responsive electronic store built with React and Vite.

## Features

- 🛒 Beautiful product catalog with grid layout
- 🔍 **Search functionality** - Search products by name, description, or category
- 🏷️ **Category filters** - Filter products by category (Smartphones, Laptops, Audio, etc.)
- 📄 **Product detail pages** - Two-column layout with detailed specifications
- 🎨 **Modern UI** with defined color palette system
- 📱 Fully responsive (mobile, tablet, desktop)
- 🛍️ Shopping cart functionality with quantity management
- 💳 **Checkout page** - Complete order form with delivery and payment options
- ⭐ Product ratings and discount badges
- ⚡ Fast development with Vite
- 🎯 Clean component architecture with React Router

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
store_electronique/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Store header with search and cart
│   │   ├── ProductList.jsx     # Product grid container
│   │   ├── ProductCard.jsx     # Individual product card
│   │   ├── Cart.jsx            # Shopping cart sidebar
│   │   └── CategoryFilter.jsx  # Category filter buttons
│   ├── pages/
│   │   ├── Home.jsx            # Home page with product listing
│   │   ├── ProductDetail.jsx  # Product detail page with specs
│   │   └── Checkout.jsx        # Checkout page
│   ├── data/
│   │   └── products.js         # Product data with specifications
│   ├── styles/
│   │   └── colors.css          # Color palette system (CSS variables)
│   ├── App.jsx                 # Main app with routing
│   ├── App.css                 # App styles
│   ├── main.jsx                # Application entry point
│   └── index.css               # Global styles
├── index.html                  # HTML template
├── package.json                # Dependencies and scripts
└── vite.config.js              # Vite configuration
```

## Technologies Used

- React 18
- React Router DOM 6
- Vite
- CSS3 with CSS Variables (custom color system)

## Features in Detail

### Product Catalog
- Displays products in a responsive grid
- Product cards with images, descriptions, and prices
- Category badges and discount indicators
- Product ratings display
- Hover effects and animations
- Click to view detailed product page

### Search & Filtering
- Real-time search across product names, descriptions, and categories
- Category filter buttons (Tous, Smartphones, Laptops, Audio, etc.)
- Combined search and filter functionality

### Product Detail Pages
- Two-column layout (image + details)
- Detailed product specifications
- Original price and discount display
- Stock status indicator
- Add to cart and wishlist buttons
- Star ratings and reviews count

### Shopping Cart
- Sidebar cart with slide-in animation
- Add/remove items
- Quantity management (+/- buttons)
- Real-time total calculation
- Empty cart state
- Direct link to checkout

### Checkout Process
- Complete order form with validation
- Delivery information fields
- Payment method selection
- Order summary with items
- Order confirmation page

## Customization

### Adding Products

Edit `src/data/products.js` to add or modify products:

```javascript
{
  id: 13,
  name: 'Product Name',
  description: 'Product description',
  price: 99.99,
  originalPrice: 129.99, // Optional: for discount display
  image: 'image-url',
  category: 'Category',
  specs: {
    processor: 'Spec value',
    storage: 'Spec value',
    // Add more specs as needed
  },
  inStock: true,
  rating: 4.5
}
```

### Color System

The app uses a centralized color system defined in `src/styles/colors.css`:
- Primary colors: Purple/blue gradient (`#667eea` to `#764ba2`)
- Status colors: Success, error, warning, info
- Neutral colors: Text, backgrounds, borders
- All colors are available as CSS variables for easy customization

### Styling

All components have their own CSS files. The color system uses CSS variables for consistent theming across the entire application.

## License

MIT

