import React, { useState } from 'react';
import axios from 'axios';

const Profile: React.FC = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [searchHistory, setSearchHistory] = useState<string[]>([
      'Search 1',
      'Search 2',
      'Search 3',
    ]);
  
    const handleProfileUpdate = (e: React.FormEvent) => {
      e.preventDefault();
      //axios call ici changer le nom / username / profilePicture
      console.log('Name:', name, 'Username:', username, 'Profile Picture:', profilePicture);
    };
  
    return (
      <div className="min-h-screen bg-gray-100 p-5 flex flex-col items-center">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg mb-4">
          <h2 className="text-2xl font-bold mb-8 text-black">My Profile</h2>
          <form onSubmit={handleProfileUpdate} className="space-y-6">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
              <input
                type="text"
                id="profilePicture"
                placeholder="Enter image URL"
                value={profilePicture}
                onChange={(e) => setProfilePicture(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                required
              />
            </div>
            <button type="submit" className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Update Profile</button>
          </form>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-6 text-black">Search History</h2>
          <ul className="space-y-2">
            {searchHistory.map((search, index) => (
              <li key={index} className="text-gray-700">{search}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

export default Profile;