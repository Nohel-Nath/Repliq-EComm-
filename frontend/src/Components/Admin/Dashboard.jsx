import React, { useEffect } from "react";
import "./dasboard.css";

import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProduct, getAllUsers } from "../../Actions/UserAction";
import { Link } from "react-router-dom";

function Dashboard() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.allUser);
  const { products } = useSelector((state) => state.adminProducts);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAdminProduct());
  }, [dispatch]);

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboardSummaryBox2">
        <Link to="/admin/products">
          <p>Product</p>
          <p>{products && products.productsCount}</p>
        </Link>

        <Link to="/admin/users">
          <p>Users</p>
          <p>{users && users.length}</p>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
