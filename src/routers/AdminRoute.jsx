import React from 'react';
import { Navigate, useLocation } from "react-router";
import useAuth from "../hook/useAuth";

const AdminRoute = ({children}) => {
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

 if (role !== "admin") {
   return (
     <Navigate
       to="/unauthorized"
       state={{ message: "Admin access required" }}
       replace
     />
   );
 }

 return children;
};

export default AdminRoute;