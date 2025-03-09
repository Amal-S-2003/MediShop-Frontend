import React, { useContext } from "react";
import { BlogContext } from "../Context/BlogContext";
import { toast, ToastContainer } from "react-toastify";
import { deleteBlog } from "../services/allAPIS";
import { server_url } from "../services/server_url";
import { FaTrash, FaCalendarAlt, FaTag } from "react-icons/fa";

const ViewBlogs = () => {
  const { allBlogs, fetchBlogs } = useContext(BlogContext);

  // ✅ Handle Delete Blog
  const handleDelete = async (id) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Please log in first.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;

    try {
      const result = await deleteBlog(id, { authorization: `Bearer ${token}` });
      if (result.status == 200) {
        toast.success("Blog deleted successfully!");
        fetchBlogs(); // Refresh blog list
      } else {
        toast.warn("Blog deletion failed");
      }
    } catch (error) {
      toast.error("Failed to delete blog.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">📑 Manage Blogs</h1>

      {allBlogs.length === 0 ? (
        <p className="text-gray-500 text-center">No blogs available.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {allBlogs.map((blog) => (
            <div
              key={blog._id}
              className="border p-4 shadow-lg rounded-lg bg-white"
            >
              {/* Blog Thumbnail */}
              <img
                src={`${server_url}/uploads/blogs/${blog.thumbnail}`}
                alt={blog.title}
                className="w-full h-40 object-cover rounded-md"
              />

              {/* Blog Title & Info */}
              <h3 className="font-bold text-lg mt-2">{blog.title}</h3>
              <p className="text-gray-600 text-sm flex items-center">
                <FaCalendarAlt className="mr-1" />{" "}
                {new Date(blog.createdAt).toDateString()}
              </p>
              <p className="text-gray-600 text-sm flex items-center">
                <FaTag className="mr-1" /> {blog.category}
              </p>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(blog._id)}
                className="mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center justify-center w-full"
              >
                <FaTrash className="mr-2" /> Delete Blog
              </button>
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ViewBlogs;
