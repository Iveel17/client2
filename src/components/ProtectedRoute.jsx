import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * ProtectedRoute - Protects routes that require authentication
 * Redirects unauthenticated users (guests) to login
 */
const ProtectedRoute = ({ children, redirectTo = '/login' }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Check if user is authenticated (not a guest and not null)
  const isAuthenticated = user && user.role !== 'GUEST';

  if (!isAuthenticated) {
    // Redirect to login with return URL
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return children;
};

/**
 * RoleBasedRoute - Protects routes that require specific roles
 * Supports multiple roles and hierarchical permissions
 */
const RoleBasedRoute = ({ 
  children, 
  requiredRole, 
  requiredRoles = [], 
  redirectTo = '/login',
  fallbackComponent = null 
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // If no user, redirect to login
  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // If user is guest, redirect to login
  if (user.role === 'GUEST') {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Build array of required roles
  const rolesToCheck = requiredRole ? [requiredRole] : requiredRoles;
  
  // Role hierarchy: ADMIN > TEACHER > USER > GUEST
  const roleHierarchy = {
    'GUEST': 0,
    'USER': 1,
    'TEACHER': 2,
    'ADMIN': 3
  };

  const userRoleLevel = roleHierarchy[user.role] || 0;
  
  // Check if user has sufficient role level
  const hasRequiredRole = rolesToCheck.some(role => {
    const requiredLevel = roleHierarchy[role] || 0;
    return userRoleLevel >= requiredLevel;
  });

  if (!hasRequiredRole) {
    // Show fallback component or redirect
    if (fallbackComponent) {
      return fallbackComponent;
    }
    
    // Redirect based on user role
    if (user.role === 'USER') {
      return <Navigate to="/" replace />; // Send users to homepage
    }
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return children;
};

/**
 * GuestOnlyRoute - Routes that should only be accessible to guests/unauthenticated users
 * Useful for login/signup pages
 */
const GuestOnlyRoute = ({ children, redirectTo = '/' }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // If user is authenticated (not null and not guest), redirect
  const isAuthenticated = user && user.role !== 'GUEST';
  
  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

/**
 * ConditionalRoute - Shows different content based on authentication status
 * Useful for pages that have both public and private content
 */
const ConditionalRoute = ({ 
  authenticatedComponent, 
  guestComponent, 
  loadingComponent = <div>Loading...</div> 
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return loadingComponent;
  }

  const isAuthenticated = user && user.role !== 'GUEST';
  
  return isAuthenticated ? authenticatedComponent : guestComponent;
};

export { ProtectedRoute, RoleBasedRoute, GuestOnlyRoute, ConditionalRoute };