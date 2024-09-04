import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../CommonPages/Common/Navbar";
import Footer from "../CommonPages/Common/Footer";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
