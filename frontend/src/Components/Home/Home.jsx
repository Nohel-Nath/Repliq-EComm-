import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css"; // Import your custom CSS file for styling
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://repliq-ecomm.onrender.com/product/allLatest"
        );
        setProducts(response.data.products); // Update to response.data.products
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      {products.map((product) => (
        <div
          key={product._id}
          className="product-item p-4 w-1/3 flex flex-col items-center"
        >
          <img
            src={product.images[0].url}
            alt={product.name}
            className="w-40 h-40 object-cover"
          />

          <Link to={`/single/${product._id}`}>
            <h2 className="mt-2 text-xl font-semibold underline">
              {product.name}
            </h2>
          </Link>
          <p className="mt-1 text-gray-600">{product.category}</p>
          <p className="mt-1 text-blue-500 font-bold">${product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
