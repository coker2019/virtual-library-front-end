import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/categories');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <form className="bg-gray-200 shadow-md px-8 pt-6 pb-8 m-4 md:w-[40%]" onSubmit={handleSubmit}>
        <h1 className="text-xl font-bold text-center mb-4">Login Your Account</h1>
        {error && <p className="text-red-500">{error}</p>}
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
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
          value={credentials.password}
          onChange={handleChange}
          className="mb-2 p-2 border font-normal rounded-full w-full"
        />
        <button type="submit" className="bg-customGreen shadow-md p-2 border font-semibold mt-5 rounded-full w-full-500 text-white w-full">
          {loading ? 'Loading...' : 'Login'}
        </button>
        <p className='my-5'>
          <Link to='/' className='cursor-pointer text-primaryGreen ml-2'>
            Forgot Password?
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
