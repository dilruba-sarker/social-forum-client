import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hook/useAxios";
import { toast } from "react-hot-toast";

const ReportedComments = () => {
  const axiosSecure = useAxios();

  const {
    data: reports = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reportedComments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/reported-comments");
      return res.data;
    },
  });

  const handleAccept = async (id) => {
    try {
      const res = await axiosSecure.patch(`/admin/comments/accept/${id}`);
      if (res.data.success) {
        toast.success("Report accepted and cleared");
        refetch();
      }
    } catch {
      toast.error("Failed to accept report");
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await axiosSecure.delete(`/admin/comments/reject/${id}`);
      if (res.data.success) {
        toast.success("Comment rejected and deleted");
        refetch();
      }
    } catch {
      toast.error("Failed to reject comment");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Reported Comments</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : reports.length === 0 ? (
        <p>No reported comments found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead>
              <tr className="bg-gray-100 text-sm">
                <th>Author</th>
                <th>Email</th>
                {/* <th>Comment</th> */}
                <th>Feedback</th>
                <th>Reported At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report._id}>
                  <td className="flex items-center gap-2">
                    <img
                      src={report.authorImage}
                      alt={report.authorName}
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{report.authorName}</span>
                  </td>
                  <td>{report.authorEmail}</td>
                  {/* <td>{report.commentText}</td> */}
                  <td className="text-red-600 font-medium">{report.feedback}</td>
                  <td>
                    {new Date(report.reportedAt).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="space-x-2">
                    <button
                      onClick={() => handleAccept(report._id)}
                      className="btn btn-xs btn-success"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(report._id)}
                      className="btn btn-xs btn-error"
                    >
                      Reject
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

export default ReportedComments;
