
import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../../hook/useAuth";


const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut();
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-primary font-semibold"
      : "text-base-content hover:text-primary";

  return (
    <div className="navbar bg-base-100 shadow-md px-4 sticky top-0 z-50 mb-10">
      {/* ✅ Left - Logo + Website Name */}
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
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
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>

          {/* ✅ Mobile Menu */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/all-issues" className={navLinkClass}>
                All Issues
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={navLinkClass}>
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="w-9 h-9 rounded-lg" />
          <span className="text-xl font-bold tracking-wide">IssueTracker</span>
        </Link>
      </div>

      {/* ✅ Center - Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2">
          <li>
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/all-issues" className={navLinkClass}>
              All Issues
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>

      {/* ✅ Right - Auth/Profile */}
      <div className="navbar-end space-x-3">
        {!user ? (
          <>
            <Link to="/login" className="btn btn-outline btn-sm">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm text-white">
              Register
            </Link>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={user?.photoURL || "https://i.ibb.co/2yZqjWQ/user.png"}
                  alt="User"
                />
              </div>
            </label>

            {/* ✅ Dropdown Menu */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="px-3 py-1 text-sm font-semibold text-gray-600">
                {user?.displayName || "User"}
              </li>

              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>

              <div className="divider my-1"></div>

              <li>
                <button
                  onClick={handleLogout}
                  className="text-error font-medium"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
