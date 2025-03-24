import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTags, FaCalendarAlt, FaFolderOpen } from "react-icons/fa";
import { motion } from "framer-motion";

import { BlogContext } from "../Context/BlogContext";
import { server_url } from "../services/server_url";

const BlogListingPage = () => {
  const { allBlogs } = useContext(BlogContext);
  useEffect(() => {
console.log(allBlogs);

  }, []);
  return (
    <div className="max-w-6xl mx-auto p-6 mt-5">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        📝 Latest Blogs
      </h1>

      {allBlogs?.length === 0 ? (
        <p className="text-center text-gray-500">No blogs available.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {allBlogs.map((blog) => (
            <motion.div
              key={blog._id}
              whileHover={{ scale: 1.03 }}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition"
            >
              <Link to={`/view-blog/${blog._id}`}>
                {/* Blog Thumbnail */}
                <img
                  src={`${server_url}/uploads/blogs/${blog.thumbnail}`}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">
                  {/* Blog Title */}
                  <h2 className="text-xl font-semibold text-gray-800">
                    {blog.title}
                  </h2>

                  {/* Blog Meta */}
                  <div className="mt-2 flex items-center space-x-4 text-gray-500 text-sm">
                    <FaCalendarAlt />{" "}
                    <span>{new Date(blog.createdAt).toDateString()}</span>
                    <FaFolderOpen /> <span>{blog.category}</span>
                  </div>

                  {/* Tags */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {blog.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs"
                      >
                        <FaTags className="inline mr-1" /> {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogListingPage;




  