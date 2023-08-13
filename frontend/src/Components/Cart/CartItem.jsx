import React from "react";
import { Link } from "react-router-dom";

function CartItem({ item, deleteCartItems }) {
  const handleRemove = () => {
    deleteCartItems(item.product);
  };

  return (
    <div className="CartItemCard flex items-center gap-4 border-b border-gray-300 py-4">
      <img
        src={item.image}
        alt="Product"
        className="w-16 h-16 object-contain"
      />
      <div>
        <Link
          to={`/product/${item.product}`}
          className="text-blue-500 font-semibold"
        >
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </Link>
        <span className="block mt-1 text-gray-600">{`Price: ₹${item.price}`}</span>
        <p
          onClick={handleRemove}
          className="cursor-pointer text-red-500 font-semibold"
        >
          Remove
        </p>
      </div>
    </div>
  );
}

export default CartItem;
