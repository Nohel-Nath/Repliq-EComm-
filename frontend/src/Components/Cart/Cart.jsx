import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { addItemsToCart, removeItemsFromCart } from "../../Actions/CartAction";
import CartItem from "./CartItem";

function Cart() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <div className="emptyCart bg-gray-100 p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">
            No Product in Your Cart
          </h2>
          <Link to="/" className="view text-blue-500">
            View Products
          </Link>
        </div>
      ) : (
        <>
          <div className="cartPage">
            <div className="cartHeader grid grid-cols-3 gap-2 border-b-2 border-gray-300 pb-2 mb-4">
              <p className="font-semibold">Product</p>
              <p className="font-semibold">Quantity</p>
              <p className="font-semibold">Subtotal</p>
            </div>
            {cartItems.map((item) => (
              <div
                className="cartContainer grid grid-cols-3 gap-2 items-center"
                key={item.product}
              >
                <CartItem item={item} deleteCartItems={deleteCartItems} />
                <div className="cartInput flex items-center">
                  <button
                    onClick={() =>
                      decreaseQuantity(item.product, item.quantity)
                    }
                    className="px-2 py-1 bg-blue-500 text-white font-semibold rounded"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    readOnly
                    className="w-12 text-center"
                  />
                  <button
                    onClick={() =>
                      increaseQuantity(item.product, item.quantity, item.stock)
                    }
                    className="px-2 py-1 bg-blue-500 text-white font-semibold rounded"
                  >
                    +
                  </button>
                </div>
                <p className="cartSubtotal font-semibold">{`₹${
                  item.price * item.quantity
                }`}</p>
              </div>
            ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox grid grid-cols-3 gap-2 items-center">
                <p className="font-semibold">Gross Total</p>
                <p className="price-profit text-right">{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
                <div></div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Cart;
