// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../../context/AuthContext";
// import useAxios from "../../../hook/useAxios";


// const MyProfile = () => {
//   const { user } = useContext(AuthContext);
//   const axiosSecure = useAxios();
//   const [userInfo, setUserInfo] = useState(null);
//   const [recentPosts, setRecentPosts] = useState([]);

//   useEffect(() => {
//     const fetchUserInfoAndPosts = async () => {
//       if (!user?.email) return;

//       try {
//         const [userRes, postsRes] = await Promise.all([
//           axiosSecure.get(`/users/${user.email}`),
//           axiosSecure.get(`/posts/recent?email=${user.email}&limit=3`),
//         ]);

//         setUserInfo(userRes.data);
//         setRecentPosts(postsRes.data);
//       } catch (err) {
//         console.error("Error loading profile:", err);
//       }
//     };

//     fetchUserInfoAndPosts();
//   }, [user, axiosSecure]);

//   if (!userInfo) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <span className="loading loading-spinner loading-lg"></span>
//       </div>
//     );
//   }

//   const { displayName, email, photoURL, badge } = userInfo;

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow mt-10">
//       <div className="flex items-center gap-6 mb-6">
//         <img
//           src={photoURL || "https://i.ibb.co/2kR5zq0/default-user.png"}
//           alt="Profile"
//           className="w-24 h-24 rounded-full object-cover"
//         />
//         <div>
//           <h2 className="text-2xl font-bold">{displayName}</h2>
//           <p className="text-gray-600">{email}</p>

//           <div className="mt-2">
//             {badge === "Gold" ? (
//               <span className="badge badge-warning text-white">🏅 Gold Badge</span>
//             ) : (
//               <span className="badge badge-bronze bg-amber-600 text-white">🥉 Bronze Badge</span>
//             )}
//           </div>
//         </div>
//       </div>

//       <hr className="mb-6" />

//       <h3 className="text-xl font-semibold mb-4">My Recent Posts</h3>

//       {recentPosts.length === 0 ? (
//         <p className="text-gray-500">You haven't added any posts yet.</p>
//       ) : (
//         <ul className="space-y-4">
//           {recentPosts.map((post) => (
//             <li key={post._id} className="border p-4 rounded-lg shadow-sm">
//               <h4 className="text-lg font-semibold">{post.title}</h4>
//               <p className="text-gray-700">{post.description.slice(0, 100)}...</p>
//               <span className="text-sm text-blue-500">#{post.tag}</span>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default MyProfile;
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import useAxios from "../../../hook/useAxios";
import * as XLSX from "xlsx"; // Make sure to install: npm install xlsx

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxios();
  const [userInfo, setUserInfo] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    const fetchUserInfoAndPosts = async () => {
      if (!user?.email) return;

      try {
        const [userRes, postsRes] = await Promise.all([
          axiosSecure.get(`/users/${user.email}`),
          axiosSecure.get(`/posts/recent?email=${user.email}&limit=10`),
        ]);

        setUserInfo(userRes.data);
        setRecentPosts(postsRes.data);
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    };

    fetchUserInfoAndPosts();
  }, [user, axiosSecure]);

  if (!userInfo) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const { displayName, email, photoURL, badge } = userInfo;

  // ✅ Function to download all post data along with user info
  const handleDownloadPosts = () => {
    if (recentPosts.length === 0) return;

    // Create new workbook
    const workbook = XLSX.utils.book_new();

    // Prepare data: header + all posts with user info
    const postsData = [
      ["User Name", "Email", "Badge", "Title", "Description", "Tag"], // Header
      ...recentPosts.map((post) => [
        displayName,
        email,
        badge,
        post.title,
        post.description,
        post.tag,
      ]),
    ];

    // Convert array to worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(postsData);

    // Append worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "MyPosts");

    // Save Excel file
    XLSX.writeFile(workbook, "MyPosts.xlsx");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow mt-10">
      <div className="flex items-center gap-6 mb-6">
        <img
          src={photoURL || "https://i.ibb.co/2kR5zq0/default-user.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold">{displayName}</h2>
          <p className="text-gray-600">{email}</p>
          <div className="mt-2">
            {badge === "Gold" ? (
              <span className="badge badge-warning text-white">🏅 Gold Badge</span>
            ) : (
              <span className="badge badge-bronze bg-amber-600 text-white">🥉 Bronze Badge</span>
            )}
          </div>
        </div>
      </div>

      <hr className="mb-6" />

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">My Recent Posts</h3>
        {recentPosts.length > 0 && (
          <button
            onClick={handleDownloadPosts}
            className="btn btn-sm btn-primary"
          >
            Download Data
          </button>
        )}
      </div>

      {recentPosts.length === 0 ? (
        <p className="text-gray-500">You haven't added any posts yet.</p>
      ) : (
        <ul className="space-y-4">
          {recentPosts.map((post) => (
            <li key={post._id} className="border p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold">{post.title}</h4>
              <p className="text-gray-700">{post.description.slice(0, 100)}...</p>
              <span className="text-sm text-blue-500">#{post.tag}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyProfile;

