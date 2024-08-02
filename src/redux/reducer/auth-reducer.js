import {
  ADD_TO_CART,
  ERROR,
  LOADING,
  LOGIN,
  REGISTER,
  REMOVE_FROM_CART,
  SIGNOUT,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY
} from "../actions/action-types";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  isError: false,
  isSuccess: false,
  loading: false,
  error: null,
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
    case REGISTER:
      localStorage.setItem("token", action.token);
      localStorage.setItem("user", JSON.stringify(action.user));
      return {
        ...state,
        token: action.token,
        user: action.user,
        error: null,
        isError: false,
        isSuccess: true,
        loading: false,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case ERROR:
      return {
        ...state,
        error: "ERROR",
        isError: true,
        isSuccess: false,
        loading: false,
        user: null,
        token: null,
      };
    case SIGNOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("cart");
      return {
        ...state,
        token: null,
        user: null,
        cart: [],
      };
    case ADD_TO_CART:
      const existingItem = state.cart.find(item => item._id === action.payload._id);
      let newCart;

      if (existingItem) {
        newCart = state.cart.map(item =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...state.cart, { ...action.payload, quantity: 1 }];
      }

      localStorage.setItem("cart", JSON.stringify(newCart));

      return {
        ...state,
        cart: newCart,
      };

    case REMOVE_FROM_CART:
      const updatedCart = state.cart.filter(item => item._id !== action.payload);
      
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return {
        ...state,
        cart: updatedCart,
      };

    case INCREMENT_QUANTITY:
      const incrementedCart = state.cart.map(item =>
        item._id === action.payload._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      localStorage.setItem("cart", JSON.stringify(incrementedCart));

      return {
        ...state,
        cart: incrementedCart,
      };

    case DECREMENT_QUANTITY:
      const decrementedCart = state.cart.map(item =>
        item._id === action.payload._id
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      );

      localStorage.setItem("cart", JSON.stringify(decrementedCart));

      return {
        ...state,
        cart: decrementedCart,
      };

    default:
      return state;
  }
};


