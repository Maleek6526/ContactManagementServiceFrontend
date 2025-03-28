import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../components/LandingPage";
import Login from "../components/Login";
import Register from "../components/Register";
import Dashboard from "../components/DashboardPage";
import GuestDashboard from "../components/GuestDashboard";

// 🔹 Check if User is Logged In
const isAuthenticated = () => {
  return localStorage.getItem("user");
};

// 🔹 Protected Route (For Logged-in Users)
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<LandingPage />} />
      <Route path="/guest" element={<GuestDashboard />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
