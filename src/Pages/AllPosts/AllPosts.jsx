


import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hook/useAxios";


const AllPosts = () => {
  const axiosSecure = useAxios();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: posts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allPosts", searchTerm],
    queryFn: async () => {
      const endpoint = searchTerm
        ? `/posts/search?keyword=${searchTerm}`
        : "/posts";
      const res = await axiosSecure.get(endpoint);
      return res.data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    refetch(); // triggers query with updated searchTerm
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">All Posts</h2>

      {/* 🔍 Search Bar */}
      <form onSubmit={handleSearch} className="mb-6 flex justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by tag (e.g., Technology, Health)"
          className="input input-bordered w-full max-w-xs mr-2"
        />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">
              No posts found.
            </p>
          ) : (
            posts.map((post) => (
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

                <h3 className="text-xl font-bold text-blue-600 mb-2">{post.title}</h3>
                <p className="text-sm text-gray-600 mb-2">Tag: {post.tag}</p>

                <div className="text-sm text-gray-600 space-y-1">
                  <p>👍 Upvotes: {post.upVote || 0}</p>
                  <p>👎 Downvotes: {post.downVote || 0}</p>
                  <p>🗳️ Total Votes: {(post.upVote || 0) - (post.downVote || 0)}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AllPosts;
