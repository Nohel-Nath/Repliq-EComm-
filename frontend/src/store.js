import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { cartReducer } from "./Reducers/CartReducer";
import {
  allProductsReducer,
  allUsersReducer,
  newProductReducer,
  productDetailsReducer,
  productUpdateReducer,
  userReducer,
} from "./Reducers/UserReducer";

const reducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  allUser: allUsersReducer,
  adminProducts: allProductsReducer,
  newProduct: newProductReducer,
  updateProduct: productUpdateReducer,
  productDetails: productDetailsReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
