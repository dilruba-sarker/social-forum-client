// import React, { use } from 'react';
// import logo from "../../assets/Untitled (150 x 150 px) (5).png";
// import { Link, NavLink, useNavigate } from 'react-router'; // FIXED
// // adjust if needed
// import { FaUserCircle } from 'react-icons/fa';
// import { AuthContext } from '../../context/AuthContext';
// import CountAnnouncement from '../CountAnnouncement';

// const Navbar = () => {
//   const { user, logOut } = use(AuthContext);
// const navigate =useNavigate()
 
// const handleLogout = () => {
//   logOut()
//     .then(() => {
//       localStorage.removeItem("access-token"); // ✅ Remove token
//       navigate("/"); // or homepage
//     })
//     .catch((error) => {
//       console.error("Logout failed:", error);
//     });
// };
//   const links = (
//     <>
//       <li className='text-xl font-bold  mr-1'><NavLink to="/" className={({ isActive }) =>
//       isActive ? "bg-blue-500 text-white px-3 py-1 rounded" : "px-3 py-1"
//     }>Home</NavLink></li>
//       <li className='text-xl font-bold '><NavLink to="/membership"
      
//       className={({ isActive }) =>
//       isActive ? "bg-blue-500 text-white px-3 py-1 rounded" : "px-3 py-1"
//     }>Membership</NavLink></li>
      
//     </>
//   );

//   return (
//     <div className="navbar bg-red-100 shadow-sm px-4 static z-1000">
//       <div className="navbar-start">
//         {/* Mobile Dropdown */}
//         <div className="dropdown">
//           <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
//               viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round"
//                 strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
//             </svg>
//           </div>
//           <ul
//             tabIndex={0}
//             className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
//             {links}
//           </ul>
//         </div>
//         <img src={logo} alt="logo" className="w-28 h-20" />


       
//       </div>

//       {/* Desktop Links */}
//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1">
//           {links}
//         </ul>
//       </div>
// <CountAnnouncement></CountAnnouncement>


//       {/* Right Side - Auth */}
//       <div className="navbar-end">
//         {user?.badge && (
 
//     <p className="text-sm font-semibold text-yellow-600 mr-4">
//       🏅 {user.badge} Badge
//     </p>
 
// )}
//         {!user?.email ? (
//           <Link to="/login">
//             <button className="btn btn-primary">Join Us</button>
//           </Link>
//         ) : (
//           <div className="dropdown dropdown-end">
//             <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
//               <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
//                 {user?.photoURL ? (
//                   <img src={user.photoURL} alt="user profile" />
//                 ) : (
//                   <FaUserCircle size={40} />
//                 )}
//               </div>
//             </div>
//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow bg-base-100 rounded-box w-52"
//             >
//               <li><p className="font-semibold">{user.displayName || "User"}</p></li>
//               <li><Link to="/dashboard">Dashboard</Link></li>
//               <li>
//                 <button onClick={handleLogout} className="text-red-500">
//                   Logout
//                 </button>
//               </li>
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;
import React, { use } from 'react';
import logo from "../../assets/Untitled (150 x 150 px) (5).png";
import { Link, NavLink, useNavigate } from 'react-router'; // ✅ FIXED for React Router DOM
import { FaUserCircle } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import CountAnnouncement from '../CountAnnouncement';

const Navbar = () => {
  const { user, logOut } = use(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => {
        localStorage.removeItem("access-token");
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  const links = (
    <>
      <li className="text-xl font-bold mr-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "bg-blue-500 text-white px-3 py-1 rounded" : "px-3 py-1"
          }
        >
          Home
        </NavLink>
      </li>
      <li className="text-xl font-bold">
        <NavLink
          to="/membership"
          className={({ isActive }) =>
            isActive ? "bg-blue-500 text-white px-3 py-1 rounded" : "px-3 py-1"
          }
        >
          Membership
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-red-100 shadow-sm px-4 sticky top-0 z-50">
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50"
          >
            {links}
          </ul>
        </div>

        {/* Logo */}
        <img src={logo} alt="logo" className="w-28 h-20" />
      </div>

      {/* Desktop Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <CountAnnouncement />

      {/* Right Side - Auth */}
      <div className="navbar-end">
        {user?.badge && (
          <p className="text-sm font-semibold text-yellow-600 mr-4">
            🏅 {user.badge} Badge
          </p>
        )}
        {!user?.email ? (
          <Link to="/login">
            <button className="btn btn-primary">Join Us</button>
          </Link>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
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
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-[100]"
            >
              <li>
                <p className="font-semibold">{user.displayName || "User"}</p>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
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
