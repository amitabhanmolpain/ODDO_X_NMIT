import { authAPI } from './api.js';

const SESSION_KEY = 'hc_session';
const TOKEN_KEY = 'access_token';

// Signup function - now uses backend API
export async function signup({ email, password, username }) {
  try {
    const result = await authAPI.register({ 
      email, 
      password, 
      display_name: username || email.split('@')[0] // Use email prefix as display_name if not provided
    });
    
    if (result.success) {
      // Store the access token
      localStorage.setItem(TOKEN_KEY, result.data.access);
      localStorage.setItem(SESSION_KEY, JSON.stringify({ email, username: result.data.user?.username || username }));
      return { ok: true };
    } else {
      return { ok: false, error: result.error };
    }
  } catch (error) {
    return { ok: false, error: 'Network error. Please try again.' };
  }
}

// Login function - now uses backend API
export async function login({ email, password }) {
  try {
    const result = await authAPI.login({ email, password });
    
    if (result.success) {
      // Store the access token
      localStorage.setItem(TOKEN_KEY, result.data.access);
      localStorage.setItem(SESSION_KEY, JSON.stringify({ 
        email, 
        username: result.data.user?.username || email.split('@')[0] 
      }));
      return { ok: true };
    } else {
      return { ok: false, error: result.error };
    }
  } catch (error) {
    return { ok: false, error: 'Network error. Please try again.' };
  }
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(TOKEN_KEY);
}

export function currentUser() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    const token = localStorage.getItem(TOKEN_KEY);
    
    if (!raw || !token) return null;
    
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

// Check if user is authenticated
export function isAuthenticated() {
  return !!localStorage.getItem(TOKEN_KEY);
}
