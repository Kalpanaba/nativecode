import React, { createContext, useState } from 'react';

export const CartContext = createContext();
 
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product._id === product._id);
      if (existingItem) {
        // Update the quantity if the product already exists in the cart
        return prevCart.map(item =>
          item.product._id === product._id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      // Add new product to the cart
      return [...prevCart, { product, quantity }];
    });
  };

  const increaseQuantity = (productId) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.product._id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.product._id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const getCartCount = () => cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, increaseQuantity, decreaseQuantity, getCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
