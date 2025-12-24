import React, { forwardRef } from "react";

const ProfileDropdown = forwardRef(
  ({ user, onManageAccount, onLogout, isVisible }, ref) => {
    if (!isVisible) return null;

    const profilePicUrl = user.profilePicture?.url || "";

    return (
      <div
        ref={ref}
        className="absolute right-0 top-12 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[200px] z-50"
      >
        {/* User Info Header */}
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            {profilePicUrl ? (
              <img
                src={`${profilePicUrl}?t=${Date.now()}`}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-xs">
                {user.firstName?.[0]}
                {user.lastName?.[0]}
              </div>
            )}

            <div>
              <p className="font-medium text-gray-900 text-sm">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-gray-500">
                {user.email || "User"}
              </p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-1">
          <button
            onClick={onManageAccount}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            My courses
          </button>

          <button
            onClick={onManageAccount}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            Manage account
          </button>

          <button
            onClick={onLogout}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }
);

ProfileDropdown.displayName = "ProfileDropdown";

export default ProfileDropdown;
