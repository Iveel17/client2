import apiService from "./apiService";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

class AuthService {
  constructor(baseURL = `${API_BASE}/api`) {
    this.baseURL = baseURL;
  }
  async verify() {
    return apiService.get(`${this.baseURL}/auth/verify`);
  }

  async signup(userData) {
    return apiService.post(`${this.baseURL}/auth/signup`, userData);
  }

  async login(credentials) {
    return apiService.post(`${this.baseURL}/auth/login`, credentials);
  }

  async logout() {
    return apiService.post(`${this.baseURL}/auth/logout`);
  }

  async getUserProfile() {
    return apiService.get(`${this.baseURL}/user/profile`);
  }
}

export default new AuthService();
