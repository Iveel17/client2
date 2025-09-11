// services/pictureService.js
import apiService from "./apiService";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

class PictureService {
  constructor(baseURL = `${API_BASE}/api/pictures`) {
    this.baseURL = baseURL;
  }

  async uploadPicture(formData) {
    return apiService.post(`${this.baseURL}/upload`, formData, {
      withCredentials: true,
    });
  }

  async getPictures() {
    return apiService.get(`${this.baseURL}`);
  }

  // Later you could add more endpoints:
  // async deletePicture(id) { return apiService.delete(`${this.baseURL}/${id}`); }
  // async updatePicture(id, data) { return apiService.patch(`${this.baseURL}/${id}`, data); }
}

export default new PictureService();
