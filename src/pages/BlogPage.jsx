import React from "react";

const BlogPage = () => {
  // Dummy Data (Replace with API data if needed)
  const companyDetails = {
    name: "Medizintek",
    description:
      "Medizintek is a leading provider of healthcare technology solutions, offering innovative medical devices and services worldwide.",
    mission:
      "Our mission is to improve healthcare through cutting-edge technology and patient-centric solutions.",
    vision:
      "We envision a world where technology empowers healthcare professionals and enhances patient outcomes.",
    services: [
      "Medical Device Manufacturing",
      "Healthcare Software Solutions",
      "Telemedicine Services",
      "AI-Powered Diagnostics",
    ],
    images: [
      "/images/office1.jpg",
      "/images/office2.jpg",
      "/images/team.jpg",
    ],
    videos: [
      "https://www.youtube.com/embed/YOUR_VIDEO_ID", // Replace with actual video URLs
      "https://www.youtube.com/embed/YOUR_ANOTHER_VIDEO_ID",
    ],
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Company Overview */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-blue-600">{companyDetails.name}</h1>
        <p className="text-gray-700 mt-2">{companyDetails.description}</p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-blue-600">Our Mission</h2>
          <p className="text-gray-700 mt-2">{companyDetails.mission}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-blue-600">Our Vision</h2>
          <p className="text-gray-700 mt-2">{companyDetails.vision}</p>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
        <h2 className="text-2xl font-bold text-blue-600">Our Services</h2>
        <ul className="list-disc pl-6 mt-2 text-gray-700">
          {companyDetails.services.map((service, index) => (
            <li key={index}>{service}</li>
          ))}
        </ul>
      </div>

      {/* Image Gallery */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold text-blue-600">Company Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {companyDetails.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Gallery ${index + 1}`}
              className="w-full h-40 object-cover rounded-lg shadow-md"
            />
          ))}
        </div>
      </div>

      {/* Video Section */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold text-blue-600">Company Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {companyDetails.videos.map((video, index) => (
            <iframe
              key={index}
              src={video}
              title={`Video ${index + 1}`}
              className="w-full h-56 rounded-lg shadow-md"
              allowFullScreen
            ></iframe>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
