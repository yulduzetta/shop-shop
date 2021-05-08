import React, { useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux'
import { useQuery } from "@apollo/react-hooks";

import { idbPromise } from "../../utils/helpers";

import { QUERY_CATEGORIES } from "../../utils/queries";
// import { useStoreContext } from "../../utils/GlobalState";
import {
  UPDATE_CURRENT_CATEGORY,
  UPDATE_CATEGORIES,
  UPDATE_CART_QUANTITY,
} from "../../utils/redux/actions";

function CategoryMenu() {
  // const [state, dispatch] = useStoreContext();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const { categories } = state;
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  // useEffect() Hook works. It is a function that takes two arguments,
  // a function to run given a certain condition, and then the condition.
  // In this case, the function runs immediately on load
  // and passes in our function to update the global state
  // and then the data that we're dependent on, categoryData and dispatch.
  // Now, categoryData is going to be undefined on load
  // because the useQuery() Hook isn't done with its request just yet,
  // meaning that if statement will not run.
  useEffect(() => {
    // if categoryData exists or has changed from the response of useQuery, then run dispatch()
    if (categoryData) {
      // execute dispatch funciton with our action object indicating the type
      // of action and the data to set our state for categories to
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise("categories", "put", category);
      });
    } else if (!loading) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        categories: categories,
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
