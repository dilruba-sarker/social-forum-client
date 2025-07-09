import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../../context/AuthContext";

// adjust path if needed

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
       return <span className="loading loading-spinner text-error"></span>
  }

  if (!user) {
   return <Navigate state={{from:location.pathname}} to='/login'>login</Navigate>
  }

  return children;
};

export default PrivateRoute;
