// // AddPost.jsx
// import React, { useContext, useEffect, useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import Select from "react-select";
// import { toast } from "react-hot-toast";
// import { Link } from "react-router";
// import { AuthContext } from "../../../context/AuthContext";
// import useAxios from "../../../hook/useAxios";


// const tagOptions = [
//   { value: "Technology", label: "Technology" },
//   { value: "Health", label: "Health" },
//   { value: "Education", label: "Education" },
//   { value: "Entertainment", label: "Entertainment" },
// ];

// const AddPost = () => {
//   const { user } = useContext(AuthContext);
//   const axiosSecure = useAxios();
//   const [postCount, setPostCount] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isMember, setIsMember] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     control,
//     setValue,
   
//     formState: { errors },
//   } = useForm();

//   // Check user's post count and membership status
//   useEffect(() => {
//     if (user?.email) {
//       setIsLoading(true);
      
//       // Check post count
//       axiosSecure.get(`/posts/count?email=${user.email}`)
//         .then(res => {
//           setPostCount(res.data.count);
          
//           // In a real app, you would check the user's role from your auth system
//           // For now, we'll assume non-members can only post 5 times
//           setIsMember(res.data.count < 5); // Simplified logic
//           setIsLoading(false);
//         })
//         .catch(err => {
//           console.error("Failed to get post count:", err);
//           setIsLoading(false);
//         });
//     }
//   }, [user, axiosSecure]);

//   // Set user info in form
//   useEffect(() => {
//     if (user) {
//       setValue("authorName", user.displayName || "");
//       setValue("authorEmail", user.email || "");
//       setValue("authorImage", user.photoURL || "");
//     }
//   }, [user, setValue]);

//   const onSubmit = async (data) => {
//     try {
//       const res = await axiosSecure.post("/posts", data);
      
//       if (res.data.success) {
//         toast.success("Post added successfully!");
     
//         setPostCount(prev => prev + 1);
//       } else {
//         toast.error(res.data.message || "Failed to add post.");
//       }
//     } catch (err) {
//       console.error("Post error:", err);
//       toast.error(err.response?.data?.message || "Failed to add post.");
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <span className="loading loading-spinner loading-lg"></span>
//       </div>
//     );
//   }

//   if (!isMember && postCount >= 5) {
//     return (
//       <div className="max-w-2xl mx-auto p-6 mt-10 bg-white rounded-xl shadow text-center">
//         <h2 className="text-2xl font-bold mb-4 text-red-600">Post Limit Reached</h2>
//         <p className="mb-6">You've reached your limit of 5 posts as a free user.</p>
//         <p className="mb-6">Upgrade to a membership to continue posting!</p>
//         <Link to="/membership" className="btn btn-primary">
//           Become a Member
//         </Link>
//       </div>
//     );
//   }

//   else return (
//     <div className="max-w-2xl mx-auto p-6 mt-10 bg-white rounded-xl shadow">
//       <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Add a New Post</h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {/* Author Info (readonly) */}
//         <div>
//           <label className="label">Author Name</label>
//           <input
//             {...register("authorName")}
        
//             className="input input-bordered w-full"
//             readOnly
//           />
//         </div>

//         <div>
//           <label className="label">Author Email</label>
//           <input
//             {...register("authorEmail")}
     
//             className="input input-bordered w-full"
//               readOnly
//           />
//         </div>

//         <div>
//           <label className="label">Author Photo URL</label>
//           <input
//             {...register("authorImage")}
      
//             className="input input-bordered w-full"
//               readOnly
//           />
//         </div>

//         {/* Post Title */}
//         <div>
//           <label className="label">Post Title</label>
//           <input
//             {...register("title", { required: "Title is required" })}
//             className="input input-bordered w-full"
//           />
//           {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
//         </div>

//         {/* Post Description */}
//         <div>
//           <label className="label">Post Description</label>
//           <textarea
//             {...register("description", { required: "Description is required" })}
//             className="textarea textarea-bordered w-full"
//             rows={4}
//           />
//           {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
//         </div>

//         {/* Tag Selection */}
//         <div>
//           <label className="label">Tag</label>
//           <Controller
//             name="tag"
//             control={control}
//             rules={{ required: "Tag is required" }}
//             render={({ field }) => (
//               <Select
//                 {...field}
//                 options={tagOptions}
//                 className="react-select-container"
//                 classNamePrefix="react-select"
//               />
//             )}
//           />
//           {errors.tag && <p className="text-red-500 text-sm">{errors.tag.message}</p>}
//         </div>

//         <button type="submit" className="btn btn-primary w-full">
//           Submit Post
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddPost;



import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { toast } from "react-hot-toast";
import { Link } from "react-router";
import { AuthContext } from "../../../context/AuthContext";
import useAxios from "../../../hook/useAxios";

const tagOptions = [
  { value: "Technology", label: "Technology" },
  { value: "Health", label: "Health" },
  { value: "Education", label: "Education" },
  { value: "Entertainment", label: "Entertainment" },
];

const MAX_FREE_POSTS = 5;

const AddPost = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxios();
  const [postCount, setPostCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showLimitMessage, setShowLimitMessage] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,

    formState: { errors },
  } = useForm();

  // Initialize form and check post count
  useEffect(() => {
    const initialize = async () => {
      if (user?.email) {
        try {
          // Set user info in form
          setValue("authorName", user.displayName || "");
          setValue("authorEmail", user.email || "");
          setValue("authorImage", user.photoURL || "");

          // Check post count
          const res = await axiosSecure.get(`/posts/count?email=${user.email}`);
          setPostCount(res.data.count);
          setShowLimitMessage(res.data.count >= MAX_FREE_POSTS);
        } catch (err) {
          console.error("Initialization error:", err);
          toast.error("Failed to load post data");
        } finally {
          setIsLoading(false);
        }
      }
    };

    initialize();
  }, [user, axiosSecure, setValue]);

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.post("/posts", {
        ...data,
        tag: data.tag.value, // Convert select object to string
      });

      if (res.data.success) {
        toast.success("Post added successfully!");

        
        // Update post count and check limit
        const newCount = postCount + 1;
        setPostCount(newCount);
        
        if (newCount >= MAX_FREE_POSTS) {
          setShowLimitMessage(true);
        }
      } else {
        toast.error(res.data.message || "Failed to add post");
      }
    } catch (err) {
      console.error("Post submission error:", err);
      toast.error(err.response?.data?.message || "Failed to add post");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (showLimitMessage) {
    return (
      <div className="max-w-2xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-md text-center animate-fade-in">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Post Limit Reached</h2>
        <p className="mb-6 text-gray-700">
          You've used all {MAX_FREE_POSTS} free posts. Upgrade to continue posting!
        </p>
        <div className="flex flex-col space-y-4">
          <Link 
            to="/membership" 
            className="btn btn-primary w-full"
          >
            Become a Member
          </Link>
          <button 
            onClick={() => setShowLimitMessage(false)} 
            className="btn btn-ghost text-blue-600"
          >
            View My Posts
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-md animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        {postCount > 0 ? `You've used ${postCount}/${MAX_FREE_POSTS} free posts` : 'Create New Post'}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Author Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="label">Author Name</label>
            <input
              {...register("authorName")}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>
          <div>
            <label className="label">Email</label>
            <input
              {...register("authorEmail")}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>
          <div>
            <label className="label">Photo URL</label>
            <input
              {...register("authorImage")}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>
        </div>

        {/* Post Content */}
        <div>
          <label className="label">Post Title*</label>
          <input
            {...register("title", { required: "Title is required" })}
            className="input input-bordered w-full"
            placeholder="Enter post title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="label">Description*</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            className="textarea textarea-bordered w-full"
            rows={5}
            placeholder="Write your post content here..."
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="label">Category*</label>
          <Controller
            name="tag"
            control={control}
            rules={{ required: "Please select a category" }}
            render={({ field }) => (
              <Select
                {...field}
                options={tagOptions}
                className="react-select-container"
                classNamePrefix="react-select"
                placeholder="Select a category..."
              />
            )}
          />
          {errors.tag && (
            <p className="text-red-500 text-sm mt-1">{errors.tag.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full mt-6"
          disabled={postCount >= MAX_FREE_POSTS}
        >
          {postCount >= MAX_FREE_POSTS - 1 ? 'Last Free Post' : 'Submit Post'}
        </button>
      </form>
    </div>
  );
};

export default AddPost;