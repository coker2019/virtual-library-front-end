import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookList from "./pages/BookList";
import Categories from "./pages/Categories";
import BorrowedBooks from "./pages/BorrowedBooks";
import ReservedBooks from "./pages/ReservedBooks";
import Splash from "./pages/Splash";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/layout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/categories" element={<Categories />} />
          <Route path="/book-list" element={<BookList />} />
          <Route path="/borrowed-books" element={<BorrowedBooks />} />
          <Route path="/reserved-books" element={<ReservedBooks />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
