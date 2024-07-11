import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebaseConfig';
import { useNavigate } from 'react-router';
import axios from 'axios';

const Register: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const navigate = useNavigate()

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                const user = userCredential.user;
                console.log(user.uid);
                axios.post('http://localhost:3000/api/users', {
                    uid: user.uid,
                    email: user.email,
                }).then((response) => {
                    console.log(response.data);
                }).catch((error) => {
                    console.error('Error registering:', error);
                    alert((error as Error).message);
                });
            });
            console.log('Registered successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error registering:', error);
            alert((error as Error).message);
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            console.log('Signed up successfully with Google!');
            navigate('/');
        } catch (error) {
            console.error('Error signing up with Google:', error);
            alert((error as Error).message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-5">
            <div className="bg-white rounded-lg shadow-lg flex max-w-4xl w-full">
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
                        <button type="button" onClick={handleRegister} className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mb-4">Sign up</button>
                    </form>
                    <button type="button" onClick={handleGoogleSignUp} className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-md flex items-center justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                        {/* You can add a Google icon here */}
                        Sign up with Google
                    </button>
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
