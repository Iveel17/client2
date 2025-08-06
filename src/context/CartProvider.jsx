import React, { useState, useEffect, useCallback } from 'react';
import { CartContext } from './CartContext.js'; // Ensure correct casing: CartContext.js

const cartService = {
  fetchCart: async () => {
    console.log(`[CartService] Fetching cart from local storage.`);
    const storedCart = localStorage.getItem('cart_items');
    return storedCart ? JSON.parse(storedCart) : [];
  },
  saveCart: async (cartItems) => {
    console.log(`[CartService] Saving cart to local storage:`, cartItems);
    localStorage.setItem('cart_items', JSON.stringify(cartItems));
  },
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCart = async () => {
      setLoading(true);
      setError(null);
      try {
        const storedCart = await cartService.fetchCart();
        setCartItems(storedCart);
        console.log("[CartProvider] Cart loaded:", storedCart);
      } catch (err) {
        console.error("[CartProvider] Failed to load cart:", err);
        setError("Failed to load cart.");
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, []);

  useEffect(() => {
    const saveCart = async () => {
      console.log("[CartProvider] Cart items changed, preparing to save:", cartItems);
      await cartService.saveCart(cartItems);
    };

    const handler = setTimeout(() => {
      saveCart();
    }, 500);

    return () => clearTimeout(handler);
  }, [cartItems]);

  const addItemToCart = useCallback((item) => {
    console.log("[CartProvider] addItemToCart called with item:", item);
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.courseId === item.courseId);
      let newCart;
      if (existingItem) {
        newCart = prevItems.map((i) =>
          i.courseId === item.courseId
            ? { ...i, quantity: i.quantity + (item.quantity || 1) }
            : i
        );
        console.log("[CartProvider] Item already in cart, updating quantity. New cart:", newCart);
      } else {
        newCart = [...prevItems, { ...item, quantity: item.quantity || 1 }];
        console.log("[CartProvider] New item added to cart. New cart:", newCart);
      }
      return newCart;
    });
  }, []);

  const removeItemFromCart = useCallback((courseId) => {
    console.log("[CartProvider] removeItemFromCart called for courseId:", courseId);
    setCartItems((prevItems) => {
      const newCart = prevItems.filter((item) => item.courseId !== courseId);
      console.log("[CartProvider] Item removed. New cart:", newCart);
      return newCart;
    });
  }, []);

  const updateItemQuantity = useCallback((courseId, newQuantity) => {
    console.log(`[CartProvider] updateItemQuantity called for ${courseId} with new quantity: ${newQuantity}`);
    setCartItems((prevItems) => {
      if (newQuantity <= 0) {
        const newCart = prevItems.filter((item) => item.courseId !== courseId);
        console.log("[CartProvider] Quantity <= 0, removing item. New cart:", newCart);
        return newCart;
      }
      const newCart = prevItems.map((item) =>
        item.courseId === courseId ? { ...item, quantity: newQuantity } : item
      );
      console.log("[CartProvider] Quantity updated. New cart:", newCart);
      return newCart;
    });
  }, []);

  const clearCart = useCallback(() => {
    console.log("[CartProvider] clearCart called.");
    setCartItems([]);
  }, []);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const cartContextValue = {
    cartItems,
    totalItems,
    totalPrice,
    loading,
    error,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};
