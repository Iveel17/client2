// services/courseService.js
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export const courseService = {
  async create(formData) {
    const response = await fetch(`${API_BASE}/api/course-cards/create`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
    
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  },
  
  // Easy to add more later:
  // async getById(id) { ... },
  // async update(id, data) { ... },
  // async delete(id) { ... },
};