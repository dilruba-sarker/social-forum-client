import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../context/AuthContext';
import useAxios from '../../../hook/useAxios';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const AdminProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxios();
  const [tag, setTag] = useState("");

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/stats');
      return res.data;
    },
  });

  const chartData = [
    { name: 'Posts', value: stats.postCount || 0 },
    { name: 'Comments', value: stats.commentCount || 0 },
    { name: 'Users', value: stats.userCount || 0 },
  ];

  const handleTagSubmit = async (e) => {
    e.preventDefault();
    if (!tag.trim()) return toast.error("Tag name required");
    try {
      const res = await axiosSecure.post("/tags", { name: tag.trim() });
      if (res.data.success) {
        toast.success("Tag added");
        setTag("");
      }
    } catch (err) {
      if (err.response?.status === 409) {
        toast.error("Tag already exists");
      } else {
        toast.error("Failed to add tag");
      }
    }
  };

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Admin Info */}
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={user?.photoURL}
          alt="Admin"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-bold">{user?.displayName}</h2>
          <p className="text-sm text-gray-600">{user?.email}</p>
        </div>
      </div>

      {/* Stats Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mb-8">
        <div className="p-4 bg-gray-100 rounded">
          <p className="text-2xl font-bold">{stats.postCount}</p>
          <p className="text-gray-600">Total Posts</p>
        </div>
        <div className="p-4 bg-gray-100 rounded">
          <p className="text-2xl font-bold">{stats.commentCount}</p>
          <p className="text-gray-600">Total Comments</p>
        </div>
        <div className="p-4 bg-gray-100 rounded">
          <p className="text-2xl font-bold">{stats.userCount}</p>
          <p className="text-gray-600">Total Users</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="w-full h-72 mb-8">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Tag Add Form */}
      <div className="bg-gray-50 p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Add New Tag</h3>
        <form onSubmit={handleTagSubmit} className="flex gap-2">
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="Enter tag name"
            className="input input-bordered w-full max-w-xs"
          />
          <button className="btn btn-primary">Add Tag</button>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
