import { createBrowserRouter } from "react-router";
import RootLayout from "../LayOut/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../LayOut/AuthLayout/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import CitizenDashboard from "../dashboards/citizen/CitizenDashboard";
import StaffRoute from "./StaffRoute";
import StaffDashboard from "../dashboards/staff/StaffDashboard";
import AdminRoute from "./AdminRoute";
import AdminDashboard from "../dashboards/admin/AdminDashboard";

export const router = createBrowserRouter([
    // Public Routes
  {
    path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                path: '/',
                Component:Home
            },
            // Citizen Dashboard(Private)
            {
                path: "/dashboard",
                element: (
                    <PrivateRoute>
                        <CitizenDashboard></CitizenDashboard>
                    </PrivateRoute>
                )
                
            },
            // Staff Dashboard 
            {
                path: "/staff-dashboard",
                element: (
                    <StaffRoute>
                        <StaffDashboard></StaffDashboard>
                    </StaffRoute>
                )
            },
            // Admin Dashboard(Only Admin)
            {
                path: "/admin-dashboard",
                element: (
                    <AdminRoute>
                        <AdminDashboard></AdminDashboard>
                    </AdminRoute>
                )
            },
        ],
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component:Login,
            },
            {
                path: 'register',
                Component:Register,
            }
        ]
    }
]);
