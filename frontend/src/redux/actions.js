export const ADD_TO_CART = 'cart/add';
export const REMOVE_FROM_CART = 'cart/remove';
export const UPDATE_DAYS = 'cart/updateDays';
export const CLEAR_CART = 'cart/clear';

export const addToCart = (tool) => ({
  type: ADD_TO_CART,
  payload: tool,
});

export const removeFromCart = (toolId) => ({
  type: REMOVE_FROM_CART,
  payload: toolId,
});

export const updateDays = (toolId, days) => ({
  type: UPDATE_DAYS,
  payload: { toolId, days },
});

export const clearCart = () => ({
  type: CLEAR_CART,
});