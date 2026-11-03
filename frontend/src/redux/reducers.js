import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_DAYS, CLEAR_CART } from './actions';

const initialState = {
  items: [], // Кожен елемент: { ...tool, days: 1 }
};

export function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        // Якщо вже є — не дублюємо, а залишаємо
        return state;
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, days: 1 }],
      };
    }

    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case UPDATE_DAYS:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.toolId
            ? { ...item, days: Math.max(1, action.payload.days) }
            : item
        ),
      };

    case CLEAR_CART:
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
}