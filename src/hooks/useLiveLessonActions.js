import { liveLessonService } from '@/services/liveLessonService';

export function useLiveLessonActions() {
  const createLiveLessonActions = async (formData) => {
    try {
      return await liveLessonService.create(formData);
    } catch (error) {
      console.error('Create live lesson error:', error);
      throw error;
    }
  };

  return { createLiveLessonActions };
}