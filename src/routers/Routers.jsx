import { createBrowserRouter } from "react-router";
import RootLayout from "../LayOut/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../LayOut/AuthLayout/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";

export const router = createBrowserRouter([
  {
    path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                path: '/',
                Component:Home
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
