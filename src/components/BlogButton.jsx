import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBlog } from "react-icons/fa";

const BlogButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide button if on '/view-blog' page
  if (location.pathname === "/view-blog") return null;

  return (
    <div className="fixed bottom-24 right-6">
      <button
        onClick={() => navigate("/view-blog")}
        className="flex items-center justify-center bg-blue-600 text-white p-3 rounded-full 
                   shadow-lg hover:bg-blue-700 transition transform hover:scale-110 active:scale-95"
      >
        <FaBlog size={24} />
      </button>
    </div>
  );
};

export default BlogButton;
