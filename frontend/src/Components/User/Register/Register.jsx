import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearErrors, registerAUser } from "../../../Actions/UserAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();
  const history = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // Name validation
    if (name.trim() === "") {
      toast.error("Name is required!", {
        position: "top-center",
      });
      return;
    } else if (name.length < 4 || name.length > 30) {
      toast.error("Name must be between 4 and 30 characters!", {
        position: "top-center",
      });
      return;
    }

    // Email validation
    if (email.trim() === "") {
      toast.error("Email is required!", {
        position: "top-center",
      });
      return;
    }

    // Password validation
    if (password.trim() === "") {
      toast.error("Password is required!", {
        position: "top-center",
      });
      return;
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!", {
        position: "top-center",
      });
      return;
    }

    // Phone validation
    if (phone.trim() === "") {
      toast.error("Phone number is required!", {
        position: "top-center",
      });
      return;
    } else if (phone.length !== 11) {
      toast.error("Phone number must be exactly 11 digits", {
        position: "top-center",
      });
      return;
    }

    dispatch(registerAUser(name, email, password, avatar, phone));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-center",
      });
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      toast.success("Login successful", {
        position: "top-center",
      });

      history("/"); // Redirect to account page if authenticated
    }
  }, [dispatch, error, history, isAuthenticated]);

  return (
    <div className="register flex justify-center items-center h-screen bg-gray-100">
      <form
        className="registerForm bg-white p-8 rounded shadow-md"
        onSubmit={submitHandler}
      >
        <h3 className="text-3xl mb-4">Register</h3>

        <div className="mb-4">
          {avatar && (
            <img
              src={avatar}
              alt="User"
              className="h-40 w-40 rounded-full mx-auto"
            />
          )}
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <div className="mb-4 border p-4 rounded">
          <input
            type="text"
            value={name}
            placeholder="Name"
            name="name"
            className="registerInputs w-full"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4 border p-4 rounded">
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="registerInputs w-full"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4 border p-4 rounded">
          <input
            type="password"
            className="registerInputs w-full"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-4 border p-4 rounded">
          <input
            type="tel"
            className="registerInputs w-full"
            placeholder="018..."
            name="phone"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <Link
          to="/login"
          className="block text-center mt-4 text-blue-500 hover:underline"
        >
          Already Signed Up? Login Now
        </Link>

        <button
          className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
          type="submit"
        >
          Sign Up
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
