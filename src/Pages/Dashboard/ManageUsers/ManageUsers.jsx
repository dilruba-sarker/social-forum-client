
// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxios from "../../../hook/useAxios";

// const USERS_PER_PAGE = 10;

// const ManageUsers = () => {
//   const axiosSecure = useAxios();
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   // Fetch users
//   const {
//     data: users = [],
//     isLoading,
//     refetch,
//   } = useQuery({
//     queryKey: ["allUsers", search],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/users/all?search=${search}`);
//       return res.data;
//     },
//   });

//   const handleMakeAdmin = async (email) => {
//     try {
//       const res = await axiosSecure.patch(`/users/make-admin/${email}`);
//       if (res.data.success) {
//         refetch();
//         alert("User promoted to admin");
//       }
//     } catch (err) {
//       console.error("Make admin error:", err);
//     }
//   };

//   // Pagination logic
//   const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
//   const startIndex = (currentPage - 1) * USERS_PER_PAGE;
//   const paginatedUsers = users.slice(startIndex, startIndex + USERS_PER_PAGE);

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-4">All Users</h2>

//       <input
//         type="text"
//         placeholder="Search by name..."
//         className="input input-bordered mb-4 w-full max-w-sm overflow-x-hidden"
//         value={search}
//         onChange={(e) => {
//           setSearch(e.target.value);
//           setCurrentPage(1); // Reset page when searching
//         }}
//       />

//       {isLoading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           <div className="overflow-x-auto">
//             <table className="table w-full">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Membership</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paginatedUsers.map((user) => (
//                   <tr key={user._id}>
//                     <td>{user.displayName}</td>
//                     <td>{user.email}</td>
//                     <td>{user.badge || "Bronze"}</td>
//                     <td>
//                       {user.role === "admin" ? (
//                         <span className="text-green-500 font-semibold">Admin</span>
//                       ) : (
//                         <button
//                           onClick={() => handleMakeAdmin(user.email)}
//                           className="btn btn-xs btn-outline"
//                         >
//                           Make Admin
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination Controls */}
//           {totalPages > 1 && (
//             <div className="mt-6 flex justify-center gap-2">
//               <button
//                 className="btn btn-sm"
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//               >
//                 « Prev
//               </button>

//               {Array.from({ length: totalPages }, (_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setCurrentPage(i + 1)}
//                   className={`btn btn-sm ${
//                     currentPage === i + 1 ? "btn-primary" : "btn-outline"
//                   }`}
//                 >
//                   {i + 1}
//                 </button>
//               ))}

//               <button
//                 className="btn btn-sm"
//                 onClick={() =>
//                   setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                 }
//                 disabled={currentPage === totalPages}
//               >
//                 Next »
//               </button>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default ManageUsers;
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hook/useAxios";

const USERS_PER_PAGE = 10;

const ManageUsers = () => {
  const axiosSecure = useAxios();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allUsers", search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/all?search=${search}`);
      return res.data;
    },
  });

  const handleMakeAdmin = async (email) => {
    try {
      const res = await axiosSecure.patch(`/users/make-admin/${email}`);
      if (res.data.success) {
        refetch();
        alert("User promoted to admin");
      }
    } catch (err) {
      console.error("Make admin error:", err);
    }
  };

  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const paginatedUsers = users.slice(startIndex, startIndex + USERS_PER_PAGE);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">All Users</h2>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="input input-bordered w-full max-w-xs md:max-w-sm"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="table w-full text-sm md:text-base">
              <thead className="bg-base-200 text-base-content">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Membership</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user) => (
                  <tr key={user._id}>
                    <td className="whitespace-nowrap">{user.displayName}</td>
                    <td className="whitespace-nowrap">{user.email}</td>
                    <td className="whitespace-nowrap">{user.badge || "Bronze"}</td>
                    <td className="whitespace-nowrap">
                      {user.role === "admin" ? (
                        <span className="text-green-600 font-semibold">Admin</span>
                      ) : (
                        <button
                          onClick={() => handleMakeAdmin(user.email)}
                          className="btn btn-xs btn-outline"
                        >
                          Make Admin
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex flex-wrap justify-center items-center gap-2">
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
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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

export default ManageUsers;
