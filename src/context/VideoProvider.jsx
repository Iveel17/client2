import React, { useState, useEffect } from "react";
import { VideoContext } from "./VideoContext.js";
import videoService from "@/services/videoService";

export const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all videos
  const fetchVideos = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await videoService.getVideos();
      setVideos(result.data || []); // Axios returns { data }
    } catch (err) {
      console.error("Failed to fetch videos:", err);
      setError("Could not load videos");
    } finally {
      setLoading(false);
    }
  };

  // Upload a new video
  const uploadVideo = async (formData) => {
    try {
      const result = await videoService.uploadVideo(formData);
      // Option 1: refresh full list
      await fetchVideos();
      // Option 2: Optimistic update:
      // setVideos(prev => [result.video, ...prev]);
      return result;
    } catch (err) {
      console.error("Video upload failed:", err);
      throw err;
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const value = {
    videos,
    loading,
    error,
    fetchVideos,
    uploadVideo,
  };

  return (
    <VideoContext.Provider value={value}>
      {children}
    </VideoContext.Provider>
  );
};
