// Test direct database connection
import 'dotenv/config';
import { Pool } from 'pg';

const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

console.log('Testing connection to:', process.env.DATABASE_URL?.substring(0, 50) + '...');

try {
  const client = await pool.connect();
  console.log('✅ Database connected successfully!');
  
  // Create tables
  await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
      username text NOT NULL UNIQUE,
      password text NOT NULL
    )
  `);
  
  await client.query(`
    CREATE TABLE IF NOT EXISTS claims (
      id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
      email text NOT NULL,
      order_id text NOT NULL,
      roblox_username text NOT NULL,
      roblox_user_id bigint NOT NULL,
      avatar_url text,
      created_at timestamp DEFAULT NOW() NOT NULL
    )
  `);
  
  console.log('✅ Tables created successfully!');
  client.release();
} catch (error) {
  console.error('❌ Database connection failed:', error.message);
}

process.exit(0);