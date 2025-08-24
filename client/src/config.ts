// Frontend configuration using environment variables
export const config = {
  // API base URL - defaults to empty string for same-origin requests in development
  // In production, set VITE_API_URL to your backend domain
  apiBaseUrl: import.meta.env.VITE_API_URL || '',
  
  // Development mode detection
  isDevelopment: import.meta.env.DEV,
  
  // Production mode detection  
  isProduction: import.meta.env.PROD,
  
  // Environment mode
  mode: import.meta.env.MODE,
};

// Helper function to build API URLs
export function getApiUrl(path: string): string {
  if (path.startsWith('/')) {
    return `${config.apiBaseUrl}${path}`;
  }
  return path;
}