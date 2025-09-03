import { useContext } from 'react';
import { AuthContext } from '../context/authContext.js';

/**
 * Custom hook to access authentication context
 * Provides easy access to user data and auth functions
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  const { user, loading, login, signup, logout } = context;
  
  // Helper functions for common checks
  const isAuthenticated = user && user.role !== 'GUEST';
  const isGuest = !user || user.role === 'GUEST';
  const isUser = user && user.role === 'USER';
  const isTeacher = user && (user.role === 'TEACHER' || user.role === 'ADMIN');
  const isAdmin = user && user.role === 'ADMIN';
  
  // Role hierarchy checker
  const hasRole = (requiredRole) => {
    if (!user) return false;
    
    const roleHierarchy = {
      'GUEST': 0,
      'USER': 1,
      'TEACHER': 2,
      'ADMIN': 3
    };
    
    const userLevel = roleHierarchy[user.role] || 0;
    const requiredLevel = roleHierarchy[requiredRole] || 0;
    
    return userLevel >= requiredLevel;
  };
  
  // Check if user has any of the given roles
  const hasAnyRole = (roles = []) => {
    return roles.some(role => hasRole(role));
  };
  
  return {
    // Core auth state
    user,
    loading,
    
    // Auth functions
    login,
    signup,
    logout,
    
    // Helper booleans
    isAuthenticated,
    isGuest,
    isUser,
    isTeacher,
    isAdmin,
    
    // Helper functions
    hasRole,
    hasAnyRole,
    
    // User info helpers
    userName: user ? `${user.firstName} ${user.lastName}`.trim() : '',
    userRole: user?.role || 'GUEST',
    userId: user?.id || null,
    userEmail: user?.email || null
  };
};