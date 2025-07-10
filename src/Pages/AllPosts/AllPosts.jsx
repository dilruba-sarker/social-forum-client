
// import React, { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router";
// import useAxios from "../../hook/useAxios";
// import CommentCount from "../../Component/CommentCount";

// 

// const AllPosts = () => {
//   const axiosSecure = useAxios();

//   const [searchInput, setSearchInput] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortBy, setSortBy] = useState("latest"); // 'latest' or 'popular'

//   const { data: posts = [], isLoading, refetch } = useQuery({
//     queryKey: ["posts"],
//     queryFn: async () => {
//       let url = "/posts";

//       if (sortBy === "popular") {
//         url = "/posts/popular";
//       } else if (searchTerm) {
//         url = `/posts/search?keyword=${searchTerm}`;
//       }

//       const res = await axiosSecure.get(url);
//       return res.data;
//     },
//     enabled: false, // manually controlled
//   });

//   // Fetch on initial mount
//   useEffect(() => {
//     refetch();
//   }, []);

//   // ✅ Refetch when either sortBy or searchTerm changes
//   useEffect(() => {
//     refetch();
//   }, [sortBy, searchTerm]);

//   // Handle form submission
//   const handleSearch = (e) => {
//     e.preventDefault();
//     setSearchTerm(searchInput);
//   };

//   const handleSort = (type) => {
//     setSortBy(type);
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10">
//       <h2 className="text-3xl font-bold mb-6">All Posts</h2>

//       {/* 🔍 Search and Sort */}
//       <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
//         <form onSubmit={handleSearch} className="flex gap-2">
//           <input
//             type="text"
//             value={searchInput}
//             onChange={(e) => setSearchInput(e.target.value)}
//             placeholder="Search by tag"
//             className="input input-bordered w-full max-w-xs"
//           />
//           <button type="submit" className="btn btn-primary btn-sm">
//             Search
//           </button>
//         </form>

//         <div className="space-x-2">
//           <button
//             className={`btn btn-sm ${sortBy === "latest" ? "btn-primary" : "btn-outline"}`}
//             onClick={() => handleSort("latest")}
//           >
//             Sort by Latest
//           </button>
//           <button
//             className={`btn btn-sm ${sortBy === "popular" ? "btn-primary" : "btn-outline"}`}
//             onClick={() => handleSort("popular")}
//           >
//             Sort by Popularity
//           </button>
//         </div>
//       </div>

//       {/* 🌀 Loading */}
//       {isLoading ? (
//         <div className="flex justify-center items-center h-64">
//           <span className="loading loading-spinner loading-lg"></span>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {posts.length === 0 ? (
//             <p className="text-center text-gray-500 col-span-full">No posts found.</p>
//           ) : (
//             posts.map((post) => (
//               <div
//                 key={post._id}
//                 className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition"
//               >
//                 <div className="flex items-center gap-4 mb-4">
//                   <img
//                     src={post.authorImage}
//                     alt={post.authorName}
//                     className="w-10 h-10 rounded-full"
//                   />
//                   <div>
//                     <p className="font-semibold">{post.authorName}</p>
//                     <p className="text-xs text-gray-500">
//                       {new Date(post.createdAt).toLocaleString()}
//                     </p>
//                   </div>
//                 </div>
//                 <Link
//                   to={`/post/${post._id}`}
//                   className="text-xl font-bold text-blue-600 mb-2 hover:underline"
//                 >
//                   {post.title}
//                 </Link>
//                 <p className="text-sm text-gray-600 mb-2">Tag: {post.tag}</p>
//                 <div className="flex flex-wrap items-center text-sm text-gray-600 gap-4 mt-3">
//                   <span>👍 Upvotes: {post.upVote || 0}</span>
//                   <span>👎 Downvotes: {post.downVote || 0}</span>
//                   <span>🗳️ Total Votes: {(post.upVote || 0) - (post.downVote || 0)}</span>
            
//                   <CommentCount postId={post._id} />
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllPosts;
// import React, { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router";
// import useAxios from "../../hook/useAxios";

// import CommentCount from "../../Component/CommentCount";
// import Banner from "../../Component/BannerWithSearch/Banner";

// const AllPosts = () => {
//   const axiosSecure = useAxios();

//   const [searchInput, setSearchInput] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortBy, setSortBy] = useState("latest");

//   const { data: posts = [], isLoading, refetch } = useQuery({
//     queryKey: ["posts"],
//     queryFn: async () => {
//       let url = "/posts";

//       if (sortBy === "popular") url = "/posts/popular";
//       else if (searchTerm) url = `/posts/search?keyword=${searchTerm}`;

//       const res = await axiosSecure.get(url);
//       return res.data;
//     },
//     enabled: false,
//   });

//   useEffect(() => {
//     refetch();
//   }, []);

//   useEffect(() => {
//     refetch();
//   }, [sortBy, searchTerm]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setSearchTerm(searchInput);
//   };

//   const handleSort = (type) => {
//     setSortBy(type);
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4">
//       {/* 🔍 Banner with search bar */}
//       <Banner
//         searchInput={searchInput}
//         setSearchInput={setSearchInput}
//         handleSearch={handleSearch}
//       />

//       {/* 🔃 Sort buttons */}
//       <div className="flex justify-end mb-6 space-x-2">
//         <button
//           onClick={() => handleSort("latest")}
//           className={`btn btn-sm ${sortBy === "latest" ? "btn-primary" : "btn-outline"}`}
//         >
//           Sort by Latest
//         </button>
//         <button
//           onClick={() => handleSort("popular")}
//           className={`btn btn-sm ${sortBy === "popular" ? "btn-primary" : "btn-outline"}`}
//         >
//           Sort by Popularity
//         </button>
//       </div>

//       {/* 🌀 Loading or Posts Grid */}
//       {isLoading ? (
//         <div className="flex justify-center items-center h-40">
//           <span className="loading loading-spinner loading-lg"></span>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {posts.length === 0 ? (
//             <p className="text-center text-gray-500 col-span-full">No posts found.</p>
//           ) : (
//             posts.map((post) => (
//               <div
//                 key={post._id}
//                 className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
//               >
//                 <div className="flex items-center gap-4 mb-4">
//                   <img
//                     src={post.authorImage}
//                     alt={post.authorName}
//                     className="w-10 h-10 rounded-full"
//                   />
//                   <div>
//                     <p className="font-semibold">{post.authorName}</p>
//                     <p className="text-xs text-gray-500">
//                       {new Date(post.createdAt).toLocaleString()}
//                     </p>
//                   </div>
//                 </div>
//                 <Link
//                   to={`/post/${post._id}`}
//                   className="text-xl font-bold text-blue-600 mb-2 hover:underline block"
//                 >
//                   {post.title}
//                 </Link>
//                 <p className="text-sm text-gray-600 mb-2">Tag: {post.tag}</p>
//                 <div className="flex flex-wrap items-center text-sm text-gray-600 gap-4 mt-3">
//                   <span>👍 Upvotes: {post.upVote || 0}</span>
//                   <span>👎 Downvotes: {post.downVote || 0}</span>
//                   <span>🗳️ Total Votes: {(post.upVote || 0) - (post.downVote || 0)}</span>
//                   <CommentCount postId={post._id} />
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllPosts;
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router"; // use react-router-dom
import useAxios from "../../hook/useAxios";
import CommentCount from "../../Component/CommentCount";

const AllPosts = ({ searchTerm }) => {
  const axiosSecure = useAxios();
  const [sortBy, setSortBy] = useState("latest");

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["posts", sortBy, searchTerm],
    queryFn: async () => {
      let url = "/posts";
      if (sortBy === "popular") {
        url = "/posts/popular";
      } else if (searchTerm) {
        url = `/posts/search?keyword=${searchTerm}`;
      }

      const res = await axiosSecure.get(url);
      return res.data;
    },
  });

  const handleSort = (type) => {
    setSortBy(type);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">All Posts</h2>

      {/* Sort Buttons */}
      <div className="flex justify-end mb-6 space-x-2">
        <button
          onClick={() => handleSort("latest")}
          className={`btn btn-sm ${sortBy === "latest" ? "btn-primary" : "btn-outline"}`}
        >
          Sort by Latest
        </button>
        <button
          onClick={() => handleSort("popular")}
          className={`btn btn-sm ${sortBy === "popular" ? "btn-primary" : "btn-outline"}`}
        >
          Sort by Popularity
        </button>
      </div>

      {/* Posts */}
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={post.authorImage}
                  alt={post.authorName}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{post.authorName}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(post.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <Link
                to={`/post/${post._id}`}
                className="text-xl font-bold text-blue-600 mb-2 hover:underline block"
              >
                {post.title}
              </Link>
              <p className="text-sm text-gray-600 mb-2">Tag: {post.tag}</p>
              <div className="flex flex-wrap items-center text-sm text-gray-600 gap-4 mt-3">
                <span>👍 Upvotes: {post.upVote || 0}</span>
                <span>👎 Downvotes: {post.downVote || 0}</span>
                <span>🗳️ Total Votes: {(post.upVote || 0) - (post.downVote || 0)}</span>
                <CommentCount postId={post._id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPosts;
