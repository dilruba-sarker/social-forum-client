import { useQuery } from "@tanstack/react-query";

import useAxios from "../hook/useAxios";

const CommentCount = ({ postId }) => {


      const axiosSecure = useAxios();
  const { data, isLoading } = useQuery({
    queryKey: ["commentCount", postId],
    queryFn: async () => {
       const res = await axiosSecure.get(`/comments/count/${postId}`);
    
      return res.data.count;
      
    },
    enabled: !!postId, // prevent running query when postId is not available
  });

  if (isLoading) return <span>Loading...</span>;
  return <span> Total Comments: {data}</span>;
};

export default CommentCount;
