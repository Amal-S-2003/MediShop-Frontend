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
    <div className="max-w-6xl mx-auto p-6">
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



[
    {
      "_id": { "$oid": "67d12345b7ce3fdb31ba6700" },
      "title": "The Future of Medical Technology: Innovations in Healthcare",
      "caption": "How AI, Robotics, and IoT are Revolutionizing Medicine",
      "content": "The healthcare industry is experiencing rapid advancements in technology. From artificial intelligence (AI)-powered diagnostics to robotic surgeries and wearable health devices, innovation is reshaping patient care. AI algorithms now assist doctors in detecting diseases earlier and more accurately, while robotic systems perform minimally invasive surgeries with high precision. The Internet of Things (IoT) has also made remote patient monitoring a reality, improving healthcare accessibility and efficiency.",
      "category": "Medical Technology",
      "tags": ["AI in Medicine", "Healthcare Innovation", "Robotics"],
      "thumbnail": "1741491234567-medtech-thumbnail.jpg",
      "images": [
        "1741491234789-hospital-robotics.jpg",
        "1741491234900-ai-diagnostics.jpg"
      ],
      "videos": [
        "https://www.youtube.com/watch?v=3b3yYfLAxDs"
      ],
      "createdAt": { "$date": "2025-03-10T10:30:00.000Z" },
      "updatedAt": { "$date": "2025-03-10T10:30:00.000Z" },
      "__v": 0
    },
    {
      "_id": { "$oid": "67d12345b7ce3fdb31ba6701" },
      "title": "Wearable Health Devices: A New Era of Patient Monitoring",
      "caption": "Smartwatches, Biosensors, and the Rise of Digital Health",
      "content": "Wearable devices have transformed how we monitor health. Smartwatches, biosensors, and fitness trackers now provide real-time data on heart rate, oxygen levels, sleep quality, and more. These devices help detect early signs of health issues, allowing for preventive care and better patient outcomes. The integration of AI and IoT enables seamless data collection and analysis, making personalized healthcare more accessible than ever.",
      "category": "Digital Health",
      "tags": ["Wearable Tech", "Remote Patient Monitoring", "Healthcare Gadgets"],
      "thumbnail": "1741491235678-wearable-tech.jpg",
      "images": [
        "1741491235900-smartwatch-health.jpg",
        "1741491236011-biosensor-data.jpg"
      ],
      "videos": [
        "https://www.youtube.com/watch?v=8Zly6mjP1gU"
      ],
      "createdAt": { "$date": "2025-03-10T11:00:00.000Z" },
      "updatedAt": { "$date": "2025-03-10T11:00:00.000Z" },
      "__v": 0
    }
  ]
  