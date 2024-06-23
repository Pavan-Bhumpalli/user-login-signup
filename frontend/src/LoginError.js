import React from 'react';
import { Link } from 'react-router-dom';

const LoginError = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <p className="text-lg font-semibold mb-4">Please login to view your profile</p>
        <Link 
          to="/login" 
          className="inline-block bg-[#308c30] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </Link>
      </div>
    </div>
  )
}

export default LoginError;
