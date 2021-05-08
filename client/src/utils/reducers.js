import { useReducer } from "react";

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
} from "./actions";

// Let's not forget to include the ...state operator to preserve everything else on state.
// Then we can update the cart property to add action.product to the end of the array.
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

    case ADD_TO_CART:
      return {
        ...state,
        // set cartOpen to true so that users can immediately view the cart with the newly added item, if it's not already open.
        cartOpen: true,
        cart: [...state.cart, action.product],
      };

    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, ...action.products],
      };

    case REMOVE_FROM_CART:
      let newState = state.cart.filter((product) => product._id !== action._id);

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState,
      };

    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((product) => {
          if (action._id === product._id) {
            product.purchaseQuantity = action.purchaseQuantity;
          }
          return product;
        }),
      };

    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: [],
      };

    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen,
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
