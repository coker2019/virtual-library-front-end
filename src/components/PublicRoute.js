import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children, restricted }) => {
  const isAuthenticated = !!localStorage.getItem("token"); // Simulated auth check
  return isAuthenticated && restricted ? <Navigate to="/" /> : children;
};

export default PublicRoute;
