import React, { useState } from "react";
import toast from "react-hot-toast";
import useAxios from "../hook/useAxios";

const ReportComments = ({ postId, comments = [], loading, refetch }) => {
  const axiosSecure = useAxios();

  // Track selected feedback per comment
  const [selectedFeedback, setSelectedFeedback] = useState({});

  // Track which comments have been reported
  const [reportedComments, setReportedComments] = useState({});

  // Static feedback options
  const feedbackOptions = [
    "Spam or advertising",
    "Offensive or inappropriate",
    "Irrelevant or off-topic",
  ];

  const handleFeedbackChange = (commentId, feedback) => {
    setSelectedFeedback((prev) => ({
      ...prev,
      [commentId]: feedback,
    }));
  };

  const handleReportClick = async (commentId) => {
    const feedback = selectedFeedback[commentId];
    if (!feedback) return;

    try {
      await axiosSecure.post(`/comments/${commentId}/report`, { feedback });
      toast.success("Comment reported successfully.");
      setReportedComments((prev) => ({ ...prev, [commentId]: true }));
      refetch(); // Refresh comment list if needed
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
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Commenter Email</th>
            <th>Comment</th>
            <th>Feedback</th>
            <th>Report</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => {
            const isReported = reportedComments[comment._id];
            return (
              <tr key={comment._id}>
                <td>{comment.authorEmail}</td>
                <td>{comment.commentText}</td>
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
                    className="btn btn-sm btn-error"
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
    </div>
  );
};

export default ReportComments;
