import apiService from "./apiService";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

class LiveLessonCardService {
  constructor(baseURL = `${API_BASE}/api/live-lesson-cards`) {
    this.baseURL = baseURL;
  }

  async createLiveLessonCard(formData) {
    return apiService.post(`${this.baseURL}/create`, formData, {
      withCredentials: true,
    });
  }
}

export default new LiveLessonCardService();