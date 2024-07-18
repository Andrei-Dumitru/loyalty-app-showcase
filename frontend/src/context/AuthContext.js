import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import loyaltyApi from "../api/loyalty";

const authReducer = (state, action) => {
  switch (action.type) {
    case "no_auth":
      return { ...state, isLoading: false };
    case "signout":
      return { token: null, userId: null, isBusiness: false, errorMessage: '' };
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signup":
      return { token: action.payload.token, userId: action.payload.userId, isBusiness: action.payload.isBusiness, isLoading: false };
    case "signin":
      return { token: action.payload.token, userId: action.payload.userId, isBusiness: action.payload.isBusiness, isLoading: false };
    case "clear_error_message":
      return {...state, errorMessage: ''};
    default:
      return state;
  }
};

const checkAuth = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  const userId = await AsyncStorage.getItem("userId");
  const isBusiness = await AsyncStorage.getItem("isBusiness");

  if (token) {
    dispatch({ type: "signin", payload: { token, userId, isBusiness: isBusiness === 'true' } });
  } else {
    dispatch({ type: "no_auth" });
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_error_message' });
};

const signup = (dispatch) => async ({ email, password, isBusiness }) => {
  try {
    const response = await loyaltyApi.post("/signup", { email, password, isBusiness });
    await AsyncStorage.setItem("token", response.data.token);
    await AsyncStorage.setItem("userId", response.data.userId);
    await AsyncStorage.setItem("isBusiness", response.data.isBusiness.toString());
    dispatch({ type: "signup", payload: response.data });
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with signup",
    });
  }
};

const signin = (dispatch) => async ({ email, password }) => {
  try {
    const response = await loyaltyApi.post("/signin", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    await AsyncStorage.setItem("userId", response.data.userId);
    await AsyncStorage.setItem("isBusiness", response.data.isBusiness.toString());
    dispatch({ type: "signin", payload: response.data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "add_error",
      payload: "Something went wrong with signin",
    });
  }
};

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("userId");
  await AsyncStorage.removeItem("isBusiness");
  dispatch({ type: 'signout' });
};

export const { Context, Provider } = createDataContext(
  authReducer,
  { signup, signin, signout, clearErrorMessage, checkAuth },
  { token: null, userId: null, isBusiness: false, errorMessage: "", isLoading: true }
);
