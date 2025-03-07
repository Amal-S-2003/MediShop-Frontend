import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { addReview, getAverageRating, getProductReviews } from "../services/allAPIS";

const ProductReviews = ({ productId, user }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [averageRating, setAverageRating] = useState(0);
  const [reqHeader, setReqHeader] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const header = { authorization: `Bearer ${token}` };
      setReqHeader(header);
      fetchReviews(header);
      fetchAverageRating(header);
    }
  }, []);

  const fetchReviews = async (header) => {
    try {
      const response = await getProductReviews(productId, header);
      setReviews(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]); // Fallback to an empty array
    }
  };

  const fetchAverageRating = async (header) => {
    try {
      const response = await getAverageRating(productId, header);
      console.log("Average Rating API Response:", response.data); // Debugging
  
      // Extract rating & ensure it's a number
      const rating = response.data?.averageRating ;
  
      if (typeof rating === "number" && !isNaN(rating)) {
        setAverageRating(parseFloat(rating.toFixed(1))); // Ensure it's a number with 1 decimal
      } else {
        console.log("in ELSE");
        
        setAverageRating(0); // Fallback if rating is undefined or invalid
      }
    } catch (error) {
      console.error("Error fetching average rating:", error);
      setAverageRating(0); // Ensure fallback value
    }
  };
  

  const handleReviewSubmit = async () => {
    if (!user) {
      toast.error("Please login to leave a review.");
      return;
    }
    if (!reqHeader) {
      toast.error("Authentication error. Please refresh the page.");
      return;
    }
    if (rating === 0 || comment.trim() === "") {
      toast.warn("Please provide a rating and a comment.");
      return;
    }

    const reviewData = {
      productId,
      userId: user._id,
      username: user.username,
      rating,
      comment,
    };

    try {
      await addReview(reviewData, reqHeader);
      toast.success("Review submitted successfully!");
      setRating(0);
      setComment("");
      fetchReviews(reqHeader);
      fetchAverageRating(reqHeader);
    } catch (error) {
      toast.error("Failed to submit review.");
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold">Customer Reviews</h2>

      {/* Average Rating Display */}
      <div className="flex items-center">
      <span className="text-2xl font-semibold">
  {averageRating ? averageRating.toFixed(1) : "0.0"}
</span>
        <div className="flex ml-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar key={star} className={`text-xl ${star <= averageRating ? "text-yellow-500" : "text-gray-300"}`} />
          ))}
        </div>
        <span className="text-gray-500 ml-2">{reviews.length} reviews</span>
      </div>

      {/* Leave a Review Section */}
      {user ? (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold">Leave a Review</h3>
          <div className="flex items-center mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`cursor-pointer text-xl ${rating >= star ? "text-yellow-500" : "text-gray-400"}`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
          <textarea
            className="w-full p-2 mt-2 border rounded"
            rows="3"
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            onClick={handleReviewSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700 transition"
          >
            Submit Review
          </button>
        </div>
      ) : (
        <p className="text-gray-600 mt-2">Login to leave a review.</p>
      )}

      {/* Display Existing Reviews */}
      <div className="mt-4">
        {Array.isArray(reviews) && reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="p-4 border-b">
              <div className="flex items-center">
                <h3 className="font-semibold">{review.username}</h3>
                <div className="flex ml-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`text-lg ${review.rating >= star ? "text-yellow-500" : "text-gray-400"}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600">{review.comment}</p>
              <span className="text-sm text-gray-400">
                {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : "Unknown date"}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
