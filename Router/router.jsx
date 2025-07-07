
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Root from "../Root/Root";
import Home from "../src/Pages/Home/Home";
import Login from "../src/Pages/Home/Login/Login";
import Register from "../src/Pages/Register/Register";
import DashboardLayout from "../src/DashboardLayout/DashboardLayout";
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
         }
      ]
    
    },{
       path:"/dashboard",
    element:<DashboardLayout></DashboardLayout>,
    
    }
]);