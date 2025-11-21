import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'StoreElcto_db',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}

const pool = mysql.createPool(dbConfig)

export const query = async (sql, params) => {
  try {
    const [results] = await pool.execute(sql, params)
    return results
  } catch (error) {
    console.error('Database query error:', error)
    throw error
  }
}

export const getConnection = async () => {
  try {
    const connection = await pool.getConnection()
    return connection
  } catch (error) {
    console.error('Database connection error:', error)
    throw error
  }
}

export default pool






