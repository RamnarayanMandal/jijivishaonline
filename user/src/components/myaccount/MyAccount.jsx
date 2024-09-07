import React, { useState } from 'react';
import Login from '../Register/Login';
import RegisterPage from '../Register/RegisterPage';

export const MyAccount = () => {
  // State to track whether to show the Login or Register form
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className='py-10 flex justify-center items-center content-center flex-col font-serif bg-gray-50'>
      <h1 className='text-center text-4xl text-red-500 font-semibold'>My Account</h1>
      <div className='flex justify-center content-center items-center gap-5 my-5'>
        <button
          className={`px-4 text-2xl py-2 ${showLogin ? 'text-red-500' : 'text-black'} rounded`}
          onClick={() => setShowLogin(true)} // Show the Login component
        >
          Login
        </button>
        <button
          className={`px-4 text-2xl py-2 ${!showLogin ? 'text-red-500' : 'text-black'} rounded`}
          onClick={() => setShowLogin(false)} // Show the Register component
        >
          Register
        </button>
      </div>

      {/* Conditionally render Login or Register form based on state */}
      {showLogin ? <Login /> : <RegisterPage />}
    </div>
  );
};

export default MyAccount;
