import { ERROR, LOADING, LOGIN, REGISTER } from "../actions/action-types";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: localStorage.getItem("user") || null,
  isError: false,
  isSuccess: false,
  loading: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
    case REGISTER:
      localStorage.setItem("token", action.token);
      localStorage.setItem("user", JSON.stringify(action.user));
      return {
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
        error: "ERROR",
        isError: true,
        isSuccess: false,
        loading: false,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};
