import { useContext } from "react";
import { PictureContext } from "../context/picture/pictureContext.js";

/**
 * Custom hook to access picture context
 * Provides easy access to picture data and actions
 */
export const usePictures = () => {
  const context = useContext(PictureContext);

  if (!context) {
    throw new Error("usePictures must be used within a PictureProvider");
  }

  const { pictures, loading, error, fetchPictures, uploadPicture } = context;

  return {
    // Core state
    pictures,
    loading,
    error,

    // Actions
    fetchPictures,
    uploadPicture,

    // Helper values
    hasPictures: pictures && pictures.length > 0,
    totalPictures: pictures?.length || 0,
  };
};