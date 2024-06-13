import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";
import { Link } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError("");
    dispatch(
      registerUser({
        email: userData.email,
        password: userData.password,
      })
    );
  };

  return (
    <div className="bg-library-pattern bg-cover bg-center bg-no-repeat flex justify-center items-center  min-h-screen bg-white">
      <div className=" bg-[#f4f4f990] p-6 w-[80vw] lg:w-[30vw] md:w-[50vw] sm:w-[30vw] shadow-lg animate-fade-left animate-once">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <h1 className="text-xl font-bold text-center mb-4">Register</h1>
          {error && <p className="text-red-500">{error}</p>}
          {passwordError && <p className="text-red-500">{passwordError}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
            className="p-2 border font-normal rounded-full w-full"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleChange}
            className="p-2 border font-normal rounded-full w-full"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={userData.confirmPassword}
            onChange={handleChange}
            className="p-2 border font-normal rounded-full w-full"
          />
          <div className="flex justify-start">
            <label htmlFor="admin" className="mr-2 text-primaryGreen font-bold">
              as Admin ?
            </label>
            <input
              type="checkbox"
              name="admin"
              id=""
              className="form-checkbox bg-red-500 text-primaryGreen focus:ring-primaryGreen focus:ring-2 rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-customGreen shadow-md p-2 border font-semibold rounded-full text-white w-full">
            {loading ? "Loading..." : "Register"}
          </button>
          <p className="my-5">
            Already have an account?
            <Link to="/login" className="cursor-pointer text-primaryGreen ml-2">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
