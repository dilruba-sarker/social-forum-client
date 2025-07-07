import React, { use } from 'react';
import logo from "../../assets/Untitled (150 x 150 px) (5).png";
import { Link, NavLink } from 'react-router'; // FIXED
// adjust if needed
import { FaUserCircle } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logOut } = use(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => console.log("Logged out"))
      .catch((err) => console.error(err));
  };

  const links = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/membership">Membership</NavLink></li>
      <li><NavLink to="/notifications">Notification</NavLink></li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round"
                strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>
        <img src={logo} alt="logo" className="w-28 h-20" />
      </div>

      {/* Desktop Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>

      {/* Right Side - Auth */}
      <div className="navbar-end">
        {!user?.email ? (
          <Link to="/login">
            <button className="btn btn-primary">Join Us</button>
          </Link>
        ) : (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="user profile" />
                ) : (
                  <FaUserCircle size={40} />
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li><p className="font-semibold">{user.displayName || "User"}</p></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li>
                <button onClick={handleLogout} className="text-red-500">
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
