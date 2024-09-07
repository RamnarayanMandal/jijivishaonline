import React, { useState } from "react";
import axios from "axios"; // Assuming you're using Axios for API calls

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const URI = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setLoading(true);
    setError(""); // Reset error before submission
    setSuccess("");

    try {
      // Call your API for registration
      const response = await axios.post(`${URI}api/user/register`, { email });

      if (response.status === 200) {
        setSuccess("Registration successful! Check your email for the password.");
      }
    } catch (error) {
      // Handle errors
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 font-serif">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="emailId"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email ID
          </label>
          <input
            type="email"
            id="emailId"
            name="emailId"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        {loading ? (
          <div className="text-blue-500 my-4">Registering...</div>
        ) : (
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
        )}

        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">{success}</p>}

        <p className="my-4 font-light">
          A password will be sent to your email address.
        </p>
        <p className="my-4 font-thin">
          Your personal data will be used to support your experience throughout
          this website, to manage access to your account, and for other purposes
          described in our{" "}
          <a
            href="#"
            className="text-red-500"
          >
            privacy policy
          </a>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
