import React, { useState, useEffect } from 'react';
import { AuthContext } from './authContext.js';
import authService from '@/services/authService';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // 1️⃣ VERIFY SESSION
        const verify = await authService.verify();
        if (!verify.success) {
          setUser(null);
          setLoading(false);
          return;
        }

        // 2️⃣ FETCH FULL PROFILE
        const profile = await authService.getUserProfile();
        if (profile.success) {
          setUser(profile.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('AuthProvider initAuth error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const updateUser = (updatedUser) => {
    setUser(updatedUser); // 🔥 replace entire object
  };
  const login = async (credentials) => {
    try {
      const result = await authService.login(credentials);
      
      if (result.success) {
        setUser(result.user); // Set user state if login successful
      }
        // 🔥 fetch full profile immediately
      const profile = await authService.getUserProfile();
      if (profile.success) {
        setUser(profile.user);
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
    updateUser,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};