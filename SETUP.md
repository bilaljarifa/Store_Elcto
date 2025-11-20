# Store Elcto - Database Setup Guide

## Quick Setup Steps

### 1. Create Database in phpMyAdmin

1. Open phpMyAdmin (usually at `http://localhost/phpmyadmin`)
2. Click on "SQL" tab
3. Run this command or import `server/database.sql`:
   ```sql
   CREATE DATABASE IF NOT EXISTS StoreElcto_db;
   ```
4. Select the `StoreElcto_db` database
5. Import the `server/database.sql` file or copy-paste its contents into the SQL tab

### 2. Configure Backend

1. Navigate to the `server` folder:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file in the `server` folder:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=StoreElcto_db
   DB_PORT=3306
   PORT=3001
   ```
   
   **Important**: Replace `your_mysql_password` with your actual MySQL password (leave empty if no password)

### 3. Seed Database with Products

After creating the schema, seed the database:

```bash
cd server
npm run seed
```

Or manually add products through phpMyAdmin or the API.

### 4. Start Backend Server

```bash
cd server
npm start
```

The server will run on `http://localhost:3001`

### 5. Configure Frontend

Create a `.env` file in the root directory (same level as `package.json`):

```env
VITE_API_URL=http://localhost:3001/api
```

### 6. Start Frontend

In a new terminal:

```bash
npm run dev
```

## Database Connection Details

- **Host**: localhost
- **Port**: 3306
- **Database**: StoreElcto_db
- **User**: root (or your MySQL username)
- **Password**: (your MySQL password, if any)

## Troubleshooting

### Connection Refused
- Make sure MySQL/MariaDB is running
- Check if port 3306 is correct
- Verify database name is exactly `StoreElcto_db`

### Access Denied
- Check your MySQL username and password in `.env`
- Make sure the user has privileges on `StoreElcto_db`

### Database Not Found
- Run the `database.sql` script in phpMyAdmin first
- Make sure you've selected the correct database

### Products Not Showing
- Run the seed script: `npm run seed` in the server folder
- Or manually insert products through phpMyAdmin

## API Endpoints

Once running, test the API:

- Health check: `http://localhost:3001/api/health`
- Products: `http://localhost:3001/api/products`
- Categories: `http://localhost:3001/api/products/categories/all`

## Next Steps

1. Update frontend components to use the API service (`src/services/api.js`)
2. Replace localStorage calls with API calls
3. Test all features with the database


