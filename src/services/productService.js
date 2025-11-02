const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export const productService = {
  async create(formData) {
    const response = await fetch(`${API_BASE}/api/product-cards/create`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
    
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  },
};