import { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router";
import useAxios from "../../hook/useAxios";
import toast from "react-hot-toast";

const MyPosts = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();

  // Fetch all posts by this user
  const { data: myPosts = [], isLoading } = useQuery({
    queryKey: ["myPosts", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/user/${user?.email}`);
 
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Delete post mutation
  const deleteMutation = useMutation({
    mutationFn: async (postId) => {
      return await axiosSecure.delete(`/posts/${postId}`);
    },
    onSuccess: () => {
      toast.success("Post deleted!");
      queryClient.invalidateQueries(["myPosts", user?.email]);
    },
    onError: () => toast.error("Failed to delete post"),
  });

  if (isLoading) {
    return <div className="text-center py-10">Loading your posts...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Posts</h2>

      {myPosts.length === 0 ? (
        <p className="text-gray-500">You haven’t posted anything yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Votes</th>
                <th>Comments</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {myPosts.map((post) => (
                <tr key={post._id}>
                  <td>{post.title}</td>
                  <td>{(post.upVote || 0) - (post.downVote || 0)}</td>
                  <td>
                    <Link
                      to={`/post/${post._id}`}
                      className="btn btn-sm btn-info"
                    >
                      Comment
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this post?")) {
                          deleteMutation.mutate(post._id);
                        }
                      }}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyPosts;
