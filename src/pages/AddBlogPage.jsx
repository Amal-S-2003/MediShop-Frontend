import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { addBlog } from "../services/allAPIS"; // API Call
import { FaTrash, FaPlus, FaUpload, FaVideo, FaImage } from "react-icons/fa";

const AddBlogPage = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    caption: "",
    content: "",
    category: "",
    tags: "",
    thumbnail: null,
    images: [],
    videos: [],
  });

  const [videoURL, setVideoURL] = useState("");

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Thumbnail Upload
  const handleThumbnailUpload = (e) => {
    setBlogData({ ...blogData, thumbnail: e.target.files[0] });
  };

  // ✅ Handle Multiple Image Upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setBlogData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  // ✅ Remove Image
  const removeImage = (index) => {
    setBlogData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // ✅ Add Video URL
  const addVideo = (a) => {
    e.preventDefault();
    if (videoURL.trim()) {
      setBlogData((prev) => ({
        ...prev,
        videos: [...prev.videos, videoURL],
      }));
      setVideoURL(""); // Reset input
    }
  };

  // ✅ Remove Video
  const removeVideo = (index) => {
    setBlogData((prev) => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index),
    }));
  };

  // ✅ Submit Blog
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!blogData.title || !blogData.caption || !blogData.content) {
      toast.error("Please fill in all required fields!");
      return;
    }

    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("caption", blogData.caption);
    formData.append("content", blogData.content);
    formData.append("category", blogData.category);
    formData.append("tags", blogData.tags);

    if (blogData.thumbnail) {
      formData.append("thumbnail", blogData.thumbnail);
    }

    // ✅ Append Multiple Images Properly
    blogData.images.forEach((image, index) => {
      formData.append(`images`, image);
    });

    // ✅ Append Multiple Videos as URLs
    blogData.videos.forEach((video, index) => {
      formData.append(`videos`, video);
    });

    // ✅ Debug FormData Before Sending
    console.log("FormData Debug:");
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
    const token = sessionStorage.getItem("token");
    if (token) {
      const header = { authorization: `Bearer ${token}` };

      try {
        console.log("FD", formData.title);

        const response = await addBlog(formData, header);
        if (response.status === 201) {
          toast.success(response.data.message);
          setBlogData({
            title: "",
            caption: "",
            content: "",
            category: "",
            tags: "",
            thumbnail: null,
            images: [],
            videos: [],
          });
        } else {
          toast.error("Failed to add blog.");
        }
      } catch (error) {
        toast.error("Failed to add blog.");
      }
    } else {
      setLoading(false);
      console.log("Please log in.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-4">📝 Add New Blog</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          className="w-full p-2 border rounded"
          value={blogData.title}
          onChange={handleChange}
          required
        />

        {/* Caption */}
        <input
          type="text"
          name="caption"
          placeholder="Short Caption"
          className="w-full p-2 border rounded"
          value={blogData.caption}
          onChange={handleChange}
          required
        />

        {/* Content */}
        <textarea
          name="content"
          placeholder="Blog Content"
          className="w-full p-2 border rounded h-32"
          value={blogData.content}
          onChange={handleChange}
          required
        />

        {/* Category & Tags */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="category"
            placeholder="Category"
            className="w-full p-2 border rounded"
            value={blogData.category}
            onChange={handleChange}
          />
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma-separated)"
            className="w-full p-2 border rounded"
            value={blogData.tags}
            onChange={handleChange}
          />
        </div>

        {/* Thumbnail Upload */}
        <div className="border p-3 rounded">
          <label className="block font-semibold mb-2 flex items-center">
            <FaUpload className="mr-2" /> Upload Thumbnail
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailUpload}
          />
          {blogData.thumbnail && (
            <img
              src={URL.createObjectURL(blogData.thumbnail)}
              alt="Thumbnail"
              className="w-32 h-32 mt-2 rounded shadow-md"
            />
          )}
        </div>

        {/* Multiple Image Upload */}
        <div className="border p-3 rounded">
          <label className="block font-semibold mb-2 flex items-center">
            <FaImage className="mr-2" /> Upload Multiple Images
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />
          <div className="grid grid-cols-4 gap-2 mt-3">
            {blogData.images.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(img)}
                  alt="Upload"
                  className="w-20 h-20 rounded shadow-md"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full"
                >
                  <FaTrash size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Video Upload */}
        <div className="border p-3 rounded">
          <label className="block font-semibold mb-2 flex items-center">
            <FaVideo className="mr-2" /> Add Video URLs
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Paste Video URL"
              className="w-full p-2 border rounded"
              value={videoURL}
              onChange={(e) => setVideoURL(e.target.value)}
            />
            <button
              onClick={(e) => addVideo(e)}
              className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
            >
              <FaPlus />
            </button>
          </div>
          <div className="mt-3">
            {blogData.videos.map((video, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-100 p-2 rounded mb-2"
              >
                <a
                  href={video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  {video}
                </a>
                <button
                  onClick={() => removeVideo(index)}
                  className="text-red-500"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded transition">
          Submit Blog
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddBlogPage;
