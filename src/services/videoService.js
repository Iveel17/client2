import apiService from "./apiService";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

class VideoService {
  constructor(baseURL = `${API_BASE}/api/videos`) {
    this.baseURL = baseURL;
  }

  async uploadVideo(formData) {
    return apiService.post(`${this.baseURL}/upload`, formData, {
      withCredentials: true,
    });
  }

  async getVideos() {
    return apiService.get(`${this.baseURL}`);
  }

  // Later you could add:
  // async deleteVideo(id) { return apiService.delete(`${this.baseURL}/${id}`); }
  // async updateVideo(id, data) { return apiService.patch(`${this.baseURL}/${id}`, data); }
}

export default new VideoService();
