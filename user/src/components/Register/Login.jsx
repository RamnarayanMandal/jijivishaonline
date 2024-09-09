import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userIdOrEmail, setUserIdOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const URI = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // API call for login
      const response = await axios.post(`${URI}api/user/login`, {
        userId: userIdOrEmail,  // Assuming the backend handles both userId and email in the same field
        email: userIdOrEmail,
        password
      });

      // Assuming the API returns a token on success
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId); // Assuming the API returns user data on success 

        // Save token in localStorage
        navigate('/'); // Redirect to the dashboard or another page
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8 font-serif">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="userIdOrEmail" className="block text-gray-700 text-sm font-bold mb-2">
            User ID or Email ID
          </label>
          <input
            type="text"
            id="userIdOrEmail"
            name="userIdOrEmail"
            placeholder="Enter your User ID or Email"
            value={userIdOrEmail}
            onChange={(e) => setUserIdOrEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        
        {loading ? (
          <div className="text-blue-500 my-4">Logging in...</div>
        ) : (
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        )}
        
        {error && <p className="text-red-500 mt-4">{error}</p>}

        <a href="#" className="text-red-500 my-2 float-right">Forgot Password?</a>
      </form>
    </div>
  );
};

export default Login;
