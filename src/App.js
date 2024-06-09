import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Header from './components/Header';
import Categories from './pages/Categories';


const App = () => {
  return (
   
      <Routes>
        <Route path="/" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/categories" element={<PrivateRoute><Categories /></PrivateRoute>} />
        <Route path="/header" element={<PrivateRoute><Header /></PrivateRoute>} />
        

      </Routes>
   
  );
};

export default App;
