import { useReducer } from "react";

import {
  UPDATE_PRODUCTS,
  UPDATE_CURRENT_CATEGORY,
  UPDATE_CATEGORIES,
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };

    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
      };

    default:
      return state;
  }
};

// This function, useProductReducer(), will be used to help initialize our global state object
// and then provide us with the functionality for updating that state
// by automatically running it through our custom reducer() function.
// Think of this as a more in-depth way of using the useState() Hook we've used so much.
// The useState() Hook is great for managing simpler amounts of state,
// like form field values and the status of a button being clicked.
// The useReducer() Hook is meant specifically for managing a greater level of state,
// like we're doing now. We're going to put it to use next,
// when we learn more about how all of this comes together.
export const useProductReducer = (initialState) => {
  return useReducer(reducer, initialState);
};
