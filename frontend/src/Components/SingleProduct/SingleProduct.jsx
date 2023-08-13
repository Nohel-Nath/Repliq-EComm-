import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { addItemsToCart } from "../../Actions/CartAction";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const history = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3005/product/single/${id}`
        );
        setProduct(response.data.product);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchProduct();
  }, [id]);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < product.Stock) {
      setQuantity(quantity + 1);
    }
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    toast.success("Items added to cart");
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="flex">
        <img
          src={product.images[0].url}
          alt={product.name}
          className="w-64 h-64 object-cover"
        />
        <div className="ml-8">
          <h2 className="text-2xl font-semibold">{product.name}</h2>
          <p className="text-gray-600 mt-2">{product.category}</p>
          <p className="text-blue-500 font-bold mt-1">${product.price}</p>
          <p className="mt-4">{product.description}</p>
          <p className="mt-2">
            {product.Stock > 0 ? `In Stock: ${product.Stock}` : "Out of Stock"}
          </p>
          {product.Stock > 0 && (
            <div className="flex mt-4">
              <button
                className="bg-gray-300 px-3 py-1 rounded-l"
                onClick={decreaseQuantity}
              >
                -
              </button>
              <span className="px-3 py-1">{quantity}</span>
              <button
                className="bg-gray-300 px-3 py-1 rounded-r"
                onClick={increaseQuantity}
              >
                +
              </button>
            </div>
          )}
          {product.Stock > 0 && (
            <button
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
              onClick={addToCartHandler}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SingleProduct;
