
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxios from "../../hook/useAxios";
import { AuthContext } from "../../context/AuthContext"; // Adjust path if needed
import CommentCount from "../../Component/CommentCount";
import ReportComments from "../../Component/ReportComments";

const PostDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext); // Your logged-in user info

  // Post data
  const { data: post, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/${id}`);
      return res.data;
    },
  });

  // Comments data
  const {
    data: comments = [],
    isLoading: commentsLoading,
    refetch: refetchComments,
  } = useQuery({
    queryKey: ["comments", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/${id}/comments`);
      return res.data;
    },
    enabled: !!id,
  });

  // State for new comment
  const [commentText, setCommentText] = useState("");

  // Upvote mutation
  const upvoteMutation = useMutation({
    mutationFn: async () => axiosSecure.patch(`/posts/upvote/${id}`),
    onSuccess: () => {
      toast.success("Upvoted!");
      queryClient.invalidateQueries(["post", id]);
    },
  });

  // Downvote mutation
  const downvoteMutation = useMutation({
    mutationFn: async () => axiosSecure.patch(`/posts/downvote/${id}`),
    onSuccess: () => {
      toast.success("Downvoted!");
      queryClient.invalidateQueries(["post", id]);
    },
  });

  // Add comment mutation
  const addCommentMutation = useMutation({
    mutationFn: async (newComment) => {
      return axiosSecure.post(`/posts/${id}/comments`, newComment);
    },
    onSuccess: () => {
      toast.success("Comment added!");
      setCommentText("");
      refetchComments();
    },
    onError: () => {
      toast.error("Failed to add comment.");
    },
  });

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please log in to comment.");
      return;
    }
    if (!commentText.trim()) {
      toast.error("Comment cannot be empty.");
      return;
    }

    addCommentMutation.mutate({
      authorEmail: user.email,
      authorName: user.displayName || user.name || "Anonymous",
      authorImage: user.photoURL || "",
      commentText: commentText.trim(),
      createdAt: new Date().toISOString(),
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 bg-white shadow-md rounded-xl mt-6">
      {/* Post author info */}
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

      {/* Post title and description */}
      <h1 className="text-3xl font-bold text-blue-700 mb-4">{post.title}</h1>
      <CommentCount postId={post._id} />
      <p className="text-gray-700 mb-6">{post.description}</p>

      <p className="mb-4 text-sm text-white bg-blue-500 inline-block px-3 py-1 rounded-full">
        Tag: {post.tag}
      </p>

      {/* Voting and sharing buttons */}
      <div className="flex flex-wrap items-center gap-4 mt-8">
        

        <button
  onClick={() => {
    if (!user) return toast.error("Please log in to upvote.");
    upvoteMutation.mutate();
  }}
  className="btn btn-sm btn-outline"
>
  👍 Upvote ({post.upVote || 0})
</button>

<button
  onClick={() => {
    if (!user) return toast.error("Please log in to downvote.");
    downvoteMutation.mutate();
  }}
  className="btn btn-sm btn-outline"
>
  👎 Downvote ({post.downVote || 0})
</button>


       {user ? (
  <div className="flex gap-4">
 <FacebookShareButton 
  url={`http://localhost:5173/post/${id}`} 
  quote={`${post.title}`}
  hashtag={`#${post.tag}`} // Optional: add tag as hashtag
  className="flex items-center justify-center"
>
  <FacebookIcon size={32} round />
  <span className="ml-2">Share on Facebook</span>
</FacebookShareButton>

  </div>
) : (
  <p className="text-red-500">Please log in to share this post.</p>
)}


      </div>

      {/* Comments Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>

        {/* Comment form */}
        {user ? (
          <form onSubmit={handleCommentSubmit} className="mb-6">
            <textarea
              rows={3}
              className="w-full border p-3 rounded"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              disabled={addCommentMutation.isLoading}
            />
            <button
              type="submit"
              className="btn btn-primary mt-2"
              disabled={addCommentMutation.isLoading || !commentText.trim()}
            >
              {addCommentMutation.isLoading ? "Posting..." : "Post Comment"}
            </button>
          </form>
        ) : (
          <p className="text-red-600">Please log in to comment.</p>
        )}

        {/* Comments list */}
        {commentsLoading ? (
          <p>Loading comments...</p>
        ) : comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
//           comments.map((comment) => (
//             <div
//               key={comment._id}
//               className="mb-4 p-4 border rounded bg-gray-50"
//             >
//               <div className="flex items-center mb-2">
//                 {comment.authorImage && (
//                   <img
//                     src={comment.authorImage}
//                     alt={comment.authorName}
//                     className="w-8 h-8 rounded-full mr-2"
//                   />
//                 )}
//                 <span className="font-semibold"> {comment.authorName}</span>
//                 <span className="font-semibold ml-2">{comment.
// authorEmail}</span>
//                 <span className="ml-auto text-xs text-gray-500">
//                   {new Date(comment.createdAt).toLocaleString()}
//                 </span>
//               </div>
//               <p>{comment.commentText}</p>
//             </div>
//           ))
//  <ReportComments postId={post._id} /> 
 <ReportComments postId={post._id}   comments={comments}    loading={commentsLoading} refetch={refetchComments}/>

        )}
      </div>
    </div>
  );
};

export default PostDetails;

// import React, { useState, useEffect, useContext } from "react";
// import { useParams, useNavigate } from "react-router";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import useAxios from "../../hook/useAxios";
// import { AuthContext } from "../../context/AuthContext"; 
// import CommentCount from "../../Component/CommentCount";

// const PostDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const axiosSecure = useAxios();
//   const queryClient = useQueryClient();
//   const { user } = useContext(AuthContext);

//   // Fetch post data
//   const { data: post, isLoading } = useQuery({
//     queryKey: ["post", id],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/posts/${id}`);
//       return res.data;
//     },
//   });

//   // Upvote mutation
//   const upvoteMutation = useMutation({
//     mutationFn: async () => axiosSecure.patch(`/posts/upvote/${id}`),
//     onSuccess: () => {
//       toast.success("Upvoted!");
//       queryClient.invalidateQueries(["post", id]);
//     },
//   });

//   // Downvote mutation
//   const downvoteMutation = useMutation({
//     mutationFn: async () => axiosSecure.patch(`/posts/downvote/${id}`),
//     onSuccess: () => {
//       toast.success("Downvoted!");
//       queryClient.invalidateQueries(["post", id]);
//     },
//   });

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <span className="loading loading-spinner loading-lg"></span>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-3xl mx-auto px-6 py-10 bg-white shadow-md rounded-xl mt-6">
//       {/* Post author info */}
//       <div className="flex items-center gap-4 mb-6">
//         <img
//           src={post.authorImage}
//           alt={post.authorName}
//           className="w-14 h-14 rounded-full"
//         />
//         <div>
//           <p className="text-lg font-semibold">{post.authorName}</p>
//           <p className="text-sm text-gray-500">
//             {new Date(post.createdAt).toLocaleString()}
//           </p>
//         </div>
//       </div>

//       {/* Post title and description */}
//       <h1 className="text-3xl font-bold text-blue-700 mb-4">{post.title}</h1>
//       <CommentCount postId={post._id} />
//       <p className="text-gray-700 mb-6">{post.description}</p>

//       <p className="mb-4 text-sm text-white bg-blue-500 inline-block px-3 py-1 rounded-full">
//         Tag: {post.tag}
//       </p>

//       {/* Voting buttons */}
//       <div className="flex flex-wrap items-center gap-4 mt-8">
//         <button
//           onClick={() => {
//             if (!user) return toast.error("Please log in to upvote.");
//             upvoteMutation.mutate();
//           }}
//           className="btn btn-sm btn-outline"
//         >
//           👍 Upvote ({post.upVote || 0})
//         </button>

//         <button
//           onClick={() => {
//             if (!user) return toast.error("Please log in to downvote.");
//             downvoteMutation.mutate();
//           }}
//           className="btn btn-sm btn-outline"
//         >
//           👎 Downvote ({post.downVote || 0})
//         </button>

//         {/* Comment button redirects to comment reporting page */}
//         <button
//           onClick={() => navigate(`/comments/${id}`)}
//           className="btn btn-sm btn-info"
//         >
//           💬 Comments
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PostDetails;
