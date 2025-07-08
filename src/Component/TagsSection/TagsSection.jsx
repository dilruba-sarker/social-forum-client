import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hook/useAxios";

const TagsSection = ({ onTagClick }) => {
  const axiosSecure = useAxios();

  const { data: tags = [], isLoading, isError } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tags");
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading tags...</div>;
  }

  if (isError) {
    return <div>Failed to load tags</div>;
  }

  return (
    <div className="my-6 p-4 bg-gray-100 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-2">Browse by Tags:</h3>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagClick(tag)}
            className="px-4 py-2 bg-blue-200 hover:bg-blue-300 text-sm font-medium rounded-full"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagsSection;
