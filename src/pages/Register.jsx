import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/slices/authSlice';
import { Link } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({ username: '', email: '', password: '' });
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(userData));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-gray-200 shadow-md px-8 pt-6 pb-8 m-4 w-full max-w-xs" onSubmit={handleSubmit}>
        <h1  className="text-xl font-bold text-center mb-4">Register</h1>
        {error && <p className="text-red-500">{error}</p>}
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        Username
      </label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={userData.username}
          onChange={handleChange}
          className="mb-2 p-2 border font-normal rounded-full w-full"
        />
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Email
      </label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleChange}
          className="mb-2 p-2 border font-normal rounded-full w-full"
        />
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleChange}
          className="mb-2 p-2 border font-normal rounded-full w-full"
        />
        <button type="submit" className="bg-customGreen shadow-md p-2 border font-semibold mt-5 rounded-full
         w-full-500 text-white  w-full">
          {loading ? 'Loading...' : 'Register'}
        </button>
        <p className='my-5'>
                      Already have an account?
                      <Link
                        to='/login'
                        className='cursor-pointer text-primaryGreen ml-2'
                      >
                        Sign In
                      </Link>
                    </p>
      </form>
    </div>
  );
};

export default Register;
