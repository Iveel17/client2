import apiService from "./apiService";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

class UserService {
  constructor(baseURL = `${API_BASE}/api/user`) {
    this.baseURL = baseURL;
  }

  async updateProfile(userData) {
    return apiService.put(`${this.baseURL}/profile`, userData);
  }

  async uploadProfilePicture(file) {
    const formData = new FormData();
    formData.append('profilePicture', file);
    
    return apiService.post(`${this.baseURL}/profile/picture`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async getUserProfile() {
    return apiService.get(`${this.baseURL}/profile`);
  }

  async deleteAccount() {
    return apiService.delete(`${this.baseURL}/account`);
  }

  async changePassword(passwordData) {
    return apiService.put(`${this.baseURL}/password`, passwordData);
  }
}

export default new UserService();