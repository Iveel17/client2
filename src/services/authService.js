const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

class AuthService {
  constructor(baseURL = `${API_BASE}/api/auth`) {
    this.baseURL = baseURL;
  }

  async signup(userData) {
    try {
      const response = await fetch(`${this.baseURL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for cookies
        body: JSON.stringify(userData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        // Return the errors object for form handling
        return { success: false, errors: data.errors || { general: data.message || 'Signup failed' } };
      }
      
      return { success: true, user: data.user };
    } catch (error) {
      console.error("[AuthService] Signup error:", error);
      return { success: false, errors: { general: 'Network error. Please try again.' } };
    }
  }

  async login(credentials) {
    try {
      const response = await fetch(`${this.baseURL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials)
      });
      
      const data = await response.json();
      console.log('Login response:', data); // Debug the response
      
      if (!response.ok) {
        return { success: false, errors: data.errors || { general: data.message || 'Login failed' } };
      }
      
      return { success: true, user: data.user };
    } catch (error) {
      console.error("[AuthService] Login error:", error);
      return { success: false, errors: { general: 'Network error. Please try again.' } };
    }
  }

  async logout() {
    try {
      const response = await fetch(`${this.baseURL}/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      
      const data = await response.json();
      return { success: response.ok, data};
    } catch (error) {
      console.error("[AuthService] Logout error:", error);
      return { success: false, error: 'Network error during logout' };
    }
  }
  async getUserProfile() {
      try {
        const response = await fetch(`${this.baseURL}/verify`, {
          method: 'GET',
          credentials: 'include'
        });
        
        const data = await response.json();
        
        return data.success ? { success: true, user: data.user } : { success: false, user: null };
      } catch (error) {
        console.error("[AuthService] Get current user error:", error);
        return { success: false, user: null };
      }
    }
}
export default new AuthService();