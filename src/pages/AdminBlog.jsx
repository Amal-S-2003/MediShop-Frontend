import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    mission: "",
    vision: "",
    specifications: [],
    images: [],
    videos: [],
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Fetch all blog data
  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/blogs");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  // Handle Adding New Blog
  const handleAddBlog = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/blogs/add", formData);
      toast.success("Blog added successfully!");
      fetchBlogs();
      resetForm();
    } catch (error) {
      toast.error("Error adding blog");
    }
  };

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Adding Specification
  const addSpecification = () => {
    setFormData({ ...formData, specifications: [...formData.specifications, { title: "", data: "" }] });
  };

  // Handle Removing Specification
  const removeSpecification = (index) => {
    const updatedSpecs = formData.specifications.filter((_, i) => i !== index);
    setFormData({ ...formData, specifications: updatedSpecs });
  };

  // Handle Changing Specification
  const handleSpecificationChange = (index, field, value) => {
    const updatedSpecs = [...formData.specifications];
    updatedSpecs[index][field] = value;
    setFormData({ ...formData, specifications: updatedSpecs });
  };

  // Handle Adding Image
  const addImage = () => {
    setFormData({ ...formData, images: [...formData.images, { url: "", description: "" }] });
  };

  // Handle Removing Image
  const removeImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updatedImages });
  };

  // Handle Image Change
  const handleImageChange = (index, field, value) => {
    const updatedImages = [...formData.images];
    updatedImages[index][field] = value;
    setFormData({ ...formData, images: updatedImages });
  };

  // Handle Adding Video
  const addVideo = () => {
    setFormData({ ...formData, videos: [...formData.videos, { url: "", description: "" }] });
  };

  // Handle Removing Video
  const removeVideo = (index) => {
    const updatedVideos = formData.videos.filter((_, i) => i !== index);
    setFormData({ ...formData, videos: updatedVideos });
  };

  // Handle Video Change
  const handleVideoChange = (index, field, value) => {
    const updatedVideos = [...formData.videos];
    updatedVideos[index][field] = value;
    setFormData({ ...formData, videos: updatedVideos });
  };

  // Reset Form
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      mission: "",
      vision: "",
      specifications: [],
      images: [],
      videos: [],
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Blog Management</h1>

      {/* Add New Blog Form */}
      <form onSubmit={handleAddBlog} className="bg-white shadow-md p-6 rounded-lg">
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="border p-2 w-full mb-2" required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border p-2 w-full mb-2" required />
        <input type="text" name="mission" placeholder="Mission" value={formData.mission} onChange={handleChange} className="border p-2 w-full mb-2" />
        <input type="text" name="vision" placeholder="Vision" value={formData.vision} onChange={handleChange} className="border p-2 w-full mb-2" />

        {/* Specifications */}
        <h3 className="text-lg font-bold mt-4">Specifications</h3>
        {formData.specifications.map((spec, index) => (
          <div key={index} className="flex gap-2 mt-2">
            <input type="text" placeholder="Title" value={spec.title} onChange={(e) => handleSpecificationChange(index, "title", e.target.value)} className="border p-2 w-1/3" />
            <input type="text" placeholder="Data" value={spec.data} onChange={(e) => handleSpecificationChange(index, "data", e.target.value)} className="border p-2 w-1/3" />
            <button type="button" onClick={() => removeSpecification(index)} className="bg-red-500 text-white px-3 py-1 rounded">Remove</button>
          </div>
        ))}
        <button type="button" onClick={addSpecification} className="bg-blue-500 text-white px-3 py-1 rounded mt-2">Add Specification</button>

        {/* Images */}
        <h3 className="text-lg font-bold mt-4">Images</h3>
        {formData.images.map((img, index) => (
          <div key={index} className="flex gap-2 mt-2">
            <input type="text" placeholder="Image URL" value={img.url} onChange={(e) => handleImageChange(index, "url", e.target.value)} className="border p-2 w-1/2" />
            <input type="text" placeholder="Description" value={img.description} onChange={(e) => handleImageChange(index, "description", e.target.value)} className="border p-2 w-1/3" />
            <button type="button" onClick={() => removeImage(index)} className="bg-red-500 text-white px-3 py-1 rounded">Remove</button>
          </div>
        ))}
        <button type="button" onClick={addImage} className="bg-blue-500 text-white px-3 py-1 rounded mt-2">Add Image</button>

        {/* Videos */}
        <h3 className="text-lg font-bold mt-4">Videos</h3>
        {formData.videos.map((vid, index) => (
          <div key={index} className="flex gap-2 mt-2">
            <input type="text" placeholder="Video URL" value={vid.url} onChange={(e) => handleVideoChange(index, "url", e.target.value)} className="border p-2 w-1/2" />
            <input type="text" placeholder="Description" value={vid.description} onChange={(e) => handleVideoChange(index, "description", e.target.value)} className="border p-2 w-1/3" />
            <button type="button" onClick={() => removeVideo(index)} className="bg-red-500 text-white px-3 py-1 rounded">Remove</button>
          </div>
        ))}
        <button type="button" onClick={addVideo} className="bg-blue-500 text-white px-3 py-1 rounded mt-2">Add Video</button>

        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-4">Save Blog</button>
      </form>
    </div>
  );
};

export default AdminBlog;
