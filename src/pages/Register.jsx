// src/pages/Register.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import toast from 'react-hot-toast';

const Register = () => {
    const { createUser, updateUserProfile, googleLogin } = useAuth();
    const navigate = useNavigate();

    // Password validation function (Required by the assignment)
    const validatePassword = (password) => {
        if (password.length < 6) {
            return "Password must be at least 6 characters long.";
        }
        if (!/[A-Z]/.test(password)) {
            return "Password must contain at least one uppercase letter.";
        }
        if (!/[a-z]/.test(password)) {
            return "Password must contain at least one lowercase letter.";
        }
        return null; // Null means validation passed
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photoURL = form.photoURL.value;
        const password = form.password.value;

        // 1. Run validation
        const passwordError = validatePassword(password);
        if (passwordError) {
            toast.error(passwordError);
            return;
        }

        // 2. Create User in Firebase
        createUser(email, password)
            .then(result => {
                // 3. Update User Profile (Name & PhotoURL)
                updateUserProfile(name, photoURL)
                    .then(() => {
                        toast.success('Registration successful! Welcome to HabitHub!');
                        form.reset();
                        // Redirect to the home page after successful registration
                        navigate('/'); 
                    })
                    .catch(error => {
                        toast.error("Profile update failed: " + error.message);
                    });
            })
            .catch(error => {
                // Display user-friendly error messages (e.g., "email-already-in-use")
                toast.error(error.message.replace('Firebase: Error (auth/', '').replace(').', '').replace(/-/g, ' '));
            });
    };

    const handleGoogleLogin = () => {
        googleLogin()
            .then(() => {
                toast.success('Google registration successful!');
                navigate('/');
            })
            .catch(error => {
                toast.error(error.message);
            });
    };

    return (
        <div className="flex justify-center items-center py-16 px-4 min-h-screen">
            <div className="card w-full max-w-lg shadow-2xl bg-white border border-gray-200">
                <form onSubmit={handleRegister} className="card-body">
                    <h2 className="text-3xl font-bold text-center text-indigo-600 mb-4">Create Account</h2>
                    
                    {/* Name Input */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Name</span></label>
                        <input type="text" name="name" placeholder="Your Name" className="input input-bordered w-full" required />
                    </div>

                    {/* Email Input */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input type="email" name="email" placeholder="Email" className="input input-bordered w-full" required />
                    </div>

                    {/* Photo URL Input */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Photo URL (Optional)</span></label>
                        <input type="text" name="photoURL" placeholder="Profile Picture URL" className="input input-bordered w-full" />
                    </div>

                    {/* Password Input */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type="password" name="password" placeholder="Password (Min 6 chars, Upper/Lower)" className="input input-bordered w-full" required />
                        <label className="label">
                            <Link to="/login" className="label-text-alt link link-hover text-indigo-500">Already have an account? Login</Link>
                        </label>
                    </div>
                    
                    {/* Submit Button */}
                    <div className="form-control mt-6">
                        <button type="submit" className="btn bg-indigo-600 text-white hover:bg-indigo-700">Register</button>
                    </div>
                </form>

                {/* Google Login */}
                <div className="divider px-8">OR</div>
                <div className="px-8 pb-8">
                    <button onClick={handleGoogleLogin} className="btn w-full btn-outline border-gray-300 hover:border-indigo-600 hover:bg-white hover:text-indigo-600">
                        <img src="google-icon.svg" alt="Google" className="w-5 h-5 mr-2" /> Register with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;