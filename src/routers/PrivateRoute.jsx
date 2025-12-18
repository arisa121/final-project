import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hook/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading, isBlocked } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-teal-500"></span>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Check if user is blocked
  if (isBlocked) {
    return <Navigate to="/blocked" replace />;
  }

  // Check if user is authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is authenticated and not blocked
  return children;
};

export default PrivateRoute;