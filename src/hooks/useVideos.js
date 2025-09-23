import { useContext } from "react";
import { VideoContext } from "../context/video/VideoContext.js";

/**
 * Custom hook to access video context
 * Provides easy access to video data and actions
 */
export const useVideos = () => {
  const context = useContext(VideoContext);

  if (!context) {
    throw new Error("useVideos must be used within a VideoProvider");
  }

  const { videos, loading, error, fetchVideos, uploadVideo } = context;

  return {
    // Core state
    videos,
    loading,
    error,

    // Actions
    fetchVideos,
    uploadVideo,

    // Helper values
    hasVideos: videos && videos.length > 0,
    totalVideos: videos?.length || 0,
  };
};
