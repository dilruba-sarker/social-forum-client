import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxios from "../../hook/useAxios";


const PostDetails = () => {
  const { id } = useParams();
  console.log("Post ID from URL:", id);
  const axiosSecure = useAxios()
  const queryClient = useQueryClient();

  // Fetch the post
  const { data: post, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/${id}`);
      return res.data;
    },
  });

  // Mutation to upvote
  const upvoteMutation = useMutation({
    mutationFn: async () => {
      return await axiosSecure.patch(`/posts/upvote/${id}`);
    },
    onSuccess: () => {
      toast.success("Upvoted!");
      queryClient.invalidateQueries(["post", id]);
    },
  });

  // Mutation to downvote
  const downvoteMutation = useMutation({
    mutationFn: async () => {
      return await axiosSecure.patch(`/posts/downvote/${id}`);
    },
    onSuccess: () => {
      toast.success("Downvoted!");
      queryClient.invalidateQueries(["post", id]);
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 bg-white shadow-md rounded-xl mt-6">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={post.authorImage}
          alt={post.authorName}
          className="w-14 h-14 rounded-full"
        />
        <div>
          <p className="text-lg font-semibold">{post.authorName}</p>
          <p className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-blue-700 mb-4">{post.title}</h1>
      <p className="text-gray-700 mb-6">{post.description}</p>

      <p className="mb-4 text-sm text-white bg-blue-500 inline-block px-3 py-1 rounded-full">
        Tag: {post.tag}
      </p>

      <div className="flex flex-wrap items-center gap-4 mt-8">
        <button
          onClick={() => upvoteMutation.mutate()}
          className="btn btn-sm btn-outline"
        >
          👍 Upvote ({post.upVote || 0})
        </button>

        <button
          onClick={() => downvoteMutation.mutate()}
          className="btn btn-sm btn-outline"
        >
          👎 Downvote ({post.downVote || 0})
        </button>

        <button className="btn btn-sm btn-info">💬 Comment</button>

        <button
          className="btn btn-sm btn-success"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast("Post link copied to clipboard!");
          }}
        >
          🔗 Share
        </button>
      </div>
    </div>
  );
};

export default PostDetails;
