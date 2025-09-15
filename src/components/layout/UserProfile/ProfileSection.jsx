import React from 'react';

const ProfileSection = ({ user, profilePic, onProfilePicUpload }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Account
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Manage your account information
        </p>
      </div>

      {/* Profile Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">
          Profile
        </h4>
        <div className="flex items-center space-x-4 mb-6">
          {profilePic ? (
            <img
              src={profilePic}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-lg">
              {user.firstName?.[0]}
              {user.lastName?.[0]}
            </div>
          )}
          <div>
            <h5 className="font-medium text-gray-900">
              {user.firstName} {user.lastName}
            </h5>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* Upload New Profile Picture */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload New Profile Picture
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={onProfilePicUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {/* Change Name Section */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Change First Name
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              defaultValue={`${user.firstName}`}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
              Save
            </button>
          </div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Change Last Name
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              defaultValue={`${user.lastName}`}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;