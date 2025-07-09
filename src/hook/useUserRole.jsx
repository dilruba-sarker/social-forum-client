import { useQuery } from '@tanstack/react-query';

import { useContext } from 'react';
import useAxios from './useAxios';
import { AuthContext } from '../context/AuthContext';


const useUserRole = () => {
  const axiosSecure = useAxios();
  const { user } = useContext(AuthContext);

  const { data: roleData, isLoading, isError } = useQuery({
    queryKey: ['userRole', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data;
    },
  });

  return {
    role: roleData?.role || null,
    isRoleLoading: isLoading,
    isRoleError: isError,
  };
};

export default useUserRole;
