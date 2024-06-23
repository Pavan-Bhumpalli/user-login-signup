import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import image from './v.png';
import {jwtDecode} from 'jwt-decode';

const Myprofile = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.user.id === "66785e95a077edaafa7f757b") {
          setError(200);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        setError(401); // Unauthorized
      }

      axios.get('http://localhost:5000/myprofile', {
        headers: {
          'x-token': token,
        }
      })
      .then(res => setData(res.data))
      .catch(err => {
        console.error('Error fetching data:', err);
        setError(err.response?.status);
      });
    } else {
      setError(401); // Unauthorized
    }
  }, []);

  if (error !== null && error!==200) {
    return <Navigate to="/loginerror" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-md">
        <div className="bg-cover bg-center h-56" style={{ backgroundImage: `url(${image})` }}></div>
        <div className="p-8 text-center">
          <img
            className="w-24 h-24 rounded-full mx-auto -mt-12 border-4 border-white"
            src="https://www.w3schools.com/bootstrap4/img_avatar3.png"
            alt="Profile"
          />
          <h1 className="text-2xl font-bold mt-4">{data.name}</h1>
          <p className="mt-2 text-gray-600">Welcome to your profile page</p>
          {error===200 && (
            <button
              onClick={() => {
                window.location.href = '/allusers';
              }}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            >
              All users
            </button>
          )}
          <button
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}
            className="mt-6 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Myprofile;
