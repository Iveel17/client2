// src/services/api.js
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('axion_token'); // consistent key
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  // parse safely (handle empty responses)
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (err) {
    data = err;
  }

  if (!res.ok) {
    // If unauthorized, clear local token (so frontend can detect)
    if (res.status === 401) {
      localStorage.removeItem('axion_token');
    }
    const message = (data && (data.error || data.message)) || res.statusText || 'Request failed';
    const error = new Error(message);
    error.status = res.status;
    error.body = data;
    throw error;
  }

  return data;
}