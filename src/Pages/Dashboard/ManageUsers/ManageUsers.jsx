import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hook/useAxios";


const ManageUsers = () => {
  const axiosSecure = useAxios();
  const [search, setSearch] = useState("");

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allUsers", search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/all?search=${search}`);
      console.log("ressss",res)
      return res.data;
    },
  });
console.log(" users ", users )
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

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>

      <input
        type="text"
        placeholder="Search by name..."
        className="input input-bordered mb-4 w-full max-w-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Membership</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.displayName}</td>
                  <td>{user.email}</td>
                  <td>{user.badge || "Bronze"}</td>
                  <td>
                    {user.role === "admin" ? (
                      <span className="text-green-500 font-semibold">Admin</span>
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
      )}
    </div>
  );
};

export default ManageUsers;
