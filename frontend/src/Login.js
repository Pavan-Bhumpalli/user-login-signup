import { React, useState} from 'react';
import image from './v.png';
import axios from 'axios';
import { Navigate,NavLink } from 'react-router-dom';
const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const [redirect, setRedirect] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', data).then((res) => {
        localStorage.setItem('token', res.data.token);
        setRedirect(true);
      });
    } catch (error) {
      console.error('Error response:', error.response);
      alert('Login Failed: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };
  if (redirect) {
    return <Navigate to="/myprofile" />;
  }

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 h-auto bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
      </div>

      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-8" style={{ backgroundColor: "#93cf93" }}>
        <h1 className="text-3xl font-bold mb-8">Login</h1>
        <form className="w-full max-w-sm" onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              id="email" 
              type="text"
              onChange={(e) => setData({ ...data, email: e.target.value })} 
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
              id="password" 
              type="password" 
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>
          <div className="flex items-center justify-between">
            <button 
              className="bg-[#308c30] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
              type="submit">
              Login
            </button>
          </div>
        </form>
        <div>
          Create new Account: <NavLink to="/register" className="text-white hover:text-blue-700 cursor-pointer text-lg font-semibold">Register</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Login;
