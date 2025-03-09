import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogById } from "../services/allAPIS";
import BlogDetails from "../components/BlogDetails";

const BlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        const header = { authorization: `Bearer ${token}` };
  
      try {
        const response = await getBlogById(id,header);
        console.log("response==",response);
        
        if (response.status === 200) {
          setBlog(response.data);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    }
    };

    fetchBlog();
  }, [id]);

  return (
    <div className="p-6">
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : blog ? (
        <BlogDetails blog={blog} />
      ) : (
        <p className="text-center text-gray-500">Blog not found</p>
      )}
    </div>
  );
};

export default BlogPage;
