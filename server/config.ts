// Server configuration for Supabase and database connections
export const config = {
  supabase: {
    url: process.env.SUPABASE_URL!,
    anonKey: process.env.SUPABASE_ANON_KEY!,
  },
  postgres: {
    url: process.env.DATABASE_URL!,
  },
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
} as const;

// Validation
if (!config.postgres.url || !config.supabase.url || !config.supabase.anonKey) {
  throw new Error("Missing required environment variables: DATABASE_URL, SUPABASE_URL, SUPABASE_ANON_KEY");
}