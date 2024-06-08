import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import BookDetails from './pages/BookDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Header from './components/Header';


const App = () => {
  return (
   
      <Routes>
        <Route path="/" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/book/:id" element={<PrivateRoute><BookDetails /></PrivateRoute>} />
        <Route path="/header" element={<PrivateRoute><Header /></PrivateRoute>} />
        

      </Routes>
   
  );
};

export default App;
