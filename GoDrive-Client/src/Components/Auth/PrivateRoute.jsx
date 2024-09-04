import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, role, ...rest }) => {
  const userRole = localStorage.getItem("userRole"); 
  const isAuthenticated = !!localStorage.getItem("token"); 

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/error" />; 
  }

  return element;
};

export default PrivateRoute;
