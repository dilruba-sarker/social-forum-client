
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Root from "../Root/Root";
import Home from "../src/Pages/Home/Home";
export const router = createBrowserRouter([
  { path: "/",
     Component: Root ,
      children: [
         { index: true, Component: Home },
      ]
    
    },
]);