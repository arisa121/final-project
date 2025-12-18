import { useLocation } from "react-router";
import useAuth from "../hook/useAuth";
import React from 'react';

const StaffRoute = ({children}) => {
      const { user, role, loading, isBlocked } = useAuth();
      const location = useLocation();

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

      if (isBlocked) {
        return <Navigate to="/blocked" replace />;
      }

      if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
      }

      if (role !== "staff") {
        return (
          <Navigate
            to="/unauthorized"
            state={{ message: "Staff access required" }}
            replace
          />
        );
      }

      return children;
};

export default StaffRoute;