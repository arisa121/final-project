import { createBrowserRouter } from "react-router";
import RootLayout from "../LayOut/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../LayOut/AuthLayout/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import StaffDashboard from "../dashboards/staff/StaffDashboard";
import AdminDashboard from "../dashboards/admin/AdminDashboard";
import ReportIssue from "../dashboards/citizen/ReportIssue";
import MyIssues from "../dashboards/citizen/MyIssues";
import CitizenProfile from "../dashboards/citizen/CitizenProfile";
import AssignedIssues from "../dashboards/staff/AssignedIssues";
import StaffProfile from "../dashboards/staff/StaffProfile";
import AllIssuesAdmin from "../dashboards/admin/AllIssuesAdmin";
import ManageUsers from "../dashboards/admin/ManageUsers";
import ManageStaff from "../dashboards/admin/ManageStaff";
import Payments from "../dashboards/admin/Payments";
import AdminProfile from "../dashboards/admin/AdminProfile";
import StaffDashboardLayout from "../dashboards/staff/StaffDashboardLauout";
import AdminDashboardLayout from "../dashboards/admin/AdminDashboardLayout";
import CitizenDashboard from "../dashboards/citizen/CitizenDashboard";
import CitizenDashboardLayout from "../dashboards/citizen/CitizenDashboardLayout";
import AllIssues from "../pages/AllIssues/AllIssues";
import IssueDetails from "../pages/IssueDetails/IssueDetails";
import AboutUs from "../pages/Home/AboutUs/AboutUs";
import Contact from "../pages/Home/Contact/Contact";
import NotFound from "../pages/NotFound";
import MyPayments from "../dashboards/citizen/MyPayments";
import StaffRoute from "./StaffRoute";
import AdminRoute from "./AdminRoute";





export const router = createBrowserRouter([
  // Error element 
  {
    path: "*",
    element:<NotFound></NotFound>
  },
  // Public Layout Routes
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/all-issues",
        element: <AllIssues></AllIssues>,
      },
      {
        path: "/about",
        element:<AboutUs></AboutUs>
      },
      {
        path: "/contact",
        element:<Contact></Contact>
      },
    ],
  },

  // Auth Layout Routes (Login, Register)
  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    children: [
      { path: "login", element: <Login></Login> },
      { path: "register", element: <Register></Register> },
    ],
  },
  // Issues Details(Private Routes)
  {
    path: "/issue-details/:id",
    element: (
      <PrivateRoute>
        <IssueDetails></IssueDetails>
      </PrivateRoute>
    )
  },

  // ------------------------------
  // Citizen Dashboard (Private)
  // ------------------------------
  {
    path: "/citizen",
    element: (
      <PrivateRoute>
        <CitizenDashboardLayout></CitizenDashboardLayout>
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <CitizenDashboard></CitizenDashboard>},
      { path: "my-issues", element: <MyIssues></MyIssues>},
      { path: "report-issue", element: <ReportIssue></ReportIssue> },
      { path: "profile", element: <CitizenProfile></CitizenProfile> },
      { path:"mypayments",element:<MyPayments></MyPayments> },
    ],
  },

  // ------------------------------
  // Staff Dashboard
  // ------------------------------
  {
    path: "/staff",
    element: (
      <StaffRoute>
        <StaffDashboardLayout></StaffDashboardLayout>
      </StaffRoute>
    ),
    children: [
      { index: true, element: <StaffDashboard></StaffDashboard>},
      { path: "assigned-issues", element: <AssignedIssues></AssignedIssues> },
      { path: "profile", element: <StaffProfile></StaffProfile> },
    ],
  },

  // ------------------------------
  // Admin Dashboard
  // ------------------------------
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminDashboardLayout></AdminDashboardLayout>
      </AdminRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard></AdminDashboard> },
      { path: "all-issues", element: <AllIssuesAdmin></AllIssuesAdmin> },
      { path: "manage-users", element: <ManageUsers></ManageUsers> },
      { path: "manage-staff", element: <ManageStaff></ManageStaff> },
      { path: "payments", element: <Payments></Payments> },
      { path: "profile", element: <AdminProfile></AdminProfile> },
    ],
  },
]);

