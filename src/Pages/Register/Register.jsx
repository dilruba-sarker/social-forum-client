// import React, { useContext } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "react-hot-toast";
// import { Link, useNavigate } from "react-router"; // FIXED
// import { AuthContext } from "../../context/AuthContext";
// import { FcGoogle } from "react-icons/fc";


// const Register = () => {
//   const { createUser, updateUser,googleSignin } = useContext(AuthContext); // FIXED
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     const { name, email, password, photo } = data;

//     createUser(email, password)
//       .then(() => {
//         return updateUser({
//           displayName: name,
//           photoURL: photo,
//         });
//       })
//       .then(() => {
//         toast.success("Registration successful!");
//         reset();
//         navigate("/");
//       })
//       .catch((error) => {
//         console.error("Registration error:", error);
//         toast.error(error.message);
//       });
//   };
//  const handleGoogleLogin = () => {
//     googleSignin()
//       .then(() => {
//         toast.success("Logged in with Google!");
//         navigate("/");
//       })
//       .catch((error) => {
//         console.error("Google login error:", error);
//         toast.error(error.message);
//       });
//   };
//   return (
//     <div className="min-h-screen bg-base-200 flex items-center justify-center">
//       <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-md">
//         <h2 className="text-3xl font-bold text-center text-blue-600">Create Account</h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           {/* Name */}
//           <div>
//             <label className="label">
//               <span className="label-text">Full Name</span>
//             </label>
//             <input
//               {...register("name", { required: "Name is required" })}
//               type="text"
//               placeholder="John Doe"
//               className="input input-bordered w-full"
//             />
//             {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
//           </div>

//           {/* Email */}
//           <div>
//             <label className="label">
//               <span className="label-text">Email</span>
//             </label>
//             <input
//               {...register("email", { required: "Email is required" })}
//               type="email"
//               placeholder="john@example.com"
//               className="input input-bordered w-full"
//             />
//             {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
//           </div>

//           {/* Photo URL */}
//           <div>
//             <label className="label">
//               <span className="label-text">Photo URL</span>
//             </label>
//             <input
//               {...register("photo", { required: "Photo URL is required" })}
//               type="url"
//               placeholder="https://example.com/photo.jpg"
//               className="input input-bordered w-full"
//             />
//             {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo.message}</p>}
//           </div>

//           {/* Password */}
//           <div>
//             <label className="label">
//               <span className="label-text">Password</span>
//             </label>
//             <input
//               {...register("password", {
//                 required: "Password is required",
//                 minLength: {
//                   value: 6,
//                   message: "Password must be at least 6 characters",
//                 },
//               })}
//               type="password"
//               placeholder="••••••••"
//               className="input input-bordered w-full"
//             />
//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <button type="submit" className="btn btn-primary w-full">
//             Register
//           </button>
//         </form>
//  {/* Google Login Button */}
//         <button
//           onClick={handleGoogleLogin}
//           className="btn btn-outline w-full flex items-center gap-2"
//         >
//           <FcGoogle size={20} />
//           Continue with Google
//         </button>
//         <p className="text-center text-sm text-gray-600">
//           Already have an account?{" "}
//           <Link to="/login" className="text-blue-500 hover:underline">
//             Login here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import useAxios from "../../hook/useAxios";
import { AuthContext } from "../../context/AuthContext";
import SocialLogin from "../../Component/SocialLogin";
import toast from "react-hot-toast";




const Register = () => {
  const axiosSecure = useAxios();
  const { createUser,  updateUser } = useContext(AuthContext);
  const [profilePic, setProfilePic] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    const { name, email, password } = data;

    createUser(email, password)
      .then(async (userCredential) => {
        console.log("User created:", userCredential.user);

        // Step 1: Update Firebase user profile
        const profileInfo = {
          displayName: name,
          photoURL: profilePic
        };

        await updateUser(profileInfo);

        console.log("✅ Firebase profile updated");

        // Step 2: Save user to your backend
        const userInfo = {
          email: email,
          displayName: name,
          photoURL: profilePic,
          role: 'user',
          badge: "Bronze",
          created_at: new Date().toISOString(),
          last_loggIn: new Date().toISOString()
        };

        const resUsr = await axiosSecure.post("/users", userInfo);
        console.log("✅ User saved to DB:", resUsr.data);

        navigate("/");
      })
      .catch((err) => {
        if(err.response?.status === 409){
        
          toast.error("⚠️ User already exists!");
        }
        console.error("❌ Error during registration:", err.message);
      });
  };

  const handleImageUpload = async (event) => {
    const imageFile = event.target.files[0];
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_KEY}`,
        formData
      );

      if (res.data.success) {
        const imageUrl = res.data.data.url;
        console.log("✅ Image uploaded:", imageUrl);
        setProfilePic(imageUrl);
      } else {
        console.error("❌ Upload failed:", res.data);
      }
    } catch (error) {
      console.error("❌ Error uploading image:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <h2 className="text-2xl font-bold text-center">Register</h2>

          {/* Name Field */}
          <div className="form-control">
            <label className="label"><span className="label-text">Name</span></label>
            <input
              type="text"
              placeholder="Your name"
              className="input input-bordered"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters"
                }
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="form-control">
            <label className="label"><span className="label-text">Email</span></label>
            <input
              type="email"
              placeholder="Your email"
              className="input input-bordered"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address"
                }
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Image Upload Field */}
          <div className="form-control">
            <label className="label"><span className="label-text">Profile Photo</span></label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="input input-bordered"
              accept="image/*"
            />
          </div>

          {/* Password Field */}
          <div className="form-control">
            <label className="label"><span className="label-text">Password</span></label>
            <input
              type="password"
              placeholder="Create a password"
              className="input input-bordered"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="form-control mt-4">
            <button className="btn btn-primary">Register</button>
          </div>

          <p className="text-sm text-center mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
          </p>
        </form>

        {/* Social Login Section */}
        <div className="px-8 pb-6">
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;
