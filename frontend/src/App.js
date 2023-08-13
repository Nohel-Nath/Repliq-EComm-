import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Header/Navbar";
import Home from "./Components/Home/Home";
import SingleProduct from "./Components/SingleProduct/SingleProduct";
import Cart from "./Components/Cart/Cart";
import Login from "./Components/User/Login/Login";
import Account from "./Components/User/Account/Account";
import Register from "./Components/User/Register/Register";
import Dashboard from "./Components/Admin/Dashboard";
import AllUsers from "./Components/Admin/AllUsers";
import AdminProducts from "./Components/Admin/AdminProducts";
import CreateProduct from "./Components/Admin/CreateProduct";
import UpdateProduct from "./Components/Admin/UpdateProduct";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/single/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/users" element={<AllUsers />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/newProduct" element={<CreateProduct />} />
        <Route path="/admin/updateProducts/:id" element={<UpdateProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
