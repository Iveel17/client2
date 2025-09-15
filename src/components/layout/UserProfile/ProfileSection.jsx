import React, { useState } from 'react';

const ProfileSection = ({ user, profilePic, onProfilePicUpload, onUserUpdate }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [loading, setLoading] = useState(false);

  // Save both first and last name together
  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName }),
      });

      if (!res.ok) throw new Error("Failed to update name");

      const updatedUser = await res.json();
      console.log("Updated user:", updatedUser);

      // Update local state/UI or notify parent
      onUserUpdate?.(updatedUser); 
      setFirstName(updatedUser.firstName);
      setLastName(updatedUser.lastName);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">Profile</h4>

        {/* Profile Pic */}
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
              {firstName} {lastName}
            </h5>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* Upload Profile Pic */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload New Profile Picture
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={onProfilePicUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer"
          />
        </div>

        {/* Change Name */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Change First and Last Name
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-1/2 rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-1/2 rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
