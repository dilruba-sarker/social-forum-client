import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router"; // FIXED
import { AuthContext } from "../../context/AuthContext";
import { FcGoogle } from "react-icons/fc";


const Register = () => {
  const { createUser, updateUser,googleSignin } = useContext(AuthContext); // FIXED
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { name, email, password, photo } = data;

    createUser(email, password)
      .then(() => {
        return updateUser({
          displayName: name,
          photoURL: photo,
        });
      })
      .then(() => {
        toast.success("Registration successful!");
        reset();
        navigate("/");
      })
      .catch((error) => {
        console.error("Registration error:", error);
        toast.error(error.message);
      });
  };
 const handleGoogleLogin = () => {
    googleSignin()
      .then(() => {
        toast.success("Logged in with Google!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Google login error:", error);
        toast.error(error.message);
      });
  };
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-center text-blue-600">Create Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              placeholder="John Doe"
              className="input input-bordered w-full"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="john@example.com"
              className="input input-bordered w-full"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Photo URL */}
          <div>
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              {...register("photo", { required: "Photo URL is required" })}
              type="url"
              placeholder="https://example.com/photo.jpg"
              className="input input-bordered w-full"
            />
            {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
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
            Register
          </button>
        </form>
 {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full flex items-center gap-2"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
