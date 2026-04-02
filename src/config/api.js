// ============================================================
// FarmBazaar API Configuration
// Centralized API URL and endpoint management for React frontend
// ============================================================

const API_CONFIG = {
  // Production API URL (update when deploying)
  PRODUCTION_URL: "https://agrisync-f1ut.onrender.com",
  
  // Development API URL (XAMPP PHP backend)
  DEVELOPMENT_URL: "http://localhost/farmbazaar-api/api",

  // AI/ML Backend (Python — existing)
  ML_PRODUCTION_URL: "https://agrisync-f1ut.onrender.com",
  ML_DEVELOPMENT_URL: "http://localhost:8000",
  
  // Get the PHP backend API URL
  getApiUrl: () => {
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      return API_CONFIG.PRODUCTION_URL;
    }
    return API_CONFIG.DEVELOPMENT_URL;
  },

  // Get the ML backend URL (for disease detection, soil prediction, etc.)
  getMlUrl: () => {
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      return API_CONFIG.ML_PRODUCTION_URL;
    }
    return API_CONFIG.ML_DEVELOPMENT_URL;
  }
};

// Base API URL for PHP backend
export const API_URL = API_CONFIG.getApiUrl();
export const ML_URL = API_CONFIG.getMlUrl();

// ── Auth Endpoints ──────────────────────────────────────────
export const AUTH_ENDPOINTS = {
  REGISTER:        `${API_URL}/auth/register`,
  LOGIN:           `${API_URL}/auth/login`,
  LOGOUT:          `${API_URL}/auth/logout`,
  ME:              `${API_URL}/auth/me`,
  FORGOT_PASSWORD: `${API_URL}/auth/forgot-password`,
  RESET_PASSWORD:  `${API_URL}/auth/reset-password`,
};

// ── Product Endpoints ───────────────────────────────────────
export const PRODUCT_ENDPOINTS = {
  LIST:       `${API_URL}/products`,
  CATEGORIES: `${API_URL}/products/categories`,
  DETAIL:     (id) => `${API_URL}/products/${id}`,
  CREATE:     `${API_URL}/products`,
  UPDATE:     (id) => `${API_URL}/products/${id}`,
  DELETE:     (id) => `${API_URL}/products/${id}`,
  IMAGES:     (id) => `${API_URL}/products/${id}/images`,
};

// ── Bid Endpoints ───────────────────────────────────────────
export const BID_ENDPOINTS = {
  PLACE:   (productId) => `${API_URL}/products/${productId}/bids`,
  HISTORY: (productId) => `${API_URL}/products/${productId}/bids`,
  MY_BIDS: `${API_URL}/bids/my`,
};

// ── User Endpoints ──────────────────────────────────────────
export const USER_ENDPOINTS = {
  LIST:     `${API_URL}/users`,
  PROFILE:  (id) => `${API_URL}/users/${id}`,
  UPDATE:   (id) => `${API_URL}/users/${id}`,
  PASSWORD: (id) => `${API_URL}/users/${id}/password`,
  AVATAR:   (id) => `${API_URL}/users/${id}/avatar`,
};

// ── Transaction Endpoints ───────────────────────────────────
export const TRANSACTION_ENDPOINTS = {
  LIST:   `${API_URL}/transactions`,
  DETAIL: (id) => `${API_URL}/transactions/${id}`,
};

// ── SSE Endpoints ───────────────────────────────────────────
export const SSE_ENDPOINTS = {
  BID_STREAM: (productId) => `${API_URL}/sse/bids/${productId}`,
};

// ── ML/AI Endpoints (existing Python backend) ───────────────
export const ENDPOINTS = {
  PREDICT_DISEASE:    `${ML_URL}/predict`,
  PREDICT_SOIL:       `${ML_URL}/predict-soil`,
  MARKET_PREDICTIONS: `${ML_URL}/market-predictions`,
  HEALTH_CHECK:       `${ML_URL}/health`,
  DETAILED_HEALTH:    `${ML_URL}/healthz`,
};

// ── Health Check ────────────────────────────────────────────
export const HEALTH_ENDPOINT = `${API_URL}/health`;

// ── Auth Token Helpers ──────────────────────────────────────
export const AuthToken = {
  get: () => localStorage.getItem('auth_token'),
  set: (token) => localStorage.setItem('auth_token', token),
  remove: () => localStorage.removeItem('auth_token'),
  exists: () => !!localStorage.getItem('auth_token'),
  
  // Get Authorization header object
  getHeader: () => {
    const token = localStorage.getItem('auth_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
};

// ── User Data Helpers ───────────────────────────────────────
export const AuthUser = {
  get: () => {
    const data = localStorage.getItem('auth_user');
    return data ? JSON.parse(data) : null;
  },
  set: (user) => localStorage.setItem('auth_user', JSON.stringify(user)),
  remove: () => localStorage.removeItem('auth_user'),
  exists: () => !!localStorage.getItem('auth_user'),
  isAdmin: () => {
    const user = AuthUser.get();
    return user && user.role === 'admin';
  },
};

export default API_CONFIG;
