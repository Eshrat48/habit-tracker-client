// src/pages/Login.jsx

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider'; 
import toast from 'react-hot-toast';

const Login = () => {
    const { signIn, googleLogin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation(); 
    // Determine the redirect path: back to the page they wanted, or Home (/)
    const from = location.state?.from?.pathname || "/"; 

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        // 1. Sign In with Firebase
        signIn(email, password)
            .then(result => {
                toast.success(`Welcome back, ${result.user.displayName || 'User'}!`);
                // 2. Redirect the user to their intended destination
                navigate(from, { replace: true });
            })
            .catch(error => {
                // Display user-friendly error messages (e.g., "invalid password", "user-not-found")
                toast.error(error.message.replace('Firebase: Error (auth/', '').replace(').', '').replace(/-/g, ' '));
            });
    };

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                toast.success('Google login successful!');
                navigate(from, { replace: true });
            })
            .catch(error => {
                toast.error(error.message);
            });
    };

    return (
        <div className="flex justify-center items-center py-16 px-4 min-h-screen">
            <div className="card w-full max-w-md shadow-2xl bg-white border border-gray-200">
                <form onSubmit={handleLogin} className="card-body">
                    <h2 className="text-3xl font-bold text-center text-indigo-600 mb-4">Account Login</h2>
                    
                    {/* Email Input */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input type="email" name="email" placeholder="email" className="input input-bordered w-full" required />
                    </div>
                    
                    {/* Password Input */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type="password" name="password" placeholder="password" className="input input-bordered w-full" required />
                        <label className="label">
                            <Link to="/register" className="label-text-alt link link-hover text-indigo-500">Don't have an account? Register</Link>
                        </label>
                    </div>
                    
                    {/* Submit Button */}
                    <div className="form-control mt-6">
                        <button type="submit" className="btn bg-indigo-600 text-white hover:bg-indigo-700">Login</button>
                    </div>
                </form>

                {/* Google Login */}
                <div className="divider px-8">OR</div>
                <div className="px-8 pb-8">
                    <button onClick={handleGoogleLogin} className="btn w-full btn-outline border-gray-300 hover:border-indigo-600 hover:bg-white hover:text-indigo-600">
                        <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M43.61 20.08c0-.77-.07-1.53-.19-2.28H24v4.33h10.97c-.47 2.2-1.74 4.07-3.66 5.34l-3.32 3.14-5.22 1.34V39.9l12.72-3.8c7.3-3.6 12.31-10.74 12.31-19.5z" fill="#4285F4"/><path d="M24 44c6.64 0 12.28-2.2 16.37-5.94l-12.72-3.8c-3.23 2.1-7.37 3.32-11.72 3.32-9 0-16.5-6.2-19.16-14.54H4.8l2.97 2.37C10.77 39.5 16.8 44 24 44z" fill="#34A853"/><path d="M4.84 26.68a19.78 19.78 0 0 1 0-5.36V16.7L1.87 14.33c-1.3 2.58-2.03 5.48-2.03 8.57 0 3.09.73 6 2.03 8.57l2.97-2.37z" fill="#FBBC04"/><path d="M24 10.15c4.73 0 8.94 1.63 12.28 4.7l3.6-3.6c-4.9-4.5-11.37-7.25-17.88-7.25-7.2 0-13.23 4.5-16.19 10.74l2.97 2.37c2.66-8.34 10.16-14.54 19.16-14.54z" fill="#EA4335"/></svg>
                        Login with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;