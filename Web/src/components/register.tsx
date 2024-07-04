import React, { useState } from 'react';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Email:', email, 'Password:', password, 'Confirm Password');
    };
  
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-5">
          <div className="bg-white rounded-lg shadow-lg flex max-w-4xl w-full">
            <div className="flex flex-col items-center w-full md:w-1/2 p-8">
              <h2 className="text-black text-2xl font-bold mb-4">WELCOME BACK</h2>
              <p className="text-gray-600 mb-8">Welcome back! Please enter your details.</p>
              <form onSubmit={handleLogin} className="w-full">
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="**********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="**********"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  />
                </div>
                <button type="submit" className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mb-4">Sign up</button>
                <button type="button" className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-md flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                  {/* <img src="/path/to/google-icon.png" alt="Google icon" className="w-5 h-5 mr-2" /> Sign in with Google */}
                  Sign up with Google
                </button>
              </form>
              <p className="mt-4 text-sm text-center text-gray-600">
                Already have an account? <a href="/login" className="text-red-600 hover:underline">Sign in here!</a>
              </p>
            </div>
            <div className="w-1/2 hidden md:flex items-center justify-center p-8">
              <img src="/gif2.gif" alt="House for Sale" className="w-full h-auto" />
            </div>
          </div>
        </div>
      );
  };
  
  export default Register;