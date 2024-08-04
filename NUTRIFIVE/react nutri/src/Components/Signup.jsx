import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [avatar, setAvatar] = useState(null);

  const handleSignup = async (event) => {
    event.preventDefault();

    try{
      const res=await fetch(import.meta.env.VITE_API_KEY+"api/v1/user/register",{
        method:"POST",
        body:JSON.stringify({
          fullname,
          username,
          email,
          password
        }),
        headers:{ "Content-Type": "application/json" },
      });
      if(res.ok){
        window.location.href='/login';
      }
      else{
        const errorData= await res.json();
        alert(errorData.message || 'Incorrect information')
      }
    }
    catch(error){
      console.log(error);
      alert(errorData.message || 'Something Wrong!')
    }
    const formData = {
      fullname,
      username,
      email,
      password
      // avatar
    };
    console.log(formData);
    setFullName('');
    setUsername('');
    setEmail('');
    setPassword('');
    // setAvatar(null);
  };

  // const handleAvatarChange = (event) => {
  //   const file = event.target.files[0];
  //   setAvatar(file);
  // };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-500 to-white">
      <div className="bg-red-50 shadow-lg rounded-lg w-full md:max-w-md">
        <div className="flex justify-center py-12">
          <img
            src="https://plus.unsplash.com/premium_photo-1681487916420-8f50a06eb60e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bG9naW58ZW58MHx8MHx8fDA%3D"
            alt="Logo"
            className="h-32 w-32 rounded-xl"
          />
        </div>
        <form className="px-8 pt-6 pb-8 mb-4" onSubmit={handleSignup}>
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="John Doe"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="johndoe123"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="name@example.com"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="********"
              required
            />
          </div>
          {/* <div className="mb-6">
            <label
              htmlFor="avatar"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Avatar
            </label>
            <input
              type="file"
              id="avatar"
              accept="image/*"
              onChange={handleAvatarChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div> */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-blue-500 hover:text-blue-800"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
