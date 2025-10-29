import apiService from "./apiService";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

class ProductCardService {
  constructor(baseURL = `${API_BASE}/api/product-cards`) {
    this.baseURL = baseURL;
  }

  async createProductCard(formData) {
    return apiService.post(`${this.baseURL}/create`, formData, {
      withCredentials: true,
    });
  }
}

export default new ProductCardService();