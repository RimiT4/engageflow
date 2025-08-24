-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
  username text NOT NULL UNIQUE,
  password text NOT NULL
);

-- Create claims table
CREATE TABLE IF NOT EXISTS claims (
  id varchar PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  order_id text NOT NULL,
  roblox_username text NOT NULL,
  roblox_user_id bigint NOT NULL,
  avatar_url text,
  created_at timestamp DEFAULT NOW() NOT NULL
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_claims_email ON claims(email);
CREATE INDEX IF NOT EXISTS idx_claims_roblox_username ON claims(roblox_username);