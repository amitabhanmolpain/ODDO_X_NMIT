const USERS_KEY = 'hc_users';
const SESSION_KEY = 'hc_session';

export function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// NOTE: This is a simple frontend-only demo. Passwords are stored in plaintext in localStorage.
// This is acceptable only for local demo/testing. For production, use a backend and proper hashing.
export function signup({ email, password, name }) {
  const users = loadUsers();
  if (users[email]) {
    return { ok: false, error: 'User already exists' };
  }
  users[email] = { email, name, password };
  saveUsers(users);
  // Set session
  localStorage.setItem(SESSION_KEY, JSON.stringify({ email }));
  return { ok: true };
}

export function login({ email, password }) {
  const users = loadUsers();
  const user = users[email];
  if (!user) return { ok: false, error: 'No such user' };
  const match = user.password === password;
  if (!match) return { ok: false, error: 'Invalid password' };
  localStorage.setItem(SESSION_KEY, JSON.stringify({ email }));
  return { ok: true };
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function currentUser() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const { email } = JSON.parse(raw);
    const users = loadUsers();
    return users[email] || null;
  } catch (e) {
    return null;
  }
}
