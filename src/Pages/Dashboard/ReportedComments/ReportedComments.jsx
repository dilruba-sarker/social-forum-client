


import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hook/useAxios";
import { toast } from "react-hot-toast";

const COMMENTS_PER_PAGE = 10;

const ReportedComments = () => {
  const axiosSecure = useAxios();
  const [currentPage, setCurrentPage] = useState(1);

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

  // Pagination logic
  const totalPages = Math.ceil(reports.length / COMMENTS_PER_PAGE);
  const startIndex = (currentPage - 1) * COMMENTS_PER_PAGE;
  const currentReports = reports.slice(startIndex, startIndex + COMMENTS_PER_PAGE);

  // Optional: reset to page 1 when refetch completes and data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [reports.length]);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Reported Comments</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : reports.length === 0 ? (
        <p>No reported comments found.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Mobile view - cards */}
              <div className="sm:hidden space-y-4">
                {currentReports.map((report) => (
                  <div key={report._id} className="border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <img
                        src={report.authorImage}
                        alt={report.authorName}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium">{report.authorName}</p>
                        <p className="text-sm text-gray-600">{report.authorEmail}</p>
                      </div>
                    </div>
                    <div className="mb-2">
                      <p className="text-sm font-semibold">Feedback:</p>
                      <p className="text-red-600">{report.feedback}</p>
                    </div>
                    <div className="mb-3">
                      <p className="text-sm font-semibold">Reported At:</p>
                      <p className="text-sm">
                        {new Date(report.reportedAt).toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAccept(report._id)}
                        className="btn btn-sm btn-success flex-1"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(report._id)}
                        className="btn btn-sm btn-error flex-1"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tablet and larger view - table */}
              <table className="hidden sm:table w-full border">
                <thead>
                  <tr className="bg-gray-100 text-sm">
                    <th className="p-3">Author</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Feedback</th>
                    <th className="p-3">Reported At</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentReports.map((report) => (
                    <tr key={report._id} className="border-b">
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={report.authorImage}
                            alt={report.authorName}
                            className="w-8 h-8 rounded-full"
                          />
                          <span>{report.authorName}</span>
                        </div>
                      </td>
                      <td className="p-3">{report.authorEmail}</td>
                      <td className="p-3 text-red-600 font-medium">{report.feedback}</td>
                      <td className="p-3">
                        {new Date(report.reportedAt).toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </td>
                      <td className="p-3 space-x-2">
                        <button
                          onClick={() => handleAccept(report._id)}
                          className="btn btn-xs sm:btn-sm btn-success"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(report._id)}
                          className="btn btn-xs sm:btn-sm btn-error"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center gap-1 sm:gap-2">
              <button
                className="btn btn-xs sm:btn-sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                « Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`btn btn-xs sm:btn-sm ${
                    currentPage === i + 1 ? "btn-primary" : "btn-outline"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                className="btn btn-xs sm:btn-sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next »
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ReportedComments;