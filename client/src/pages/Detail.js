import { useQuery } from "@apollo/react-hooks";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import spinner from "../assets/spinner.gif";
import Cart from "../components/Cart";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  UPDATE_PRODUCTS,
} from "../utils/actions";
import { useStoreContext } from "../utils/GlobalState";
import { QUERY_PRODUCTS } from "../utils/queries";

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  // const products = data?.products || [];

  const { products, cart } = state;

  const addToCart = () => {
    const iteminCart = cart.find((cartItem) => cartItem._id === id);

    if (iteminCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(iteminCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id,
    });
  };

  // What happens if someone just sent you this product's URL
  // and this is the first time you've loaded this application?

  // If that's the case, then you wouldn't have any products saved
  // in global state just yet. The useEffect() Hook is set up so that if we don't,
  // we'll use the product data that we returned from the useQuery() Hook
  // to set the product data to the global state object.
  // When that's complete, we run through this all over again.
  // But this time, there is data in the products array,
  // and then we run setCurrentProduct() to display a single product's data.

  // This is why there are so many items in the second argument of the useEffect() Hook.
  // The Hook's functionality is dependent on them to work
  // and only runs when it detects that they've changed in value!
  // This is known as the dependency array.
  useEffect(() => {
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    } else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
    }
  }, [products, id, dispatch, data]);

  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{" "}
            <button onClick={addToCart}>Add to Cart</button>
            <button
              disabled={!cart.find((p) => p._id === currentProduct._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;
