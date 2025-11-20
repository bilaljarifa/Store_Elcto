# Store Elcto Backend API

Backend server for Store Elcto e-commerce platform using Node.js, Express, and MySQL.

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Database

Create a `.env` file in the `server` directory:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=StoreElcto_db
DB_PORT=3306
PORT=3001
```

### 3. Create Database Schema

1. Open phpMyAdmin
2. Select your MySQL server
3. Import the `database.sql` file or run it in SQL tab:
   - The script will create the database `StoreElcto_db` if it doesn't exist
   - It will create all necessary tables
   - It will insert sample categories

### 4. Seed Database with Products

After creating the schema, run the seed script to populate products:

```bash
npm run seed
```

Or manually:
```bash
node seed.js
```

### 5. Start the Server

```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:3001`

## API Endpoints

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:slug` - Get product by slug
- `GET /api/products/categories/all` - Get all categories

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders (admin)
- `GET /api/orders/:orderId` - Get order by ID
- `PUT /api/orders/:orderId/status` - Update order status

### Comments
- `GET /api/comments/product/:productId` - Get comments for a product
- `POST /api/comments` - Create new comment

## Frontend Configuration

Update your frontend `.env` file (or `vite.config.js`) to point to the API:

```env
VITE_API_URL=http://localhost:3001/api
```

## Database Schema

The database includes the following tables:
- `users` - User accounts
- `categories` - Product categories
- `products` - Product information
- `orders` - Order records
- `order_items` - Order line items
- `order_tracking` - Order tracking history
- `comments` - Product reviews/comments
- `reward_history` - Reward points history

## Troubleshooting

1. **Connection Error**: Make sure MySQL is running and credentials in `.env` are correct
2. **Database Not Found**: Run the `database.sql` script in phpMyAdmin first
3. **Port Already in Use**: Change `PORT` in `.env` to a different port
4. **CORS Issues**: The server includes CORS middleware, but check if your frontend URL is allowed


