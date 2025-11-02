import { productService } from '@/services/productService';

export function useProductActions() {
  const createProductActions = async (formData) => {
    try {
      return await productService.create(formData);
    } catch (error) {
      console.error('Create product error:', error);
      throw error;
    }
  };

  return { createProductActions };
}