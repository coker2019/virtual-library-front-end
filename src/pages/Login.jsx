import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/categories");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="bg-library-pattern bg-cover bg-center bg-no-repeat flex justify-center items-center  min-h-screen bg-white ">
      <div className="bg-[#f4f4f990] p-6 w-[80vw] lg:w-[30vw] md:w-[50vw] sm:w-[30vw] shadow-lg animate-fade-left animate-once">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <h1 className="text-xl font-bold text-center mb-4">
            Login Your Account
          </h1>
          {error && <p className="text-red-500">{error}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            className="mb-2 p-2 border font-normal rounded-full w-full"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            className="mb-2 p-2 border font-normal rounded-full w-full"
          />
          <button
            type="submit"
            className="bg-customGreen shadow-md p-2 border font-semibold mt-5 rounded-full w-full-500 text-white w-full">
            {loading ? "Loading..." : "Login"}
          </button>
          <div className="flex justify-between">
            <p className="my-5">
              <Link to="#" className="cursor-pointer text-primaryGreen ml-2">
                Forgot Password?
              </Link>
            </p>

            <p className="my-5">
              <Link
                to="/register"
                className="cursor-pointer text-primaryGreen ml-2">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
