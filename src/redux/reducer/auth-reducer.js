import { ERROR, LOADING, LOGIN, REGISTER, SET_REMEMBER_ME } from "../actions/action-types";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  isError: false,
  isSuccess: false,
  loading: false,
  error: null,
  rememberMe: localStorage.getItem("rememberMe") === "true" || false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
    case REGISTER:
      if (state.rememberMe) {
        localStorage.setItem("token", action.token);
        localStorage.setItem("user", JSON.stringify(action.user));
      }
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
    case SET_REMEMBER_ME:
      localStorage.setItem("rememberMe", action.payload);
      return {
        ...state,
        rememberMe: action.payload,
      };
    default:
      return state;
  }
};
