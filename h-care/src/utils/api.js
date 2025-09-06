// API configuration and utilities
const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Helper function to get auth headers
export function getAuthHeaders() {
  const token = localStorage.getItem('access_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

// Generic API request handler
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
      ...options.headers,
    },
    ...options,
  };

  console.log('Making API request:', url, config); // Debug log

  try {
    const response = await fetch(url, config);
    
    let data;
    try {
      data = await response.json();
    } catch (e) {
      data = { message: 'Invalid response format' };
    }
    
    console.log('API response:', response.status, data); // Debug log
    
    if (!response.ok) {
      const errorMessage = data.detail || data.message || data.error || `HTTP ${response.status}`;
      throw new Error(errorMessage);
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('API Error:', error);
    return { success: false, error: error.message };
  }
}

// Auth API calls
export const authAPI = {
  async register(userData) {
    return apiRequest('/users/signup/', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  async login(credentials) {
    return apiRequest('/users/login/', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  async getProfile() {
    return apiRequest('/users/profile/');
  },
};

// Products API calls
export const productsAPI = {
  async getAll() {
    return apiRequest('/products/');
  },

  async getById(id) {
    return apiRequest(`/products/${id}/`);
  },

  async search(query) {
    return apiRequest(`/products/search/?q=${encodeURIComponent(query)}`);
  },

  async create(productData) {
    return apiRequest('/products/', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },
};

// Orders API calls
export const ordersAPI = {
  async getCart() {
    return apiRequest('/orders/cart/');
  },

  async addToCart(productData) {
    return apiRequest('/orders/cart/', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  async checkout(orderData) {
    return apiRequest('/orders/checkout/', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  async getHistory() {
    return apiRequest('/orders/history/');
  },
};

export default {
  authAPI,
  productsAPI,
  ordersAPI,
};
