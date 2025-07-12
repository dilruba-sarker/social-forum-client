// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxios from "../../../hook/useAxios";
// import { toast } from "react-hot-toast";

// const ReportedComments = () => {
//   const axiosSecure = useAxios();

//   const {
//     data: reports = [],
//     isLoading,
//     refetch,
//   } = useQuery({
//     queryKey: ["reportedComments"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/admin/reported-comments");
//       return res.data;
//     },
//   });

//   const handleAccept = async (id) => {
//     try {
//       const res = await axiosSecure.patch(`/admin/comments/accept/${id}`);
//       if (res.data.success) {
//         toast.success("Report accepted and cleared");
//         refetch();
//       }
//     } catch {
//       toast.error("Failed to accept report");
//     }
//   };

//   const handleReject = async (id) => {
//     try {
//       const res = await axiosSecure.delete(`/admin/comments/reject/${id}`);
//       if (res.data.success) {
//         toast.success("Comment rejected and deleted");
//         refetch();
//       }
//     } catch {
//       toast.error("Failed to reject comment");
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-4">Reported Comments</h2>

//       {isLoading ? (
//         <p>Loading...</p>
//       ) : reports.length === 0 ? (
//         <p>No reported comments found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="table w-full border">
//             <thead>
//               <tr className="bg-gray-100 text-sm">
//                 <th>Author</th>
//                 <th>Email</th>
//                 {/* <th>Comment</th> */}
//                 <th>Feedback</th>
//                 <th>Reported At</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {reports.map((report) => (
//                 <tr key={report._id}>
//                   <td className="flex items-center gap-2">
//                     <img
//                       src={report.authorImage}
//                       alt={report.authorName}
//                       className="w-8 h-8 rounded-full"
//                     />
//                     <span>{report.authorName}</span>
//                   </td>
//                   <td>{report.authorEmail}</td>
//                   {/* <td>{report.commentText}</td> */}
//                   <td className="text-red-600 font-medium">{report.feedback}</td>
//                   <td>
//                     {new Date(report.reportedAt).toLocaleString("en-US", {
//                       dateStyle: "medium",
//                       timeStyle: "short",
//                     })}
//                   </td>
//                   <td className="space-x-2">
//                     <button
//                       onClick={() => handleAccept(report._id)}
//                       className="btn btn-xs btn-success"
//                     >
//                       Accept
//                     </button>
//                     <button
//                       onClick={() => handleReject(report._id)}
//                       className="btn btn-xs btn-error"
//                     >
//                       Reject
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReportedComments;
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
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Reported Comments</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : reports.length === 0 ? (
        <p>No reported comments found.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table w-full border">
              <thead>
                <tr className="bg-gray-100 text-sm">
                  <th>Author</th>
                  <th>Email</th>
                  <th>Feedback</th>
                  <th>Reported At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentReports.map((report) => (
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              <button
                className="btn btn-sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                « Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`btn btn-sm ${
                    currentPage === i + 1 ? "btn-primary" : "btn-outline"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                className="btn btn-sm"
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
