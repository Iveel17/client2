const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

// Login user
export async function loginUser(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return await res.json();
}

// Get profile (requires token)
export async function getProfile() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to get profile");
  }

  return await res.json();
}
