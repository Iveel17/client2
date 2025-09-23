// PictureProvider.js
import React, { useState, useEffect } from "react";
import { PictureContext } from "./pictureContext.js";
import pictureService from "@/services/pictureService";

export const PictureProvider = ({ children }) => {
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all pictures
  const fetchPictures = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await pictureService.getPictures();
      setPictures(result.data || []); // Axios returns { data }
    } catch (err) {
      console.error("Failed to fetch pictures:", err);
      setError("Could not load pictures");
    } finally {
      setLoading(false);
    }
  };

  // Upload a new picture
  const uploadPicture = async (formData) => {
    try {
      const result = await pictureService.uploadPicture(formData);
      // Option 1: refresh full list
      await fetchPictures();
      // Option 2: Optimistic update
      // setPictures(prev => [result.picture, ...prev]);
      return result;
    } catch (err) {
      console.error("Picture upload failed:", err);
      throw err;
    }
  };

  useEffect(() => {
    fetchPictures();
  }, []);

  const value = {
    pictures,
    loading,
    error,
    fetchPictures,
    uploadPicture,
  };

  return (
    <PictureContext.Provider value={value}>
      {children}
    </PictureContext.Provider>
  );
};
