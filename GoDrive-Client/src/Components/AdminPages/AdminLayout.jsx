import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom'; 
import Sidebar from '../AdminPages/Common/Sidebar';
import Header from '../AdminPages/Common/Header';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const userRole = localStorage.getItem("userRole");
  const isAuthenticated = !!localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  if (userRole !== "admin") {
    return <Navigate to="/error" />;
  }

  return (
    <div className="flex h-full">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex flex-col flex-grow">
        <Header />
        <main className="flex-grow p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
