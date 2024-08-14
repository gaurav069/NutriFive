import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemembered, setIsRemembered] = useState(false);

  // Fetch remembered credentials (if any) on component mount
  useEffect(() => {
    const storedEmailOrUsername = localStorage.getItem('rememberedEmailOrUsername');
    const storedIsRemembered = localStorage.getItem('remembered') === 'true';

    if (storedEmailOrUsername && storedIsRemembered) {
      setEmail(storedEmailOrUsername);
      setIsRemembered(true);
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value, checked, type } = event.target;

    if (type === 'checkbox') {
      setIsRemembered(checked);
    } else {
      if (name === 'email') {
        setEmail(value);
      } else if (name === 'password') {
        setPassword(value);
      }
    }
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(import.meta.env.VITE_API_KEY+"api/v1");
    try{
      const res=await fetch(import.meta.env.VITE_API_KEY+"api/v1/user/login",{
        method:"POST",
        body:JSON.stringify({
          email,
          password,
        }),
        headers:{ "Content-Type": "application/json" },
      });
      if(res.ok){
        const data = await res.json();
        Cookies.set('accessToken',data.data.accessToken);
        Cookies.set('refreshToken',data.data.refreshToken);
        window.location.href='/dashboard';
      }
      else{
        const errorData= await res.json();
        alert(errorData.message || 'Incorrect information')
      }
    }
    catch(error){
      console.log('Something went wrong');
      alert('Something went wrong, please try again later');
    }

    // Implement login logic here, including validation and error handling
    // Replace with your authentication API call or other login method
    console.log('Login details:', { email, password });

    if (isRemembered) {
      localStorage.setItem('rememberedEmailOrUsername', email);
      localStorage.setItem('remembered', 'true'); // Store only a string for "true"
    } else {
      localStorage.removeItem('rememberedEmailOrUsername');
      localStorage.removeItem('remembered');
    }

    // Add your logic to handle authentication here (API call, redirect, etc.)
    // Example: const response = await authService.login(emailOrUsername, password);
    // Handle success or failure accordingly
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-red-500 to-white">
      {/* Left Circle */}
      <div className="absolute left-0 top-0 w-72 h-72 bg-red-100 rounded-full -z-10"></div>
      
      {/* Right Circle */}
      <div className="absolute right-0 bottom-0 w-72 h-72 bg-red-100 rounded-full -z-10"></div>

      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 shadow-lg rounded-lg w-full md:max-w-md relative z-10">
          <div className="flex justify-center py-12">
            <img
              src="https://plus.unsplash.com/premium_photo-1681487916420-8f50a06eb60e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bG9naW4lMjBwYWdlfGVufDB8fDB8fHww"
              alt="Logo"
              className="h-32 w-32 rounded-xl"
            />
          </div>
          <form className="px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="text"
                id="emailOrUsername"
                name="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter Email or Username"
                value={email}
                onChange={handleInputChange}
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
                name="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="********"
                value={password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex items-center mb-6">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="mr-2 leading-tight"
                checked={isRemembered}
                onChange={handleInputChange}
              />
              <label htmlFor="remember" className="text-sm text-gray-700">
                Remember Me
              </label>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sign In
              </button>
            </div>
          </form>
          {/* <div className="text-center">
            <Link
              to="/forgot-password"
              className="inline-block align-baseline text-sm text-blue-500 hover:text-blue-800"
            >
              Forgot Password?
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
