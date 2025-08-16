import React from 'react';
import useAxios from '../hook/useAxios';
import { useQuery } from '@tanstack/react-query';

const CountAnnouncement = () => {

    const axiosSecure = useAxios();

  const { data: announcements = [] } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/announcements");
      return res.data;
    },
  });
    return (
        <div className='flex'>
            <p>📢</p>
            <h2 className=" flex text-black">{announcements.length}</h2>
        </div>
    );
};

export default CountAnnouncement;