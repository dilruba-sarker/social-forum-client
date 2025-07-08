


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
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
  const [isMember, setIsMember] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,

    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tag: ""
    }
  });

  // Initialize user role and post count
  useEffect(() => {
    const initialize = async () => {
      if (user?.email) {
        try {
          setValue("authorName", user.displayName || "");
          setValue("authorEmail", user.email || "");
          setValue("authorImage", user.photoURL || "");

          const userRes = await axiosSecure.get(`/users/${user.email}`);
          const dbUser = userRes.data;
          const member = dbUser.role === "member";
          setIsMember(member);

          const countRes = await axiosSecure.get(`/posts/count?email=${user.email}`);
          const count = countRes.data.count;
          setPostCount(count);

          if (!member && count >= MAX_FREE_POSTS) {
            setShowLimitMessage(true);
          }
        } catch (err) {
          console.error("Init error:", err);
          toast.error("Failed to load user info");
        } finally {
          setIsLoading(false);
        }
      }
    };

    initialize();
  }, [user, axiosSecure, setValue]);

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.post("/posts", data);

      if (res.data.success) {
        toast.success("Post added successfully!");
        const newCount = postCount + 1;
        setPostCount(newCount);
     
        setSelectedTag(null);

        if (!isMember && newCount >= MAX_FREE_POSTS) {
          setShowLimitMessage(true);
        }
      } else {
        toast.error(res.data.message || "Failed to add post");
      }
    } catch (err) {
      console.error("Post error:", err);
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
      <div className="max-w-2xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Post Limit Reached</h2>
        <p className="mb-4 text-gray-700">
          You've used all {MAX_FREE_POSTS} free posts. Upgrade to post unlimited content!
        </p>
        <Link to="/membership" className="btn btn-primary">
          Become a Member
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        {isMember
          ? `Welcome, Member! You have ${postCount} post${postCount === 1 ? "" : "s"}`
          : `You've used ${postCount}/${MAX_FREE_POSTS} free posts`}
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

        {/* Post Title */}
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

        {/* Description */}
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

        {/* Tag */}
        <div>
          <label className="label">Category*</label>
          <Select
            options={tagOptions}
            value={tagOptions.find(option => option.value === watch("tag"))}
            onChange={(selectedOption) => {
              setSelectedTag(selectedOption);
              setValue("tag", selectedOption?.value || "", { shouldValidate: true });
            }}
            placeholder="Select a category..."
          />
          <input
            type="hidden"
            {...register("tag", { 
              required: "Please select a category",
              validate: value => value !== "" || "Please select a category"
            })}
          />
          {errors.tag && (
            <p className="text-red-500 text-sm mt-1">{errors.tag.message}</p>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6">
          Submit Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;