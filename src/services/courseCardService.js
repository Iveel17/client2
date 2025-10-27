import apiService from "./apiService";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

class CourseCardService {
  constructor(baseURL = `${API_BASE}/api/course-cards`) {
    this.baseURL = baseURL;
  }

  async createCourseCard(formData) {
    return apiService.post(`${this.baseURL}/create`, formData, {
      withCredentials: true,
    });
  }
}

export default new CourseCardService();
