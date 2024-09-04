import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import DriverHeader from './Common/DriverHeader';
import Footer from './Common/Footer';

const DriverLayout = () => {
  const userRole = localStorage.getItem("userRole");
  const isAuthenticated = !!localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (userRole !== "driver") {
    return <Navigate to="/error" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DriverHeader />
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DriverLayout;
