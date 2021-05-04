import React, { createContext, useContext } from "react";
import { useProductReducer } from "./reducers";

// When we run the createContext() function, it creates a new Context object
// which will hold our global state data and functionality (dispatch) so we can provide it throughout our app
const StoreContext = createContext();

// Every Context object comes with two components, a Provider and Consumer.
// The Provider is a special type of React component that we wrap our application in
// so it can make the state data that's passed into it as a prop available to all other components.
// The Consumer is our means of grabbing and using the data that the Provider holds for us.
const { Provider } = StoreContext;

// What we did here was create our own functionality to manage state at a global level
// and make it available to all of our other components through a special <Provider> component.
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
  });
  //use this to confirm it works!
  console.log(state);

  return <Provider value={[state, dispatch]} {...props} />;
};

// Custom react hook that receives [state and dispatch] data our StoreProvider manages for us.
// this means that any component that has acccess to StoreProvider
// can use any data in our gloobal state container or update it using the dispatch function.
const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
