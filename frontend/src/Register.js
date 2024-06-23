import {React, useState} from 'react';
import image from './v.png';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  };
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirmpassword: ''
    });

    const [emailError, setEmailError] = useState('');

    const handleEmailChange = (e) => {
      const emailValue = e.target.value;
      setData({...data, email: e.target.value})
      if (validateEmail(emailValue)) {
        setEmailError('');
      } else {
        setEmailError('Invalid email format');
      }
    };

    const submitHandler = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('http://localhost:5000/register', data);
          alert('Registration Successful');
          window.location.href = '/login';
      } catch (error) {
          console.error('Error response:', error.response);
          console.log(data);
          alert('Registration Failed: ' + (error.response?.data?.message || 'Unknown error'));
      }
    }


    return (
        <div className="min-h-screen flex">
          
          <div className="w-1/2 flex flex-col justify-center items-center bg-white p-8 " style={{backgroundColor: "#93cf93"}}>
            <h1 className="text-3xl font-bold mb-8">Register</h1>
            <form className="w-full max-w-sm" onSubmit={submitHandler}>
              <div className="mb-4">
                <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  id="name" 
                  type="text" 
                  onChange= {(e) => setData({...data, name: e.target.value})}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  id="email" 
                  type="email" 
                    onChange= {handleEmailChange}
                />
                {emailError && <p className="text-red-500 text-xs italic">{emailError}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                  id="password" 
                  type="password" 
                    onChange= {(e) => setData({...data, password: e.target.value})}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="confirm-password">
                  Confirm Password
                </label>
                <input 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                  id="confirm-password" 
                  type="password" 
                    onChange= {(e) => setData({...data, confirmpassword: e.target.value})}
                />
              </div>
              <div className="flex items-center justify-between">
                <button 
                  className="bg-[#308c30] text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                  type="submit"
                >
                  Register
                </button>
              </div>
              <div >
                Already Registered? <NavLink to="/Login" className="text-white hover:text-blue-700 cursor-pointer text-lg font-semibold">Login</NavLink>
              </div>
            </form>
          </div>

          <div className="w-1/2 h-auto bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
          </div>
        </div>
      );
}

export default Register
