import { createClient } from '@supabase/supabase-js';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

// Validate environment variables
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}
if (!process.env.SUPABASE_URL) {
  throw new Error("SUPABASE_URL must be set");
}
if (!process.env.SUPABASE_ANON_KEY) {
  throw new Error("SUPABASE_ANON_KEY must be set");
}

console.log("Initializing Supabase connection...");

// Supabase client for additional features if needed
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// PostgreSQL connection pool for Drizzle ORM
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

export const db = drizzle(pool, { schema });
