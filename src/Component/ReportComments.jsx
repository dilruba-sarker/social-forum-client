
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useAxios from "../hook/useAxios";

const ReportComments = ({ postId }) => {
  const axiosSecure = useAxios();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState({});
  const [reportedComments, setReportedComments] = useState({});
  const [modalComment, setModalComment] = useState(null);

  const feedbackOptions = [
    "Spam or advertising",
    "Offensive or inappropriate",
    "Irrelevant or off-topic",
  ];

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axiosSecure.get(`/posts/${postId}/comments`);
        setComments(res.data);
      } catch (error) {
        toast.error("Failed to load comments.");
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [postId, axiosSecure]);

  const handleFeedbackChange = (commentId, feedback) => {
    setSelectedFeedback((prev) => ({ ...prev, [commentId]: feedback }));
  };

  const handleReportClick = async (commentId) => {
    const feedback = selectedFeedback[commentId];
    if (!feedback) return;

    try {
      await axiosSecure.post(`/comments/${commentId}/report`, { feedback });
      toast.success("Comment reported successfully.");
      setReportedComments((prev) => ({ ...prev, [commentId]: true }));
    } catch (error) {
      toast.error("Failed to report comment.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (comments.length === 0) {
    return <p className="text-center text-gray-500 mt-6">No comments found.</p>;
  }

  return (
    <div className="overflow-x-auto max-w-5xl mx-auto mt-6">
      <table className="table  w-full ">
        <thead>
          <tr>
            <th className="text-gray-500">Commenter Email</th>
            <th className="text-gray-500">Comment</th>
            <th className="text-gray-500">Feedback</th>
            <th className="text-gray-500">Report</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => {
            const isReported = reportedComments[comment._id];
            const isLong = comment.commentText.length > 20;
            const displayText = isLong
              ? `${comment.commentText.slice(0, 20)}... `
              : comment.commentText;

            return (
              <tr key={comment._id}>
                <td className="text-black">{comment.authorEmail}</td>
                <td className="text-black ">
                  {displayText}
                  {isLong && (
                    <button
                      onClick={() => setModalComment(comment.commentText)}
                      className=" text-black underline ml-1"
                    >
                      Read More
                    </button>
                  )}
                </td>
                <td>
                  <select
                    className="select select-bordered select-sm max-w-xs"
                    disabled={isReported}
                    value={selectedFeedback[comment._id] || ""}
                    onChange={(e) =>
                      handleFeedbackChange(comment._id, e.target.value)
                    }
                  >
                    <option value="">Select feedback</option>
                    {feedbackOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    disabled={!selectedFeedback[comment._id] || isReported}
                    onClick={() => handleReportClick(comment._id)}
                  >
                    {isReported ? "Reported" : "Report"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Modal for full comment */}
      {modalComment && (
        <dialog id="commentModal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Full Comment</h3>
            <p className="text-gray-700">{modalComment}</p>
            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setModalComment(null)}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ReportComments;
