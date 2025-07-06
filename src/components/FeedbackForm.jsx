import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FeedbackForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      fullName,
      email,
      contact,
      subject,
      message,
      rating,
    };

    try {
      const response = await axios.post(
        "https://formbackend-f471.onrender.com/api/v1/user/feedback",
        formData
      );
      console.log(response.data.message);
      toast.success(`✅ ${response.data.message}`);

      // Reset all fields
      setFullName("");
      setEmail("");
      setContact("");
      setSubject("");
      setMessage("");
      setRating(0);
    } catch (error) {
      console.error("Error submitting feedback: ", error);
      toast.error("❌ Failed to submit feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-10">
      <ToastContainer position="top-center" autoClose={3000} />
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="w-full max-w-xl bg-white shadow-2xl rounded-2xl p-8 space-y-6 animate-fade-in"
      >
        <h2 className="text-2xl font-bold text-center text-black">
          Feedback Form
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <input
          type="tel"
          name="contact"
          placeholder="Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <select
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          className="w-full p-3 rounded-lg border border-gray-300 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">Select Subject</option>
          <option value="Feedback">General Feedback</option>
          <option value="Bug Report">Bug Report</option>
          <option value="Feature Request">Feature Request</option>
          <option value="Other">Other</option>
        </select>

        <textarea
          name="message"
          placeholder="Write your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="w-full p-3 rounded-lg border border-gray-300 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-black"
        />

        <div className="flex flex-col">
          <label className="mb-2 text-black font-medium">Rate Us (1–5)</label>
          <input
            type="range"
            name="rating"
            min="0"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="accent-black"
          />
          <span className="text-sm text-gray-600 mt-1">Rating: {rating}</span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 text-white rounded-lg transition duration-300 flex justify-center items-center gap-2 ${
            loading
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-black hover:bg-gray-900"
          }`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Submitting...
            </>
          ) : (
            "Submit Feedback"
          )}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
