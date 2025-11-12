// src/pages/Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'; 
import toast from 'react-hot-toast'; 
import { Mail, Lock, LogIn, UserPlus } from 'lucide-react';

const Login = () => {
    // --- Hook Initialization ---
    const navigate = useNavigate();
    const { signIn, googleLogin } = useAuth();
    
    // --- State Management ---
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const isFormValid = formData.email && formData.password;

    // --- Handlers ---
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
        setError('');
    };

    const handleGoogleLogin = async () => {
        setIsSubmitting(true);
        setError('');
        try {
            await googleLogin();
            toast.success('Login successful with Google! 🎉');
            navigate('/');
        } catch (err) {
            setError(err.message || 'Google sign-in failed. Please try again.');
            toast.error('Google sign-in failed.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const onRegisterRedirect = () => {
        navigate('/register');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!isFormValid) return;

        setIsSubmitting(true);
        setError('');

        const { email, password } = formData;

        try {
            // 1. Sign In via Firebase Authentication
            await signIn(email, password);
            
            toast.success('Login successful! Welcome back. 👋');
            navigate('/');

        } catch (err) {
            let errorMessage = 'Login failed. Please check your credentials.';

            if (err.code === 'auth/invalid-email' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
                errorMessage = 'Invalid email or password.';
            } else {
                 errorMessage = err.message;
            }

            setError(errorMessage);
            toast.error(errorMessage);

        } finally {
            setIsSubmitting(false);
        }
    };

    // --- JSX Render (Using Inline Styles) ---
    return (
        <div style={{ minHeight: 'calc(100vh - 72px)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb', padding: '24px' }}>
            <div style={{ width: '100%', maxWidth: '420px', background: '#ffffff', borderRadius: '12px', boxShadow: '0 8px 30px rgba(17,24,39,0.06)', border: '1px solid #eef2f7' }}>
                <div style={{ padding: '28px' }}>
                
                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <div style={{ margin: '0 auto', width: '56px', height: '56px', background: '#eef2ff', color: '#4f46e5', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                            <LogIn style={{ width: 20, height: 20 }} />
                        </div>
                        <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#0f172a' }}>Welcome Back</h2>
                        <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '6px' }}>Sign in to track your habits</p>
                    </div>
                    
                    {/* Error Display */}
                    {error && (
                        <div role="alert" style={{ marginBottom: '12px', fontSize: '13px', color: '#991b1b', background: '#fff1f2', border: '1px solid #fee2e2', borderRadius: '8px', padding: '10px' }}>
                            {error}
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        
                        {/* Email Address Input */}
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#111827', marginBottom: '6px' }}>Email</label>
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
                        
                        {/* Password Input */}
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#111827', marginBottom: '6px' }}>
                                Password
                                <span style={{ float: 'right', color: '#9ca3af', fontSize: '12px', background: 'none', border: 'none', fontWeight: 500 }}>
                                    {/* Link for Forgot Password is omitted as per instructions */}
                                </span>
                            </label>
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
                        </div>
                        
                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            style={{ width: '100%', marginTop: '6px', borderRadius: '10px', padding: '10px 12px', fontSize: '14px', fontWeight: 600, color: '#fff', background: 'linear-gradient(90deg,#6366f1,#a855f7)', border: 'none', cursor: isSubmitting || !isFormValid ? 'default' : 'pointer', opacity: isSubmitting || !isFormValid ? 0.7 : 1 }}
                            disabled={!isFormValid || isSubmitting}
                        >
                            {isSubmitting ? 'Signing In...' : 'Sign In'}
                        </button>
                        
                        {/* Separator */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
                            <div style={{ flex: 1, height: '1px', background: '#e6e6e6' }}></div>
                            <div style={{ fontSize: '12px', color: '#9ca3af' }}>Or</div>
                            <div style={{ flex: 1, height: '1px', background: '#e6e6e6' }}></div>
                        </div>

                        {/* Google Login Button */}
                        <button 
                            type="button" 
                            onClick={handleGoogleLogin}
                            disabled={isSubmitting}
                            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px 10px', background: '#ffffff', fontSize: '14px', cursor: isSubmitting ? 'default' : 'pointer' }}
                        >
                            <img 
                                src="https://i.pinimg.com/736x/2f/80/9e/2f809e3268f29a6f81eca9b0864af1d1.jpg"
                                alt="Google logo" 
                                style={{ width: 18, height: 18 }}
                            />
                            <span>Sign in with Google</span>
                        </button>
                        
                    </form>
                    
                    {/* Register Link */}
                    <p style={{ textAlign: 'center', fontSize: '13px', color: '#374151', marginTop: '18px' }}>
                        Don't have an account? 
                        <button 
                            type="button" 
                            onClick={onRegisterRedirect}
                            style={{ color: '#7c3aed', fontWeight: 600, marginLeft: '6px', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                            Create Account
                        </button>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Login;