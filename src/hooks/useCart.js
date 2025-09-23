// src/hooks/useCart.js

import { useContext } from 'react';
import { CartContext } from '@/context/cart/CartContext';

export const useCart = () => {
  const context = useContext(CartContext);

  // This check ensures that useCart is only called within a CartProvider.
  // It's a helpful safeguard for developers.
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};