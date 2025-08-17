
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
import PostDetails from "../src/Pages/PostDetails/PostDetails";
import CommentCount from "../src/Component/CommentCount";
import ReportComments from "../src/Component/ReportComments";
import PrivateRoute from "../src/Component/PrivateRoute/PrivateRoute";
import ManageUsers from "../src/Pages/Dashboard/ManageUsers/ManageUsers";
import AdminProfile from "../src/Pages/Dashboard/AdminProfile/AdminProfile";
import ReportedComments from "../src/Pages/Dashboard/ReportedComments/ReportedComments";
import MakeAnnouncement from "../src/Pages/Dashboard/MakeAnnouncement/MakeAnnouncement";
import ErrorPage from "../src/Component/ErrorPage/ErrorPage";
import PrivacyPolicy from "../src/Component/PrivacyPolicy/PrivacyPolicy";
import AboutUs from "../src/Component/AboutUs/AboutUs";
import Contact from "../src/Component/Contact/Contact";

export const router = createBrowserRouter([
  { path: "/",
     Component: Root ,
      errorElement: <ErrorPage />,
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
         },{

          path:'post/:id',
          element:<PostDetails></PostDetails>
         },{
          path:"CommentCount",
          element:<CommentCount></CommentCount>
         },{
          path:"comments/:postId",
          element:<ReportComments></ReportComments>
         },
         {
          path:'/membership',
          element:<Membership></Membership>
         },{
          path:'/policy',
          element:<PrivateRoute> <PrivacyPolicy></PrivacyPolicy></PrivateRoute> 
         },
         {
          path:'/about',
          element:<PrivateRoute> <AboutUs></AboutUs></PrivateRoute> 
         },{
          path:'/contract',
          element:<Contact></Contact>
         }
      ]
    
    },{
       path:"/dashboard",
    element: <PrivateRoute> <DashboardLayout></DashboardLayout>, </PrivateRoute>  ,
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
    },{
      path:'MakeAdmin',
      element:<ManageUsers></ManageUsers>
    },{
      path:"AdminProfile",
      element:<AdminProfile></AdminProfile>
    },{
      path:"ReportedComments",
      element:<ReportedComments></ReportedComments>
    },{
      path:"MakeAnnouncement",
      element:<MakeAnnouncement></MakeAnnouncement>
    }
  ]
    }
]);