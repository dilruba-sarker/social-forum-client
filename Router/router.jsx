
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Root from "../Root/Root";
import Home from "../src/Pages/Home/Home";
import Login from "../src/Pages/Home/Login/Login";
import Register from "../src/Pages/Register/Register";
import DashboardLayout from "../src/DashboardLayout/DashboardLayout";
import MyProfile from "../src/Pages/Dashboard/MyProfile/MyProfile";
import AddPost from "../src/Pages/Dashboard/AddPost/AddPost";
import MyPosts from "../src/Pages/MyPosts/MyPosts";
import Membership from "../src/Pages/Membership/Membership";
import AllPosts from "../src/Pages/AllPosts/AllPosts";
export const router = createBrowserRouter([
  { path: "/",
     Component: Root ,
      children: [
         { index: true, Component: Home },
         {
          path:'/login',
          element:<Login></Login>
         },
         {
          path:'/register',
          element:<Register></Register>
         },{
          path:'allpost',
          element:<AllPosts></AllPosts>
         },
         {
          path:'/membership',
          element:<Membership></Membership>
         },
      ]
    
    },{
       path:"/dashboard",
    element:<DashboardLayout></DashboardLayout>,
    children:[
      {
      path:"MyProfile",
      element:<MyProfile></MyProfile>
    },
      {
      path:"AddPost",
      element:<AddPost></AddPost>
    },
      {
      path:"MyPosts",
      element:<MyPosts></MyPosts>
    },
  ]
    }
]);