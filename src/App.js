import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookList from "./pages/BookList";
import Categories from "./pages/Categories";
import BorrowedBooks from "./pages/BorrowedBooks";
import ReservedBooks from "./pages/ReservedBooks";
import Splash from "./pages/Splash";
import PrivateRoute from "./pages/PrivateRoute";
import Layout from "./components/layout";
import { resetUserState } from "./redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode"; // Remove the curly braces

const App = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const isExpired = decodedToken.exp * 1000 < Date.now();

        if (isExpired) {
          localStorage.removeItem("token");
          localStorage.removeItem("currentUser");
          dispatch(resetUserState());
          navigate("/login");
        }
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
        dispatch(resetUserState());
        navigate("/login");
      }
    }
  }, [dispatch, navigate, token]);

  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/categories" element={<Categories />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/borrowed-books" element={<BorrowedBooks />} />
          <Route path="/reserved-books" element={<ReservedBooks />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
