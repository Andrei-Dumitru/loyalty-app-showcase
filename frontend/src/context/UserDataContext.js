import createDataContext from "./createDataContext";
import loyaltyApi from "../api/loyalty";

const userDataReducer = (state, action) => {
  switch (action.type) {
    case "fetch":
      return { ...state, userData: action.payload };
    default:
      return state;
  }
};

const fetchUserData = (dispatch) => async (userId) => {
    try {
      const response = await loyaltyApi.get(`/user/${userId}`);
      dispatch({ type: "fetch", payload: response.data });
    } catch (error) {
      console.error('Error fetching user data:', error.response ? error.response.data : error.message);
      throw new Error('Error fetching user data');
    }
  };


export const { Context, Provider } = createDataContext(
  userDataReducer,
  { fetchUserData },
  { userData: [] }
);
