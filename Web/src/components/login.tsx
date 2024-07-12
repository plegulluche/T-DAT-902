import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebaseConfig';
import { useNavigate } from 'react-router';
import axios from 'axios';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleEmailLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                const user = userCredential.user;
                console.log('uid', user.uid);
                console.log('email', user.email);
                axios.get(`http://localhost:3000/api/users/firebase/${user.uid}`).then((response) => {
                    if (response.data) {
                        localStorage.setItem('user', JSON.stringify(response.data));
                        navigate('/')
                    }
                }).catch((error) => {
                    console.error('Error fetching properties:', error);
                    alert((error as Error).message);
                });
            });
            console.log('Logged in successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error logging in:', error);
            alert((error as Error).message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            console.log('Logged in successfully with Google!');
            navigate('/');
        } catch (error) {
            console.error('Error logging in with Google:', error);
            alert((error as Error).message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-5">
            <div className="bg-white rounded-lg shadow-lg flex max-w-4xl w-full">
                <div className="w-1/2 hidden md:flex items-center justify-center p-8">
                    <img src="/gif2.gif" alt="House for Sale" className="w-full h-auto" />
                </div>
                <div className="flex flex-col items-center w-full md:w-1/2 p-8">
                    <h2 className="text-black text-2xl font-bold mb-4">WELCOME BACK</h2>
                    <p className="text-gray-600 mb-8">Welcome back! Please enter your details.</p>
                    <form className="w-full">
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
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                                />
                                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">Remember me</label>
                            </div>
                            <a href="/forgot-password" className="text-sm text-red-600 hover:underline">Forgot password</a>
                        </div>
                        <button type="button" onClick={handleEmailLogin} className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mb-4">
                          Sign in
                        </button>
                        <button type="button" onClick={handleGoogleLogin} className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-md flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                            {/* You can add a Google icon here */}
                            Sign in with Google
                        </button>
                    </form>
                    <p className="mt-4 text-sm text-center text-gray-600">
                        Don't have an account? <a href="/register" className="text-red-600 hover:underline">Sign up for free!</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;