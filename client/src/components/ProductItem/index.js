import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
// import { useStoreContext } from "../../utils/GlobalState";
import { useSelector, useDispatch } from "react-redux";
import { idbPromise } from "../../utils/helpers";

import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/redux/actions";

function ProductItem(item) {
  const { image, name, _id, price, quantity } = item;

  // const [state, dispatch] = useStoreContext();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { cart } = state;

  const addToCart = () => {
    // find the cart item with the matching id
    const iteminCart = cart.find((item) => item._id === _id);

    if (iteminCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(iteminCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...iteminCart,
        purchaseQuantity: parseInt(iteminCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
    }
  };

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img alt={name} src={`/images/${image}`} />
        <p>{name}</p>
      </Link>
      <div>
        <div>
          {quantity} {pluralize("item", quantity)} in stock
        </div>
        <span>${price}</span>
      </div>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default ProductItem;
