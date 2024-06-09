import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/slices/authSlice';
import { Link } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({ email: '', password: '', confirmPassword: '' });
  const [passwordError, setPasswordError] = useState('');
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    setPasswordError('');
    dispatch(registerUser({
     
      email: userData.email,
      password: userData.password,
    }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <form className="bg-gray-200 shadow-md px-8 pt-6 pb-8 m-4 md:w-[40%]" onSubmit={handleSubmit}>
        <h1 className="text-xl font-bold text-center mb-4">Register</h1>
        {error && <p className="text-red-500">{error}</p>}
        {passwordError && <p className="text-red-500">{passwordError}</p>}
    
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
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
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
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
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={userData.confirmPassword}
          onChange={handleChange}
          className="mb-2 p-2 border font-normal rounded-full w-full"
        />
        <button type="submit" className="bg-customGreen shadow-md p-2 border font-semibold mt-5 rounded-full text-white w-full">
          {loading ? 'Loading...' : 'Register'}
        </button>
        <p className="my-5">
          Already have an account?
          <Link to="/login" className="cursor-pointer text-primaryGreen ml-2">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
