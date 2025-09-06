import { authAPI } from './api.js';

const SESSION_KEY = 'hc_session';
const TOKEN_KEY = 'access_token';

// Signup function - now uses backend API
export async function signup({ email, display_name, password, confirm_password }) {
  try {
    const result = await authAPI.register({
      email,
      display_name,
      password,
      confirm_password
    });

    if (result.success) {
      localStorage.setItem(TOKEN_KEY, result.data.access);
      localStorage.setItem(SESSION_KEY, JSON.stringify({
        email,
        display_name: result.data.user?.display_name || display_name,
        id: result.data.user?.id
      }));
      return { success: true };
    } else {
      return { success: false, error: result.error };
    }
  } catch (error) {
    return { success: false, error: 'Network error. Please try again.' };
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
        username: result.data.user?.username || email.split('@')[0],
        display_name: result.data.user?.display_name,
        id: result.data.user?.id
      }));
      return { success: true };
    } else {
      return { success: false, error: result.error };
    }
  } catch (error) {
    return { success: false, error: 'Network error. Please try again.' };
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
