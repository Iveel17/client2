import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import ButtonB from '@/components/common/buttons/ButtonB';
import ButtonA from '@/components/common/buttons/ButtonA';

const AuthSection = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.success || result.success === undefined) {
        // Navigate to home page after logout
        navigate('/');
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails on backend, clear frontend state
      navigate('/');
    }
  };

  // If user is logged in, show user info and logout
  if (user) {
    return (
      <div className="relative flex items-center">
        <div className="flex items-center gap-3">
          {/* Profile section */}
          <div className="flex items-center gap-2 cursor-pointer">
            {user.profilePic ? (
              <img 
                src={user.profilePic} 
                alt="Profile" 
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-200"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                {user.firstName?.[0]}{user.lastName?.[0]}
              </div>
            )}
            <span className="text-gray-700 font-medium hidden sm:inline">
              {user.firstName} {user.lastName}
            </span>
          </div>
          
          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  // If user is not logged in, show login/signup buttons
  return (
    <div className="flex items-center gap-2">
      <ButtonA text="Log In" to='/login'/>
      <ButtonB text="Join Us" to='/signup'/>
    </div>
  );
};

export default AuthSection;