import createDataContext from "./createDataContext";
import loyaltyApi from "../api/loyalty";

const businessReducer = (state, action) => {
  switch (action.type) {
    case "fetch":
      return { businesses: action.payload };
    default:
      return state;
  }
};

const fetchBusinesses = (dispatch) => async () => {
  const response = await loyaltyApi.get("/businesses");
  dispatch({ type: "fetch", payload: response.data });
}


export const { Context, Provider } = createDataContext(
  businessReducer,
  { fetchBusinesses },
  { businesses: [] }
);
