import React, { useState } from "react";

const VITE_API_BASE = import.meta.env.VITE_API_BASE;

const ProfileSection = ({ user, onUserUpdate, onClose }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const profilePicUrl = user.profilePicture?.url || "";

  const handleProfilePicUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 🔥 instant preview
    setPreviewUrl(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      const res = await fetch(
        `${VITE_API_BASE}/api/users/me/profile-picture`,
        {
          method: "PUT",
          body: formData,
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Upload failed");

      const updatedUser = await res.json();
      onUserUpdate?.(updatedUser);

      setPreviewUrl(null);
    } catch (err) {
      console.error(err);
      setPreviewUrl(null);
    }
  };


  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${VITE_API_BASE}/api/users/me`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to update name");

      const updatedUser = await res.json();
      onUserUpdate?.(updatedUser);

      // ✅ CLOSE MODAL AFTER SUCCESS
      onClose?.();

    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">Profile</h4>

        {/* Profile Picture */}
        <div className="flex items-center space-x-4 mb-6">
          {profilePicUrl ? (
            <img
              src={previewUrl || profilePicUrl}
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

        {/* Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload New Profile Picture
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePicUpload}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-medium
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100 cursor-pointer"
          />
        </div>

        {/* Name */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Change First and Last Name
          </label>

          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-1/2 rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-1/2 rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
