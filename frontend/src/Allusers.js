import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';


const Allusers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');
  console.log("Token:", token); // Debugging

  useEffect(() => {
    if (token) {
      let decodedToken;
      try {
        decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken); // Debugging

        if (decodedToken.user.id === "66785e95a077edaafa7f757b") {
          axios.get('http://localhost:5000/allusers', {
            headers: {
              'x-token': token,
            }
          })
          .then(res => {
            setUsers(res.data);
            console.log("Users Data:", res.data); // Debugging
          })
          .catch(err => {
            console.error('Error fetching data:', err);
            setError(err.response?.status);
          });
        } else {
          console.log("User ID did not match");
          setError(403);  // Forbidden
        }
      } catch (e) {
        console.error('Error decoding token:', e);
        setError(401);  // Unauthorized
      }
    } else {
      console.log("No token found");
      setError(401);  // Unauthorized
    }
  }, [token]);

  if (error !==null) {
    console.log("Error:", error); // Debugging
    return <Navigate to="/loginerror" />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8 text-center">
          <h1 className="text-3xl font-bold mb-4">All Users</h1>
          {users.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {users.map(user => (
                <div key={user.id} className="bg-gray-200 p-4 rounded-lg shadow-md">
                  <img
                    className="w-16 h-16 rounded-full mx-auto"
                    src="https://www.w3schools.com/bootstrap4/img_avatar3.png"
                    alt="User Profile"
                  />
                  <h2 className="text-xl font-bold mt-2">{user.name}</h2>
                  <p className="mt-1 text-gray-700">{user.email}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-gray-700">No users found.</p>
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

export default Allusers;
