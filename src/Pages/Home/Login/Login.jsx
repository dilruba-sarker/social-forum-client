import React, { useContext } from "react";
import { useForm } from "react-hook-form";

import { toast } from "react-hot-toast";
import { useNavigate, Link, useLocation } from "react-router";

import { AuthContext } from "../../../context/AuthContext";
import useAxios from "../../../hook/useAxios";
import SocialLogin from "../../../Component/SocialLogin";

const Login = () => {

   const location=useLocation()
  const from=location?.state?.from||'/'
  const { signInUser } = useContext(AuthContext);
  const navigate = useNavigate();
   const axiosSecure = useAxios();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;

    signInUser(email, password)
      .then(() => {
        toast.success("Login successful!");
        reset();
         navigate(from)
      })
      .catch((err) => {

        console.error("Login error:", err);
       
      });
  };






  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-center text-blue-600">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              {...register("password", {
                required: "Password is required",
              })}
              type="password"
              placeholder="••••••••"
              className="input input-bordered w-full"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>

        {/* <div className="divider">OR</div> */}

        {/* Google Login Button */}
       <SocialLogin></SocialLogin>

        <p className="text-center text-sm text-gray-600 mt-2">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
