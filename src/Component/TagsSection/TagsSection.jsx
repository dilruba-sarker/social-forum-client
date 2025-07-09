import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hook/useAxios";
// Adjust path based on your structure

const TagsSection = () => {
  const axiosSecure = useAxios();

  const { data: tags = [], isLoading, error } = useQuery({
    queryKey: ["allTags"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tags");
      console.log("resss", res.data)
      return res.data;
    },
  });

  if (isLoading) return <p>Loading tags...</p>;
  if (error) return <p className="text-red-500">Error loading tags</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <h2 className="text-xl font-bold mb-4">All Tags</h2>
      {tags.length === 0 ? (
        <p>No tags found.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag._id}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagsSection;
