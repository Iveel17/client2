import React, { useState, useEffect } from 'react';
import { AuthContext } from './authContext.js';
import authService from '@/services/authService';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const result = await authService.getUserProfile();
        if (result.success) {
          setUser(result.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, []);

  const login = async (credentials) => {
    try {
      const result = await authService.login(credentials);
      
      if (result.success) {
        setUser(result.user); // Set user state if login successful
      }
      
      return result; // IMPORTANT: Return the result so LoginPage can check result.success
    } catch (error) {
      console.error('AuthProvider login error:', error);
      return { success: false, errors: { general: 'An unexpected error occurred' } };
    }
  };

  const signup = async (userData) => {
    try {
      const result = await authService.signup(userData);
      
      if (result.success) {
        setUser(result.user); // Set user state if signup successful
      }
      
      return result; // Return the result so SignupPage can check result.success
    } catch (error) {
      console.error('AuthProvider signup error:', error);
      return { success: false, errors: { general: 'An unexpected error occurred' } };
    }
  };

  const logout = async () => {
    try {
      const result = await authService.logout();
      setUser(null);
      return result;
    } catch (error) {
      console.error('AuthProvider logout error:', error);
      setUser(null); // Still clear user on logout error
      return { success: false, error: 'Logout failed' };
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};