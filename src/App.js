import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import BookList from './pages/BookList';
import Categories from './pages/Categories';
import BorrowedBooks from './pages/BorrowedBooks';
import ReservedBooks from './pages/ReservedBooks';


const App = () => {
  return (
   
      <Routes>
        <Route path="/" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/categories" element={<PrivateRoute><Categories /></PrivateRoute>} />
        <Route path="/book-list" element={<PrivateRoute><BookList /></PrivateRoute>} />
        <Route path="/borrowed-books" element={<PrivateRoute><BorrowedBooks /></PrivateRoute>} />
        <Route path="/reserved-books" element={<PrivateRoute><ReservedBooks /></PrivateRoute>} />
        

      </Routes>
   
  );
};

export default App;
