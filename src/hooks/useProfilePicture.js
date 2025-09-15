import { useState, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE || "";

export const useProfilePicture = (pictures, user) => {
  const [localProfilePic, setLocalProfilePic] = useState(null);

  // Keep localProfilePic in sync when pictures array updates
  useEffect(() => {
    if (pictures?.length > 0) {
      const fp = pictures[0].filePath;
      if (fp) {
        setLocalProfilePic(`${API_BASE}/uploads/profile-pictures/${fp}`);
      }
    }
  }, [pictures]);

  // Determine what to show as the profile picture
  const profilePic =
    localProfilePic ||
    (pictures?.length > 0
      ? `${API_BASE}/uploads/profile-pictures/${pictures[0].filePath}`
      : user?.profilePic || null);

  return {
    profilePic,
    setLocalProfilePic
  };
};