import React from 'react';

const ProfileButton = ({ user, profilePic, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full"
    >
      {profilePic ? (
        <img
          src={profilePic}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border-2 border-blue-200 hover:border-blue-300 transition-colors cursor-pointer"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center text-white font-semibold text-sm cursor-pointer transition-colors border-2 border-blue-200">
          {user.firstName?.[0]}
          {user.lastName?.[0]}
        </div>
      )}
    </button>
  );
};

export default ProfileButton;