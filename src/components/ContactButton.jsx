import React, { useState } from "react";
import { FaWhatsapp, FaFacebook, FaInstagram, FaEnvelope } from "react-icons/fa";

const ContactButton = () => {
  const [showContacts, setShowContacts] = useState(false);

  return (
    <div className="fixed bottom-6 right-6">
      {/* WhatsApp Button */}
      <button
        onClick={() => setShowContacts(!showContacts)}
        className="flex items-center justify-center bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition"
      >
        <FaWhatsapp size={24} />
      </button>

      {/* Contact Details Popup */}
      {showContacts && (
        <div className="absolute bottom-16 right-0 bg-white shadow-lg rounded-lg p-4 w-64">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Contact Us</h3>
          <p className="flex items-center text-gray-600 mb-2">
            <FaWhatsapp className="mr-2 text-green-500" /> +91 98765 43210
          </p>
          <p className="flex items-center text-gray-600 mb-2">
            <FaEnvelope className="mr-2 text-red-500" /> support@example.com
          </p>
          <p className="flex items-center text-gray-600 mb-2">
            <FaFacebook className="mr-2 text-blue-500" />
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          </p>
          <p className="flex items-center text-gray-600">
            <FaInstagram className="mr-2 text-pink-500" />
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default ContactButton;
