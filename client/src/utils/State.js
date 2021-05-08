import { createStore } from "redux";
import { Provider } from "react-redux";

import moduleName from '../index'

import {
  UPDATE_PRODUCTS,
  UPDATE_CURRENT_CATEGORY,
  UPDATE_CATEGORIES,
  ADD_TO_CART,
  ADD_MULTIPLE_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  CLEAR_CART,
  TOGGLE_CART,
} from "./actions.js";

import { reducer } from "./reducers";

const updateProducts = () => {
  return {
    type: UPDATE_PRODUCTS,
  };
};

const updateCurrentCategory = () => {
  return {
    type: UPDATE_CURRENT_CATEGORY,
  };
};

const updateCategories = () => {
  return {
    type: UPDATE_CATEGORIES,
  };
};

const addToCart = () => {
  return {
    type: ADD_TO_CART,
  };
};

const addMultipleToCart = () => {
  return {
    type: ADD_MULTIPLE_TO_CART,
  };
};

const removeFromCart = () => {
  return {
    type: REMOVE_FROM_CART,
  };
};

const updateCartQuantity = () => {
  return {
    type: UPDATE_CART_QUANTITY,
  };
};

const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};

const toggleCart = () => {
  return {
    type: TOGGLE_CART,
  };
};

const testy = () => {
  return {
    type: "TEST",
  };
};

const StoreProvider = ({ value = [], ...props }) => {
  // Because that wraps it around the useReducer() Hook from React,
  // every time we run this useProductReducer() function,
  // we receive the following two items in return:
  // 1. 'state' -- most up-to-date version of our global state object.
  // 2. 'dispatch' -- method we execute to update our state.
  // It is specifically going to look for an action object passed in as its argument, as we'll soon see.
  const [state, dispatch] = useProductReducer({
    products: [],
    categories: [],
    currentCategory: "",
    cartOpen: false,
    cart: [],
  });
  //use this to confirm it works!
  console.log(state);

  return <Provider value={[state, dispatch]} {...props} />;
};

const store = createStore(reducer);
