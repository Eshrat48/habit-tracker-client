// src/pages/Register.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'; 
import toast from 'react-hot-toast'; 
import { User, Mail, Lock, Link, LogIn } from 'lucide-react'; // Remember to install lucide-react

const Register = () => {
    // --- State and Hooks ---
    const navigate = useNavigate();
    const { createUser, updateUserProfile, googleLogin } = useAuth();
    
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        photoURL: '',
        password: '',
    });
    const [passwordValidation, setPasswordValidation] = useState({
        minLength: false,
        hasUppercase: false,
        hasLowercase: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    // --- Validation Logic ---
    useEffect(() => {
        const password = formData.password;
        const checks = {
            minLength: password.length >= 6,
            hasUppercase: /[A-Z]/.test(password),
            hasLowercase: /[a-z]/.test(password),
        };
        setPasswordValidation(checks);
    }, [formData.password]);

    const isFormValid = formData.fullName && formData.email && 
                        Object.values(passwordValidation).every(v => v === true);

    // --- Handlers ---
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        setError('');
    };

    const handleGoogleLogin = async () => {
        setIsSubmitting(true);
        setError('');
        try {
            await googleLogin();
            toast.success('Registration successful with Google!');
            navigate('/');
        } catch (err) {
            setError(err.message || 'Google sign-in failed. Please try again.');
            toast.error('Google sign-in failed.');
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const onLoginRedirect = () => {
        navigate('/login');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!isFormValid) {
            setError('Please correct the validation errors before submitting.');
            return;
        }

        setIsSubmitting(true);
        setError('');

        const { email, password, fullName, photoURL } = formData;

        try {
            // 1. Create User in Firebase Authentication
            await createUser(email, password);
            // 2. Update User Profile with Name and PhotoURL
            await updateUserProfile(fullName, photoURL || null);
            
            toast.success('Registration successful! Welcome.');
            navigate('/');

        } catch (err) {
            let errorMessage = 'Registration failed. Please check your details.';
            if (err.code === 'auth/email-already-in-use') {
                errorMessage = 'This email is already registered. Please try logging in.';
            } else {
                 errorMessage = err.message;
            }

            setError(errorMessage);
            toast.error(errorMessage);

        } finally {
            setIsSubmitting(false);
        }
    };

    const ValidationItem = ({ isValid, children }) => (
        <li className={`flex items-center text-sm ${isValid ? 'text-success' : 'text-error'}`}>
            <span className="mr-1">
                {isValid ? '✓' : '•'}
            </span>
            {children}
        </li>
    );

    // --- JSX Render ---
    return (
        <div style={{ minHeight: 'calc(100vh - 72px)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb', padding: '24px' }}>
            <div style={{ width: '100%', maxWidth: '420px', background: '#ffffff', borderRadius: '12px', boxShadow: '0 8px 30px rgba(17,24,39,0.06)', border: '1px solid #eef2f7' }}>
                <div style={{ padding: '28px' }}>

                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <div style={{ margin: '0 auto', width: '56px', height: '56px', background: '#eef2ff', color: '#4f46e5', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                            <User style={{ width: 20, height: 20 }} />
                        </div>
                        <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#0f172a' }}>Create Account</h2>
                        <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '6px' }}>Start building better habits today</p>
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div role="alert" style={{ marginBottom: '12px', fontSize: '13px', color: '#991b1b', background: '#fff1f2', border: '1px solid #fee2e2', borderRadius: '8px', padding: '10px' }}>
                            {error}
                        </div>
                    )}

                    {/* Registration Form */}
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                        {/* Full Name */}
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#111827', marginBottom: '6px' }}>Full Name</label>
                            <div style={{ display: 'flex', alignItems: 'center', background: '#f3f4f6', borderRadius: '8px', overflow: 'hidden' }}>
                                <div style={{ padding: '10px', color: '#9ca3af' }}><User style={{ width: 18, height: 18 }} /></div>
                                <input
                                    type="text"
                                    id="fullName"
                                    placeholder="John Doe"
                                    style={{ flex: 1, border: 'none', background: 'transparent', padding: '10px 12px', fontSize: '14px' }}
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#111827', marginBottom: '6px' }}>Email Address</label>
                            <div style={{ display: 'flex', alignItems: 'center', background: '#f3f4f6', borderRadius: '8px', overflow: 'hidden' }}>
                                <div style={{ padding: '10px', color: '#9ca3af' }}><Mail style={{ width: 18, height: 18 }} /></div>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="you@example.com"
                                    style={{ flex: 1, border: 'none', background: 'transparent', padding: '10px 12px', fontSize: '14px' }}
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Photo URL */}
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#111827', marginBottom: '6px' }}>Photo URL (Optional)</label>
                            <div style={{ display: 'flex', alignItems: 'center', background: '#f3f4f6', borderRadius: '8px', overflow: 'hidden' }}>
                                <div style={{ padding: '10px', color: '#9ca3af' }}><Link style={{ width: 18, height: 18 }} /></div>
                                <input
                                    type="url"
                                    id="photoURL"
                                    placeholder="https://example.com/photo.jpg"
                                    style={{ flex: 1, border: 'none', background: 'transparent', padding: '10px 12px', fontSize: '14px' }}
                                    value={formData.photoURL}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#111827', marginBottom: '6px' }}>Password</label>
                            <div style={{ display: 'flex', alignItems: 'center', background: '#f3f4f6', borderRadius: '8px', overflow: 'hidden' }}>
                                <div style={{ padding: '10px', color: '#9ca3af' }}><Lock style={{ width: 18, height: 18 }} /></div>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="********"
                                    style={{ flex: 1, border: 'none', background: 'transparent', padding: '10px 12px', fontSize: '14px' }}
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>Must be at least 6 characters with uppercase and lowercase letters</p>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            style={{ width: '100%', marginTop: '6px', borderRadius: '10px', padding: '10px 12px', fontSize: '14px', fontWeight: 600, color: '#fff', background: 'linear-gradient(90deg,#6366f1,#a855f7)', border: 'none', cursor: isSubmitting ? 'default' : 'pointer', opacity: isSubmitting ? 0.7 : 1 }}
                            disabled={!isFormValid || isSubmitting}
                        >
                            {isSubmitting ? 'Creating Account...' : 'Create Account'}
                        </button>

                        {/* Divider */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
                            <div style={{ flex: 1, height: '1px', background: '#e6e6e6' }}></div>
                            <div style={{ fontSize: '12px', color: '#9ca3af' }}>Or continue with</div>
                            <div style={{ flex: 1, height: '1px', background: '#e6e6e6' }}></div>
                        </div>

                        {/* Google Button */}
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={isSubmitting}
                            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px 10px', background: '#ffffff', fontSize: '14px', cursor: isSubmitting ? 'default' : 'pointer' }}
                        >
                            <img src="https://i.pinimg.com/736x/2f/80/9e/2f809e3268f29a6f81eca9b0864af1d1.jpg" alt="Google" style={{ width: 18, height: 18 }} />
                            <span>Sign up with Google</span>
                        </button>

                    </form>

                    {/* Sign in link */}
                    <p style={{ textAlign: 'center', fontSize: '13px', color: '#374151', marginTop: '18px' }}>Already have an account? <button type="button" onClick={onLoginRedirect} style={{ color: '#7c3aed', fontWeight: 600, marginLeft: '6px', background: 'none', border: 'none', cursor: 'pointer' }}>Sign in</button></p>

                </div>
            </div>
        </div>
    );
};

export default Register;