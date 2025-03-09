import React from "react";
import { FaTags, FaCalendarAlt, FaPlayCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { server_url } from "../services/server_url";

const BlogDetails = ({ blog }) => {
  if (!blog)
    return <p className="text-center mt-24 text-gray-500">Blog not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Blog Thumbnail */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-lg shadow-lg"
      >
        <img
          src={`${server_url}/uploads/blogs/${blog.thumbnail}`}
          alt={blog.title}
          className="w-full h-60 object-cover"
        />
      </motion.div>

      {/* Blog Title & Caption */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6"
      >
        <h1 className="text-3xl font-bold text-gray-800">{blog.title}</h1>
        <p className="text-lg text-gray-600 italic">{blog.caption}</p>
      </motion.div>

      {/* Blog Meta */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-2 flex items-center space-x-4 text-gray-500"
      >
        <FaCalendarAlt /> <span>{new Date(blog.createdAt).toDateString()}</span>
        <FaTags /> <span className="text-sm">{blog.category}</span>
      </motion.div>

      {/* Blog Content */}
      <motion.p
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-4 text-gray-700 leading-relaxed"
      >
        {blog.content}
      </motion.p>

      {/* Blog Tags */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-4 flex flex-wrap gap-2"
      >
        {blog.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm"
          >
            #{tag}
          </span>
        ))}
      </motion.div>

      {/* Blog Images Gallery */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="mt-6 grid grid-cols-2 gap-4"
      >
        {blog.images.map((image, index) => (
          <img
            key={index}
            src={`${server_url}/uploads/blogs/${image}`}
            alt={`Gallery ${index}`}
            className="w-full h-40 object-cover rounded-lg shadow-md hover:scale-105 transition-transform"
          />
        ))}
      </motion.div>

      {/* Blog Videos */}
      {blog.videos.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mt-6 space-y-4"
        >
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <FaPlayCircle className="mr-2" /> Videos
          </h2>
          {blog.videos.map((video, index) => (
            <div key={index} className="relative w-full aspect-video">
              <iframe
                className="w-full h-full rounded-lg shadow-lg"
                src={video.replace("watch?v=", "embed/")}
                title={`Video ${index}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default BlogDetails;
