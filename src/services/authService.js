import apiService from "./apiService";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

class AuthService {
  constructor(baseURL = `${API_BASE}/api/auth`) {
    this.baseURL = baseURL;
  }

  async signup(userData) {
    return apiService.post(`${this.baseURL}/signup`, userData);
  }

  async login(credentials) {
    return apiService.post(`${this.baseURL}/login`, credentials);
  }

  async logout() {
    return apiService.post(`${this.baseURL}/logout`);
  }

  async getUserProfile() {
    return apiService.get(`${this.baseURL}/verify`);
  }
}

export default new AuthService();
