import React, { useState, useEffect, useCallback } from 'react';
import { CartContext } from './cartContext.js'; // Ensure correct casing: CartContext.js

const cartService = {
  fetchCart: async () => {
    try {
      console.log(`[CartService] Fetching cart from local storage.`);
      const storedCart = localStorage.getItem('cart_items');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.warn('[CartService] localStorage not available:', error);
      return [];
    }
  },
  saveCart: async (cartItems) => {
    try {
      console.log(`[CartService] Saving cart to local storage:`, cartItems);
      localStorage.setItem('cart_items', JSON.stringify(cartItems));
    } catch (error) {
      console.warn('[CartService] Could not save to localStorage:', error);
    }
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
    if (!loading) { // Only save after initial load
      const saveCart = async () => {
        console.log("[CartProvider] Cart items changed, preparing to save:", cartItems);
        await cartService.saveCart(cartItems);
      };

      const handler = setTimeout(() => {
        saveCart();
      }, 500);

      return () => clearTimeout(handler);
    }
  }, [cartItems, loading]);

  const addItemToCart = useCallback((item) => {
    console.log("[CartProvider] addItemToCart called with item:", item);
    
    if (!item.id) {
      console.error("[CartProvider] Item must have an id:", item);
      return;
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      
      let newCart;
      if (existingItem) {
        newCart = prevItems.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + (item.quantity || 1) }
            : i
        );
        console.log("[CartProvider] Item already in cart, updating quantity. New cart:", newCart);
      } else {
        const newItem = {
          type: item.type,
          stock: item.stock,
          id: item.id,
          title: item.title,
          price: item.price,
          image: item.image,
          quantity: item.quantity || 1
        };
        newCart = [...prevItems, newItem];
        console.log("[CartProvider] New item added to cart. New cart:", newCart);
      }
      return newCart;
    });
  }, []);

  const removeItemFromCart = useCallback((id) => {
    console.log("[CartProvider] removeItemFromCart called for id:", id);
    setCartItems((prevItems) => {
      const newCart = prevItems.filter((item) => item.id !== id);
      console.log("[CartProvider] Item removed. New cart:", newCart);
      return newCart;
    });
  }, []);

  const updateItemQuantity = useCallback((id, newQuantity) => {
    console.log(`[CartProvider] updateItemQuantity called for ${id} with new quantity: ${newQuantity}`);
    setCartItems((prevItems) => {
      if (newQuantity <= 0) {
        const newCart = prevItems.filter((item) => item.id !== id);
        console.log("[CartProvider] Quantity <= 0, removing item. New cart:", newCart);
        return newCart;
      }
      const newCart = prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
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