import React, { useState } from "react";

const ReviewComponent = () => {
  const [review, setReview] = useState({
    name: "",
    description: "",
    rating: 0,
  });

  const handleChange = (e) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
  };

  const handleRatingChange = (e) => {
    setReview({
      ...review,
      rating: Number(e.target.value),
    });
  };

  return (
    <div className="flex flex-col-reverse gap-5 lg:flex-row-reverse items-center lg:items-start justify-between p-6 space-y-6 lg:space-y-0 lg:space-x-8">
      {/* Left Section - User Review Form */}
      <div className="w-full lg:w-1/2 bg-gray-100 p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Leave a Review</h2>
        <form>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={review.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Review</label>
            <textarea
              name="description"
              value={review.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Write your review"
              rows="4"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Rating</label>
            <select
              name="rating"
              value={review.rating}
              onChange={handleRatingChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value={0}>Select Rating</option>
              <option value={1}>1 Star</option>
              <option value={2}>2 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={5}>5 Stars</option>
            </select>
          </div>

          <button
            type="button"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
          >
            Submit Review
          </button>
        </form>
      </div>

      {/* Right Section - Display Review */}
      <div className="w-full lg:w-1/2 bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Your Review</h2>
        {review.name || review.description || review.rating ? (
          <div className="space-y-4">
            <div className="text-sm font-medium">Name: {review.name}</div>
            <div className="text-sm font-medium">Review: {review.description}</div>
            <div className="text-sm font-medium">Rating: {"★".repeat(review.rating)}</div>
          </div>
        ) : (
          <p className="text-gray-500">No review submitted yet.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewComponent;
