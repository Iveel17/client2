import { courseService } from '@/services/courseService';

export function useCourseActions() {
  const createCourseActions = async (formData) => {
    try {
      return await courseService.create(formData);
    } catch (error) {
      console.error('Create course error:', error);
      throw error;
    }
  };

  return { createCourseActions };
}