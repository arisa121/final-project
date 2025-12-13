
import { NavLink, Outlet } from "react-router";
import { FaChartPie, FaHome, FaListAlt, FaMoneyBill, FaUserShield } from "react-icons/fa";


const CitizenDashboardLayout = () => {
   const navItem =
     "flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-green-100 transition cursor-pointer";
   const activeClass = "bg-green-500 text-white font-semibold";
//   if (isLoading) return <p className="p-10 text-center">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-5 space-y-6 hidden md:block">
        <h2 className="text-xl font-bold text-green-600">Citizen Panel</h2>

        <nav className="space-y-3">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${navItem} ${isActive ? activeClass : ""}`
            }
          >
            <FaChartPie /> Overview
          </NavLink>

          <NavLink
            to="/dashboard/my-issues"
            className={({ isActive }) =>
              `${navItem} ${isActive ? activeClass : ""}`
            }
          >
            <FaListAlt /> My Issues
          </NavLink>
          <NavLink
            to="/dashboard/report-issue"
            className={({ isActive }) =>
              `${navItem} ${isActive ? activeClass : ""}`
            }
          >
            <FaUserShield /> Report New Issue
          </NavLink>

          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `${navItem} ${isActive ? activeClass : ""}`
            }
          >
            <FaMoneyBill />
            My Profile
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${navItem} ${isActive ? activeClass : ""}`
            }
          >
            <FaHome />
            Home
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default CitizenDashboardLayout;
