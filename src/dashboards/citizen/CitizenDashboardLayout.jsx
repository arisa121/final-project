// import { useState } from "react";
// import { Link, Outlet, useLocation, useNavigate } from "react-router";
// import Swal from "sweetalert2";
// import useAuth from "../../hook/useAuth";

// const CitizenDashboardLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user, logOut } = useAuth();

//   const handleLogout = () => {
//     Swal.fire({
//       title: "Logout?",
//       text: "Are you sure you want to logout?",
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, Logout",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         logOut();
//         navigate("/login");
//       }
//     });
//   };

//   const menuItems = [
//     {
//       path: "/citizen",
//       icon: (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-5 w-5"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
//           />
//         </svg>
//       ),
//       label: "Dashboard",
//     },
//     {
//       path: "/citizen/my-issues",
//       icon: (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-5 w-5"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
//           />
//         </svg>
//       ),
//       label: "My Issues",
//     },
//     {
//       path: "/citizen/report-issue",
//       icon: (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           className="h-5 w-5"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
//           />
//         </svg>
//       ),
//       label: "Report New Issue",
//     },
//     {
//       path: "/citizen/profile",
//       icon: (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-5 w-5"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//           />
//         </svg>
//       ),
//       label: "My Profile",
//     },
//     {
//       path: "/",
//       icon: (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-5 w-5"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75H3.75A.75.75 0 013 21V9.75z"
//           />
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M9 21V12h6v9"
//           />
//         </svg>
//       ),
//       label: "Home",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       {/* Sidebar */}
//       <aside
//         className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } bg-gradient-to-b from-green-600 to-green-800 text-white shadow-2xl w-64 lg:w-72`}
//       >
//         {/* Logo */}
//         <div className="h-20 flex items-center justify-center border-b border-green-500/30">
//           <div className="text-center">
//             <h1 className="text-2xl font-bold">Citizen Panel</h1>
//           </div>
//         </div>

//         {/* Menu Items */}
//         <nav className="p-4 space-y-2">
//           {menuItems.map((item) => (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
//                 location.pathname === item.path
//                   ? "bg-white text-green-600 shadow-lg"
//                   : "text-white hover:bg-green-700/50"
//               }`}
//             >
//               {item.icon}
//               <span className="font-medium">{item.label}</span>
//             </Link>
//           ))}

//           {/* Logout Button */}
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-white hover:bg-red-500/50 transition-all mt-4"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//               />
//             </svg>
//             <span className="font-medium">Logout</span>
//           </button>
//         </nav>

//         {/* citizen Info */}
//         <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-green-500/30">
//           <div className="flex items-center gap-3">
//             <div className="avatar">
//               <div className="w-10 h-10 rounded-full ring ring-white ring-offset-2 ring-offset-green-600">
//                 <img src={user?.photo} alt={user?.name} />
//               </div>
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="text-sm font-semibold truncate">{user?.name}</p>
//               <p className="text-xs text-green-200 truncate">{user?.email}</p>
//             </div>
//           </div>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <div className={`transition-all ${sidebarOpen ? "ml-[270px]" : "ml-0"}`}>
//         {/* Top Navbar */}
//         <header className="h-16 lg:h-20 bg-white shadow-md flex items-center justify-between px-3 sm:px-6">
//           {/* Menu Toggle */}
//           <button
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="btn btn-ghost btn-circle"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             </svg>
//           </button>

//           {/* Page Title */}
//           <div>
//             <h2 className="text-base sm:text-xl font-bold text-gray-800">
//               {menuItems.find((item) => item.path === location.pathname)
//                 ?.label || "Dashboard"}
//             </h2>
//           </div>

//           {/* Right Side Actions */}
//           <div className="flex items-center gap-4">
//             <button className="btn btn-ghost btn-circle lg:hidden">
//               <div className="indicator">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
//                   />
//                 </svg>
//                 <span className="badge badge-xs badge-error indicator-item"></span>
//               </div>
//             </button>

//             {/* citizen avatea */}
//             <div className="avatar">
//               <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full ring ring-green-500 ring-offset-2">
//                 <img src={user?.photo} alt={user?.name} />
//               </div>
//             </div>
//           </div>
//         </header>
//         <main className="p-6">
//           <Outlet />
//         </main>
//       </div>

//       {/* Mobile Overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-30 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         ></div>
//       )}
//     </div>
//   );
// };

// export default CitizenDashboardLayout;


import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hook/useAuth";

const CitizenDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut();
        navigate("/login");
      }
    });
  };

  const menuItems = [
    {
      path: "/citizen",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      label: "Dashboard",
    },
    {
      path: "/citizen/my-issues",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      ),
      label: "My Issues",
    },
    {
      path: "/citizen/report-issue",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      ),
      label: "Report New Issue",
    },
    {
      path: "/citizen/profile",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      label: "My Profile",
    },
    {
      path: "/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75H3.75A.75.75 0 013 21V9.75z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 21V12h6v9"
          />
        </svg>
      ),
      label: "Home",
    },
  ];

  const closeSidebar = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-gradient-to-b from-green-600 to-green-800 text-white shadow-2xl w-64 lg:w-72 lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="h-16 lg:h-20 flex items-center justify-between px-4 border-b border-green-500/30">
          <div className="text-center flex-1">
            <h1 className="text-xl lg:text-2xl font-bold">Citizen Panel</h1>
          </div>
          {/* Close button for mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:bg-green-700 p-2 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-3 lg:p-4 space-y-1 lg:space-y-2 overflow-y-auto h-[calc(100vh-180px)] lg:h-[calc(100vh-200px)]">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeSidebar}
              className={`flex items-center gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg transition-all ${
                location.pathname === item.path
                  ? "bg-white text-green-600 shadow-lg"
                  : "text-white hover:bg-green-700/50"
              }`}
            >
              {item.icon}
              <span className="font-medium text-sm lg:text-base">
                {item.label}
              </span>
            </Link>
          ))}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg w-full text-white hover:bg-red-500/50 transition-all mt-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="font-medium text-sm lg:text-base">Logout</span>
          </button>
        </nav>

        {/* User Info */}
        <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4 border-t border-green-500/30 bg-gradient-to-b from-transparent to-green-900/20">
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="avatar">
              <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full ring ring-white ring-offset-2 ring-offset-green-600">
                <img src={user?.photo} alt={user?.name} />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs lg:text-sm font-semibold truncate">
                {user?.name}
              </p>
              <p className="text-[10px] lg:text-xs text-green-200 truncate">
                {user?.email}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-72">
        {/* Top Navbar */}
        <header className="h-14 lg:h-20 bg-white shadow-md flex items-center justify-between px-3 sm:px-4 lg:px-6 sticky top-0 z-30">
          {/* Menu Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Page Title */}
          <div className="flex-1 px-2 sm:px-4">
            <h2 className="text-sm sm:text-base lg:text-xl font-bold text-gray-800 truncate">
              {menuItems.find((item) => item.path === location.pathname)
                ?.label || "Dashboard"}
            </h2>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
            {/* Notification Bell */}
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 lg:h-6 lg:w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Avatar */}
            <div className="avatar">
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full ring ring-green-500 ring-offset-2">
                <img src={user?.photo} alt={user?.name} />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-3 sm:p-4 lg:p-6 min-h-[calc(100vh-56px)] lg:min-h-[calc(100vh-80px)]">
          <Outlet />
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default CitizenDashboardLayout;