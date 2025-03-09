import { createContext, useEffect, useState } from "react";
import { getAllBlogs } from "../services/allAPIS";

export const BlogContext = createContext();
export const BlogContextProvider = (props) => {
  const [allBlogs, setAllBlogs] = useState([]);

  // ✅ Fetch Blogs from API
  const fetchBlogs = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = { authorization: `Bearer ${token}` };
      try {
        const response = await getAllBlogs(reqHeader);
        setAllBlogs(response.data);

        console.log("allBlogsallBlogs", response);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    }
  };
  // ✅ Fetch Blogs on Component Mount
  useEffect(() => {
    fetchBlogs();
  }, []);
  const value = { allBlogs, setAllBlogs, fetchBlogs };
  return (
    <BlogContext.Provider value={value}>{props.children}</BlogContext.Provider>
  );
};
