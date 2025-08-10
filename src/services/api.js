const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "API request failed");
  }

  return res.json();
}
