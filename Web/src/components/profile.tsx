import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Coins, Group, MapPin } from 'iconoir-react';

interface Search {
  roomMin: number;
  roomMax: number;
  priceMin: number;
  priceMax: number;
  department: string;
}

const Profile: React.FC = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [searchHistory, setSearchHistory] = useState<Search[]>([]);
    const user = localStorage.getItem('user');
    const profilePictureVerif = localStorage.getItem('profilePicture');

    useEffect(() => {
      if (user) {
        var userObject = JSON.parse(user);
        var id = userObject.id;
        axios.get('http://localhost:3000/api/user/recent-search/history/'+id).then((response) => {
          setSearchHistory(response.data);
        }).catch((error) => {
          console.error('Error fetching search history:', error);
        });
      }
    }, []);
    const handleProfileUpdate = (e: React.FormEvent) => {
      e.preventDefault();
      if (user) {
        var userObject = JSON.parse(user);
        var id = userObject.id;
        console.log('user:', name);
        console.log('Storage User : ', localStorage.getItem('user'));
        if (name !== '') {
          axios.put('http://localhost:3000/api/users/'+id, {
            name: name,
          }).then((response) => {
            localStorage.setItem('user', JSON.stringify(response.data));
            console.log('Profile updated:', response.data);
          }
          ).catch((error) => {
            console.error('Error updating profile:', error);
          });
        }
        if (username !== '') {
          axios.put('http://localhost:3000/api/users/'+id, {
            firstname: username,
          }).then((response) => {
            localStorage.setItem('user', JSON.stringify(response.data));
            console.log('Profile updated:', response.data);
          }
          ).catch((error) => {
            console.error('Error updating profile:', error);
          });
        }
        if (!profilePictureVerif || profilePictureVerif != profilePicture) {
          if (!profilePictureVerif && profilePicture === '') {
            localStorage.setItem('profilePicture', '/radu.png');
          } 
          if (profilePicture !== '') {
            localStorage.setItem('profilePicture', profilePicture);
          }
        }
      }
    };
  
    return (
      <div className="p-5 flex flex items-start justify-center gap-6">
        <div className="bg-white rounded-lg border-2 border-gray-200 p-5 w-full max-w-lg mb-4">
          <h2 className="text-xl font-semibold mb-2 text-black">Profile</h2>
          <form onSubmit={handleProfileUpdate} className="space-y-6">
            <div className="">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 text-black block bg-white w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
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
                className="mt-1 text-black bg-white block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
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
                className="mt-1 text-black block bg-white w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              />
            </div>
            <button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Update Profile</button>
          </form>
        </div>
        <div className="bg-white rounded-lg border-2 border-gray-200 p-5 w-full max-w-lg max-h-[500px] h-fit overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4 text-black">Search History</h2>
          <ul className="space-y-2">
          {searchHistory?.map((search, index) => (
            <li key={index} className="text-gray-700 rounded-lg border border-gray-300 p-2">
              <div className="h-full py-1 px-3 flex gap-2 items-cente w-fit">
                <Group width={16} height={16} strokeWidth={2} />
                <p className="text-sm">{search.roomMin}-{search.roomMax} rooms</p>
              </div>
              <div className="h-full py-1 px-3 flex gap-2 items-cente w-fit">
                <Coins width={16} height={16} strokeWidth={2} />
                <p className="text-sm">{search.priceMin}€ - {search.priceMax}€</p>
              </div>
              <div className="h-full py-1 px-3 flex gap-2 items-cente w-fit">
                <MapPin width={16} height={16} strokeWidth={2} />
                <p className="text-sm">{search.department}</p>
              </div>
            </li>
          ))}
          </ul>
        </div>
      </div>
    );
  };

export default Profile;