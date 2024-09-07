import React, { useState } from 'react';
import axios from 'axios'; // Assuming you're using Axios for API calls
import { useNavigate } from 'react-router-dom'; // For navigation after login

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const URI = import.meta.env.VITE_API_URL; // For redirecting after login

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // API call for login (replace with your actual login API)
      const response = await axios.post(`${URI}api/user/login`, {
        email,
        password
      });

      // Assuming the API returns a token on success
      if (response.data.token) {
        localStorage.setItem('token', response.data.token); // Save token in localStorage
        navigate('/dashboard'); // Redirect to the dashboard or another page
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
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email ID</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
