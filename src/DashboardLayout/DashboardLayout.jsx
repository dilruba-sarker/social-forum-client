import React from "react";
import { NavLink, Outlet } from "react-router";
import useUserRole from "../hook/useUserRole";

const DashboardLayout = () => {

  const {role,isRoleLoading}=useUserRole()
  console.log('role',role,isRoleLoading)
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        {/* Page content here */}
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">Dashboard</div>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal">
              {/* Navbar menu content here */}
              <li>
                <a>Navbar Item 1</a>
              </li>
              <li>
                <a>Navbar Item 2</a>
              </li>
            </ul>
          </div>
        </div>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}

          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {/* <li>
            <NavLink to="/dashboard/MyProfile">My Profile</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/AddPost">Add Post</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/MyPosts">My Posts</NavLink>
          </li> */}
         {!isRoleLoading && (role === "member" || role === "user") && (
  <>
    <li>
      <NavLink to="/dashboard/MyProfile">My Profile</NavLink>
    </li>
    <li>
      <NavLink to="/dashboard/AddPost">Add Post</NavLink>
    </li>
    <li>
      <NavLink to="/dashboard/MyPosts">My Posts</NavLink>
    </li>
  </>
)}


          {!isRoleLoading && role ==="admin" &&<>
          
           <li>
            <NavLink to="/dashboard/MakeAdmin">Manage Users</NavLink>
          </li>
           <li>
            <NavLink to="/dashboard/AdminProfile">Admin Profile</NavLink>
          </li>
           <li>
            <NavLink to="/dashboard/ReportedComments">Reported Comments</NavLink>
          </li>
           <li>
            <NavLink to="/dashboard/MakeAnnouncement">Make Announcement</NavLink>
          </li>
          
          </>}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
