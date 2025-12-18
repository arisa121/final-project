import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../../hook/useAuth";

const Navbar = () => {
  const { user, logOut, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut();
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-primary font-semibold"
      : "text-base-content hover:text-primary";

  const handleMobileNavClick = () => {
    // Close dropdown by removing focus
    document.activeElement.blur();
  };

  return (
    <div className="container-responsive navbar shadow-md px-3 sm:px-4 lg:px-6 sticky top-0 z-50 mb-6 sm:mb-8 lg:mb-10 bg-base-100">
      {/* Left */}
      <div className="navbar-start">
        <Link to="/" className="flex items-center gap-1.5 sm:gap-2">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg"
          />
          <span className="text-base sm:text-lg lg:text-xl font-bold tracking-wide">
            IssueTracker
          </span>
        </Link>
      </div>

      {/* Center Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-1 lg:gap-2">
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

      {/* Right */}
      <div className="navbar-end space-x-2 sm:space-x-3">
        {/* Mobile Menu Dropdown */}
        <div className="dropdown dropdown-end lg:hidden">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-sm sm:btn-md btn-square"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6"
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
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-[60]"
          >
            <li onClick={handleMobileNavClick}>
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
            </li>
            <li onClick={handleMobileNavClick}>
              <NavLink to="/all-issues" className={navLinkClass}>
                All Issues
              </NavLink>
            </li>
            <li onClick={handleMobileNavClick}>
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
            </li>
            <li onClick={handleMobileNavClick}>
              <NavLink to="/contact" className={navLinkClass}>
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        {!user ? (
          <>
            <Link to="/login" className="btn btn-outline btn-xs sm:btn-sm">
              Login
            </Link>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-8 sm:w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user?.photo || ""} alt="User" />
              </div>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-48 sm:w-52 z-[60]"
            >
              <li className="px-3 py-1 text-xs sm:text-sm font-semibold text-gray-600 break-all">
                {user?.name}
              </li>

              <li>
                <Link
                  to={
                    role === "admin"
                      ? "/admin"
                      : role === "staff"
                      ? "/staff"
                      : "/citizen"
                  }
                  className="text-xs sm:text-sm"
                >
                  Dashboard
                </Link>
              </li>

              <div className="divider my-1"></div>

              <li>
                <button
                  onClick={handleLogout}
                  className="text-error font-medium text-xs sm:text-sm"
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