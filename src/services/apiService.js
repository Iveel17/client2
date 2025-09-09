// services/apiService.js
class ApiService {
  constructor() {
    this.baseURL = ''; // Use relative URLs since you're on same domain
  }

  // Main API request method with error handling
  async request(url, options = {}) {
    try {
      const config = {
        credentials: 'include', // Include cookies for JWT
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      };

      const response = await fetch(url, config);
      const data = await response.json();

      // Handle unauthorized responses
      if (response.status === 401) {
        this.handleUnauthorized(data);
        return data;
      }

      // Handle forbidden responses  
      if (response.status === 403) {
        this.handleForbidden(data);
        return data;
      }

      // Handle other error responses
      if (!response.ok) {
        this.handleError(response.status, data);
        return data;
      }

      return data;

    } catch (error) {
      console.error('API Request Error:', error);
      this.handleNetworkError(error);
      throw error;
    }
  }

  // Handle 401 - Unauthorized (invalid/expired token)
  handleUnauthorized(data) {
    console.log('Unauthorized access detected:', data.message);
    
    // Clear user data from localStorage
    localStorage.removeItem('user');
    
    // Show alert to user
    this.showAlert('Session expired. Please log in again.', 'warning');
    
    // Redirect to login if specified by backend
    if (data.redirect) {
      setTimeout(() => {
        window.location.href = data.redirect;
      }, 2000);
    }
  }

  // Handle 403 - Forbidden (insufficient permissions)
  handleForbidden(data) {
    console.log('Access forbidden:', data.message);
    
    // Show alert about insufficient permissions
    this.showAlert(
      `Access denied: ${data.message}. Required role: ${data.required?.join(' or ')}`, 
      'error'
    );
    
    // Optionally redirect to home page
    setTimeout(() => {
      window.location.href = '/';
    }, 3000);
  }

  // Handle other HTTP errors
  handleError(status, data) {
    console.log(`HTTP ${status} Error:`, data.message);
    
    const errorMessages = {
      400: 'Bad request. Please check your input.',
      404: 'Requested resource not found.',
      500: 'Server error. Please try again later.',
    };
    
    const message = data.message || errorMessages[status] || 'An error occurred';
    this.showAlert(message, 'error');
  }

  // Handle network errors
  handleNetworkError(error) {
    console.error('Network error:', error);
    this.showAlert('Network error. Please check your connection.', 'error');
  }

  // Show alert/notification to user
  showAlert(message, type = 'info') {
    // Option 1: Simple browser alert
    // alert(message);
    
    // Option 2: Custom notification system
    // You can dispatch to a notification context or use a toast library
    
    // Option 3: Dispatch custom event that components can listen to
    window.dispatchEvent(new CustomEvent('apiAlert', {
      detail: { message, type }
    }));
    
    console.log(`${type.toUpperCase()}: ${message}`);
  }

  // Convenience methods for different HTTP methods
  async get(url, options = {}) {
    return this.request(url, { ...options, method: 'GET' });
  }

  async post(url, data, options = {}) {
    return this.request(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(url, data, options = {}) {
    return this.request(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(url, options = {}) {
    return this.request(url, { ...options, method: 'DELETE' });
  }
}

// Create singleton instance
const apiService = new ApiService();
export default apiService;