import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useAxios from "../../../hook/useAxios";
import { AuthContext } from "../../../context/AuthContext";

const MakeAnnouncement = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxios();
  

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const announcement = {
      authorName: user.displayName,
      authorEmail: user.email,
      authorImage: user.photoURL,
      title: data.title,
      description: data.description,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/announcements", announcement);
      if (res.data.success) {
        toast.success("Announcement posted");
        reset();
      }
    } catch (err) {
      toast.error("Failed to post announcement");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md p-6 mt-10 rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">📢 Make an Announcement</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="label">Author Name</label>
          <input
            className="input input-bordered w-full bg-gray-100"
            value={user?.displayName}
            readOnly
          />
        </div>

        <div>
          <label className="label">Author Image</label>
          <input
            className="input input-bordered w-full bg-gray-100"
            value={user?.photoURL}
            readOnly
          />
        </div>

        <div>
          <label className="label">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            className="input input-bordered w-full"
            placeholder="Enter announcement title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="label">Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            className="textarea textarea-bordered w-full"
            rows={5}
            placeholder="Write your announcement..."
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Submit Announcement
        </button>
      </form>
    </div>
  );
};

export default MakeAnnouncement;
