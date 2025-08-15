import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import ButtonB from '@/components/common/buttons/ButtonB';
import ButtonA from '@/components/common/buttons/ButtonA';

const AuthSection = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [activeTab, setActiveTab] = useState('account');
  const modalRef = useRef(null);
  const accountModalRef = useRef(null);

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.success || result.success === undefined) {
        navigate('/');
      }
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/');
    }
    setShowModal(false);
  };

  const handleManageAccount = () => {
    setShowModal(false);
    setShowAccountModal(true);
    setActiveTab('account');
  };

  const handleCloseAccountModal = () => {
    setShowAccountModal(false);
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModal]);

  // Close account modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountModalRef.current && !accountModalRef.current.contains(event.target)) {
        setShowAccountModal(false);
      }
    };

    if (showAccountModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAccountModal]);

  // If user is logged in, show only profile pic with modal
  if (user) {
    return (
      <>
        <div className="relative">
          {/* Profile Picture - Clickable */}
          <button
            onClick={() => setShowModal(!showModal)}
            className="flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full"
          >
            {user.profilePic ? (
              <img 
                src={user.profilePic} 
                alt="Profile" 
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-200 hover:border-blue-300 transition-colors cursor-pointer"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center text-white font-semibold text-sm cursor-pointer transition-colors border-2 border-blue-200">
                {user.firstName?.[0]}{user.lastName?.[0]}
              </div>
            )}
          </button>

          {/* Profile Dropdown Modal */}
          {showModal && (
            <div 
              ref={modalRef}
              className="absolute right-0 top-12 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[200px] z-50"
            >
              {/* User Info Header */}
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  {user.profilePic ? (
                    <img 
                      src={user.profilePic} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-xs">
                      {user.firstName?.[0]}{user.lastName?.[0]}
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user.email || 'User'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-1">
                <button
                  onClick={handleManageAccount}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Manage account
                </button>
                
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Account Management Modal */}
        {showAccountModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div 
              ref={accountModalRef}
              className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Account Settings</h2>
                <button
                  onClick={handleCloseAccountModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex h-[600px]">
                {/* Sidebar */}
                <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
                  <nav className="space-y-1">
                    <button
                      onClick={() => setActiveTab('account')}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeTab === 'account'
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Account
                    </button>
                    <button
                      onClick={() => setActiveTab('security')}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeTab === 'security'
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Security
                    </button>
                  </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                  {activeTab === 'account' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Account</h3>
                        <p className="text-sm text-gray-600 mb-6">Manage your account information</p>
                      </div>

                      {/* Profile Section */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h4 className="text-md font-medium text-gray-900 mb-4">Profile</h4>
                        <div className="flex items-center space-x-4 mb-6">
                          {user.profilePic ? (
                            <img 
                              src={user.profilePic} 
                              alt="Profile" 
                              className="w-16 h-16 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-lg">
                              {user.firstName?.[0]}{user.lastName?.[0]}
                            </div>
                          )}
                          <div>
                            <h5 className="font-medium text-gray-900">
                              {user.firstName} {user.lastName}
                            </h5>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>

                        {/* Username Section */}
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Username
                            </label>
                            <div className="flex items-center justify-between bg-gray-50 rounded-md p-3">
                              <span className="text-sm text-gray-900">
                                {user.username || 'wozy'}
                              </span>
                              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                Change username
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'security' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Security</h3>
                        <p className="text-sm text-gray-600 mb-6">Manage your security preferences</p>
                      </div>

                      {/* Password Section */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h4 className="text-md font-medium text-gray-900 mb-4">Password</h4>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm text-gray-900">••••••••</span>
                          </div>
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Change password
                          </button>
                        </div>
                      </div>

                      {/* Two-Factor Authentication */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h4 className="text-md font-medium text-gray-900 mb-2">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-600 mb-4">
                          Add an extra layer of security to your account
                        </p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                          Enable 2FA
                        </button>
                      </div>

                      {/* Login Sessions */}
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h4 className="text-md font-medium text-gray-900 mb-2">Login Sessions</h4>
                        <p className="text-sm text-gray-600 mb-4">
                          Manage your active login sessions
                        </p>
                        <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                          Sign out all devices
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </>
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