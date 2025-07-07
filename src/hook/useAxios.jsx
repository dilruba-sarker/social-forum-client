import axios from 'axios';
import React, { use } from 'react';

import { useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';



const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

const  useAxios= () => {
  const { user,logOut } = use(AuthContext);

 

const navigate=useNavigate()
  axiosSecure.interceptors.request.use(
    (config) => {
      if (user?.accessToken) {
        //  console.log("aaaa", user?.accessToken)
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

//   axiosSecure.interceptors.response.use(
//     (res) => res,
//     (error) => {
//       console.log("🔴 Axios Error:", error.status);
//       const status =error.status
//       if(status===403){
// navigate('/forbidden')
//       }else if(status===401){
//         logOut()
//         .then(()=>{
// navigate('/login')
//         })
//         .catch(err=>{
//           console.log(err)
//         })
        
//       }
//       return Promise.reject(error);
//     }
//   );

  return axiosSecure;
};
export default useAxios;