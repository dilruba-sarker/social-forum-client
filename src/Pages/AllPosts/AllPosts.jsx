

import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxios from "../../hook/useAxios";
import CommentCount from "../../Component/CommentCount";

const POSTS_PER_PAGE = 8;

const AllPosts = ({ searchTerm }) => {
  const axiosSecure = useAxios();
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);

  const postsRef = useRef(null);

  const { data = {}, isLoading } = useQuery({
    queryKey: ["posts", sortBy, searchTerm, currentPage],
    queryFn: async () => {
      let url = `/posts?page=${currentPage}&limit=${POSTS_PER_PAGE}`;

      if (sortBy === "popular") {
        url = `/posts/popular?page=${currentPage}&limit=${POSTS_PER_PAGE}`;
      } else if (searchTerm) {
        url = `/posts/search?keyword=${searchTerm}&page=${currentPage}&limit=${POSTS_PER_PAGE}`;
      }

      const res = await axiosSecure.get(url);
      return res.data;
    },
    keepPreviousData: true,
  });

  const posts = data.posts || [];
  const totalPosts = data.total || 0;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  const handleSort = (type) => {
    setSortBy(type);
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Scroll to posts container *after* loading new posts
  useEffect(() => {
    if (!isLoading && posts.length > 0) {
      postsRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isLoading, posts.length]);

  return (
    <div ref={postsRef} className="max-w-6xl  mx-auto px-4 py-10">
      <h2 className="text-3xl text-center font-bold mb-6">All Posts</h2>

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

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts found.</p>
      ) : (
        <>
          <div className=" flex flex-col gap-4 ">
            {posts.map((post) => (
              
              

              <Link  to={`/post/${post._id}`} key={post._id}>
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
                  className="text-xl font-bold text-black mb-2 hover:underline block"
                >
                  {post.title}
                </Link>
                <div className="flex gap-8">
                  <p className="text-sm text-gray-600 mb-2">Tag: {post.tag}</p>
                <Link
                  to={`/post/${post._id}`}
                  className="bg-indigo-700 text-white p-1 rounded-md"
                >
                See More
                </Link>
                </div>
                <div className="flex flex-wrap items-center text-sm text-gray-600 gap-4 mt-3">
                  <span>👍 Upvotes: {post.upVote || 0}</span>
                  <span>👎 Downvotes: {post.downVote || 0}</span>
                  <span>🗳️ Total Votes: {(post.upVote || 0) - (post.downVote || 0)}</span>
                  <CommentCount postId={post._id} />
                </div>
              
                
              </div>
              </Link>
            ))}
          </div>

          {/* <div className="mt-10 flex justify-center gap-2"> */}
          <div className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-5">
            <button
              className="btn btn-sm"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              « Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`btn btn-sm ${
                  currentPage === i + 1 ? "btn-primary" : "btn-outline"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="btn btn-sm"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next »
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AllPosts;
