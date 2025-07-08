

// import React, { useContext, useEffect, useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import Select from "react-select";
// import { toast } from "react-hot-toast";
// import { Link } from "react-router";
// import { AuthContext } from "../../../context/AuthContext";
// import useAxios from './../../../hook/useAxios';


// const tagOptions = [
//   { value: "Technology", label: "Technology" },
//   { value: "Health", label: "Health" },
//   { value: "Education", label: "Education" },
//   { value: "Entertainment", label: "Entertainment" },
// ];

// const MAX_FREE_POSTS = 5;

// const AddPost = () => {
//   const { user } = useContext(AuthContext);
//   const axiosSecure = useAxios();
//   const [postCount, setPostCount] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showLimitMessage, setShowLimitMessage] = useState(false);
//   const [isMember, setIsMember] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     control,
//     setValue,
//     formState: { errors },
//   } = useForm();

//   // Initialize user role and post count
//   useEffect(() => {
//     const initialize = async () => {
//       if (user?.email) {
//         try {
//           // 1. Pre-fill form
//           setValue("authorName", user.displayName || "");
//           setValue("authorEmail", user.email || "");
//           setValue("authorImage", user.photoURL || "");

//           // 2. Get user from DB to check role
//           const userRes = await axiosSecure.get(`/users/${user.email}`);
//           const dbUser = userRes.data;
//           const member = dbUser.role === "member";
//           setIsMember(member);

//           // 3. Count posts
//           const countRes = await axiosSecure.get(`/posts/count?email=${user.email}`);
//           const count = countRes.data.count;
//           setPostCount(count);

//           // 4. If not member and post count exceeded
//           if (!member && count >= MAX_FREE_POSTS) {
//             setShowLimitMessage(true);
//           }
//         } catch (err) {
//           console.error("Init error:", err);
//           toast.error("Failed to load user info");
//         } finally {
//           setIsLoading(false);
//         }
//       }
//     };

//     initialize();
//   }, [user, axiosSecure, setValue]);

//   const onSubmit = async (data) => {
//     try {
//       const res = await axiosSecure.post("/posts", {
//         ...data,
//         tag: data.tag.value,
//       });

//       if (res.data.success) {
//         toast.success("Post added successfully!");
//         const newCount = postCount + 1;
//         setPostCount(newCount);

//         if (!isMember && newCount >= MAX_FREE_POSTS) {
//           setShowLimitMessage(true);
//         }
//       } else {
//         toast.error(res.data.message || "Failed to add post");
//       }
//     } catch (err) {
//       console.error("Post error:", err);
//       toast.error(err.response?.data?.message || "Failed to add post");
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <span className="loading loading-spinner loading-lg"></span>
//       </div>
//     );
//   }

//   if (showLimitMessage) {
//     return (
//       <div className="max-w-2xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-md text-center">
//         <h2 className="text-2xl font-bold mb-4 text-red-600">Post Limit Reached</h2>
//         <p className="mb-4 text-gray-700">
//           You've used all {MAX_FREE_POSTS} free posts. Upgrade to post unlimited content!
//         </p>
//         <Link to="/membership" className="btn btn-primary">
//           Become a Member
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-2xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-md">
//       <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
//         {isMember
//           ? `Welcome, Member! You have ${postCount} post${postCount === 1 ? "" : "s"}`
//           : `You've used ${postCount}/${MAX_FREE_POSTS} free posts`}
//       </h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {/* Author Info */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="label">Author Name</label>
//             <input
//               {...register("authorName")}
//               readOnly
//               className="input input-bordered w-full bg-gray-100"
//             />
//           </div>
//           <div>
//             <label className="label">Email</label>
//             <input
//               {...register("authorEmail")}
//               readOnly
//               className="input input-bordered w-full bg-gray-100"
//             />
//           </div>
//           <div>
//             <label className="label">Photo URL</label>
//             <input
//               {...register("authorImage")}
//               readOnly
//               className="input input-bordered w-full bg-gray-100"
//             />
//           </div>
//         </div>

//         {/* Post Title */}
//         <div>
//           <label className="label">Post Title*</label>
//           <input
//             {...register("title", { required: "Title is required" })}
//             className="input input-bordered w-full"
//             placeholder="Enter post title"
//           />
//           {errors.title && (
//             <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
//           )}
//         </div>

//         {/* Description */}
//         <div>
//           <label className="label">Description*</label>
//           <textarea
//             {...register("description", { required: "Description is required" })}
//             className="textarea textarea-bordered w-full"
//             rows={5}
//             placeholder="Write your post content here..."
//           />
//           {errors.description && (
//             <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
//           )}
//         </div>

//         {/* Tag */}
//         <div>
//           <label className="label">Category*</label>
//           <Controller
//             name="tag"
//             control={control}
//             rules={{ required: "Please select a category" }}
//             render={({ field }) => (
//               <Select
//                 {...field}
//                 options={tagOptions}
//                 className="react-select-container"
//                 classNamePrefix="react-select"
//                 placeholder="Select a category..."
//               />
//             )}
//           />
//           {errors.tag && (
//             <p className="text-red-500 text-sm mt-1">{errors.tag.message}</p>
//           )}
//         </div>

//         <button type="submit" className="btn btn-primary w-full mt-6">
//           Submit Post
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddPost;



import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { Link } from "react-router";
import { AuthContext } from "../../../context/AuthContext";
import useAxios from "../../../hook/useAxios";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxios();

  // Fetch user info
  const { data: userInfo = {}, isLoading: userLoading } = useQuery({
    queryKey: ["userInfo", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Fetch 3 recent posts
  const { data: recentPosts = [], isLoading: postsLoading } = useQuery({
    queryKey: ["recentPosts", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/recent?email=${user?.email}&limit=3`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (userLoading || postsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-md">
      <div className="text-center mb-8">
        <img
          src={userInfo.photoURL || user.photoURL}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto"
        />
        <h2 className="text-2xl font-bold mt-4">{userInfo.displayName || user.displayName}</h2>
        <p className="text-gray-600">{userInfo.email}</p>

        {/* Badges */}
        <div className="mt-4 space-x-2">
          {userInfo.badge === "Gold" ? (
            <span className="badge badge-warning text-white px-4 py-1">🏅 Gold Badge</span>
          ) : (
            <span className="badge badge-accent text-white px-4 py-1">🥉 Bronze Badge</span>
          )}
        </div>
      </div>

      {/* Recent Posts */}
      <h3 className="text-xl font-semibold mb-4 border-b pb-2">My Recent Posts</h3>
      <div className="space-y-4">
        {recentPosts.length > 0 ? (
          recentPosts.map((post) => (
            <div key={post._id} className="p-4 border rounded-md">
              <h4 className="text-lg font-bold text-blue-600">{post.title}</h4>
              <p className="text-sm text-gray-600">{post.description}</p>
              <p className="text-xs mt-1">Tag: {post.tag}</p>
              <p className="text-xs text-gray-400">Date: {new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">You haven't posted anything yet.</p>
        )}
      </div>

      <div className="mt-6 text-center">
        <Link to="/posts" className="btn btn-outline btn-primary">
          View All My Posts
        </Link>
      </div>
    </div>
  );
};

export default MyProfile;
