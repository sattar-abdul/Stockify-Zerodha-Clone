// Simple config helper used across frontend
export const API_BASE =
  process.env.REACT_APP_API_BASE ||
  (process.env.NODE_ENV === 'production'
    ? 'https://stockify-backend-rcs2.onrender.com'
    : 'http://localhost:5000');

export const DASHBOARD_URL =
  process.env.REACT_APP_DASHBOARD_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://stockify-dashboard.onrender.com'
    : 'http://localhost:3001');
