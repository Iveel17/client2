import { useCallback } from "react";

export const useCourseContent = () => {
  const createCourseContent = useCallback(async (formData) => {
    const response = await fetch("/api/course-content", {
      method: "POST",
      body: formData, // IMPORTANT: do NOT set Content-Type manually
      credentials: "include", // safe default if you use auth cookies
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Failed to upload course content");
    }

    return response.json();
  }, []);

  return { createCourseContent };
};
