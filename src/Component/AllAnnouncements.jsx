import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hook/useAxios";


const AllAnnouncements = () => {
  const axiosSecure = useAxios();

  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/announcements");
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center">Loading...</div>;

  if (!announcements.length) return null; // hide section if no announcements

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4">📢 Latest Announcements ({announcements.length})</h2>
      <div className="space-y-4">
        {announcements.map((item) => (
          <div key={item._id} className="border rounded p-4 shadow">
            <div className="flex items-center gap-2 mb-2">
              <img src={item.authorImage} alt="" className="w-8 h-8 rounded-full" />
              <div>
                <p className="font-semibold">{item.authorName}</p>
                <p className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleString()}</p>
              </div>
            </div>
            <h3 className="text-lg font-bold">{item.title}</h3>
            <p className="text-gray-700">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAnnouncements;
