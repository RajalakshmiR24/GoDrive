import React from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import Header from '../UserPages/Pages/Common/Header';

const UserLayout = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  const isAuthenticated = !!localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (userRole !== "user") {
    return <Navigate to="/error" />;
  }



  return (
    <div> 
      <Header />
      <Outlet />
    </div>
  );
};

export default UserLayout;
