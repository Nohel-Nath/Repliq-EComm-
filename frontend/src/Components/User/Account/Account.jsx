import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDetails, logout } from "../../../Actions/UserAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function Account() {
  const history = useNavigate();
  const dispatch = useDispatch();

  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUserDetails());
    }
  }, []);

  const handleLogout = async () => {
    dispatch(logout());
    toast.success("Logout Successful", {
      position: "top-center",
    });

    history("/login");
  };

  return (
    <div className="flex flex-col items-center p-4">
      {user && user.user ? (
        <div className="mb-4">
          <img
            src={user.user.avatar.url}
            alt="User"
            className="w-16 h-16 rounded-full"
          />
          <p>
            <strong>Name:</strong> {user.user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.user.phone}
          </p>
          <p>
            <strong>Role:</strong> {capitalizeFirstLetter(user.user.role)}
          </p>
        </div>
      ) : null}
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
      >
        Logout
      </button>
      <ToastContainer />
    </div>
  );
}

export default Account;
