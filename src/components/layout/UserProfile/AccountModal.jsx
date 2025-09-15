import React, { forwardRef, useState } from 'react';
import ProfileSection from './ProfileSection';
import SecuritySection from './SecuritySection';

const AccountModal = forwardRef(({ 
  isVisible, 
  onClose, 
  user, 
  profilePic,
  onProfilePicUpload 
}, ref) => {
  const [activeTab, setActiveTab] = useState("account");

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={ref}
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Account Settings
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="flex h-[600px]">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab("account")}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                  activeTab === "account"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                Account
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                  activeTab === "security"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                Security
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === "account" && (
              <ProfileSection 
                user={user} 
                profilePic={profilePic}
                onProfilePicUpload={onProfilePicUpload}
              />
            )}
            {activeTab === "security" && <SecuritySection />}
          </div>
        </div>
      </div>
    </div>
  );
});

AccountModal.displayName = 'AccountModal';

export default AccountModal;