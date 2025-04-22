import React, { createContext, useContext, useEffect, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingProductIndex = state.findIndex(item => item.id === action.payload.id);
      if (existingProductIndex !== -1) {
        const updatedState = [...state];
        updatedState[existingProductIndex].quantity += 1;
        return updatedState;
      } else {
        return [...state, { ...action.payload, quantity: 1 }];
      }
    case 'LOAD_CART':
      return action.payload;
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.payload);
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    dispatch({ type: 'LOAD_CART', payload: savedCart });
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
