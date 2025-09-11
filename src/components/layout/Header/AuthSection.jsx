// /src/components/.../AuthSection.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { usePictures } from "@/hooks/usePicture"; 
import ButtonB from "@/components/common/buttons/ButtonB";
import ButtonA from "@/components/common/buttons/ButtonA";

const API_BASE = import.meta.env.VITE_API_BASE || "";

const AuthSection = () => {
  const { user, logout } = useAuth();
  const { pictures, uploadPicture, fetchPictures } = usePictures(); // <-- use it
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [activeTab, setActiveTab] = useState("account");
  const [localProfilePic, setLocalProfilePic] = useState(null); // instant preview
  const modalRef = useRef(null);
  const accountModalRef = useRef(null);

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.success || result.success === undefined) {
        navigate("/");
      }
    } catch (error) {
      console.error("Logout error:", error);
      navigate("/");
    }
    setShowModal(false);
  };

  const handleManageAccount = () => {
    setShowModal(false);
    setShowAccountModal(true);
    setActiveTab("account");
  };

  const handleCloseAccountModal = () => {
    setShowAccountModal(false);
  };

  // Keep localProfilePic in sync when pictures array updates (initial load / refresh)
  useEffect(() => {
    if (pictures?.length > 0) {
      const fp = pictures[0].filePath;
      if (fp) {
        setLocalProfilePic(`${API_BASE}/uploads/profile-pictures/${fp}`);
      }
    }
  }, [pictures]);

  // Upload profile picture handler (instant update)
  const handleProfilePicUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("picture", file);

    try {
      const res = await uploadPicture(formData); // axios response
      // try a few places to find filePath depending on backend response shape
      const filePath =
        res?.data?.picture?.filePath ||
        res?.data?.filePath ||
        res?.picture?.filePath ||
        res?.filePath ||
        null;

      if (filePath) {
        const newPic = `${API_BASE}/uploads/profile-pictures/${filePath}`;
        setLocalProfilePic(newPic); // instant preview
      }

      // refresh list in background to keep global state consistent
      try {
        await fetchPictures();
      } catch (err) {
        // non-fatal if this fails
        console.warn("fetchPictures failed after upload:", err);
      }
    } catch (err) {
      console.error("Profile picture upload failed:", err);
    }
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  // Close account modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        accountModalRef.current &&
        !accountModalRef.current.contains(event.target)
      ) {
        setShowAccountModal(false);
      }
    };

    if (showAccountModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAccountModal]);

  // Determine what to show as the profile picture
  const profilePic =
    localProfilePic ||
    (pictures?.length > 0
      ? `${API_BASE}/uploads/profile-pictures/${pictures[0].filePath}`
      : user?.profilePic || null);

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

          {/* Profile Dropdown Modal */}
          {showModal && (
            <div
              ref={modalRef}
              className="absolute right-0 top-12 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[200px] z-50"
            >
              {/* User Info Header */}
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  {profilePic ? (
                    <img
                      src={profilePic}
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
                  onClick={handleManageAccount}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
                >
                  Manage account
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
                >
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
                <h2 className="text-xl font-semibold text-gray-900">
                  Account Settings
                </h2>
                <button
                  onClick={handleCloseAccountModal}
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
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeTab === "account"
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      Account
                    </button>
                    <button
                      onClick={() => setActiveTab("security")}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
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
                            onChange={handleProfilePicUpload}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                          />
                        </div>

                        {/* Change Name Section (restored) */}
                        <div className="mt-6">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Change Display Name
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              defaultValue={`${user.firstName} ${user.lastName}`}
                              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                            <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "security" && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Security
                      </h3>
                      <p className="text-sm text-gray-600 mb-6">
                        Manage your security preferences
                      </p>
                      {/* Security features can go here */}
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
      <ButtonA text="Log In" to="/login" />
      <ButtonB text="Join Us" to="/signup" />
    </div>
  );
};

export default AuthSection;
