// src/App.jsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes/routes";
import { AuthProvider } from "./Context/AuthContext"; // Import AuthProvider

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider> {/* Wrap AppRoutes with AuthProvider */}
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
