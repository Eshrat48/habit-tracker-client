// src/pages/Register.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'; 
import useTheme from '../hooks/useTheme'; 
import toast from 'react-hot-toast'; 
import { User, Mail, Lock, Link as LinkIcon, LogIn } from 'lucide-react'; 

const Register = () => {
    // --- State and Hooks ---
    const navigate = useNavigate();
    const { createUser, updateUserProfile, googleLogin, saveUserToDB } = useAuth();
    const { theme } = useTheme(); 
    
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

    const isDark = theme === 'dark';
    
    const colors = {
        pageBg: isDark ? '#1f2937' : '#f9fafb',
        surfaceBg: isDark ? '#374151' : '#ffffff',
        primaryText: isDark ? '#f9fafb' : '#0f172a',
        secondaryText: isDark ? '#9ca3af' : '#6b7280',
        inputBg: isDark ? '#4b5563' : '#f3f4f6',
        inputIcon: isDark ? '#d1d5db' : '#9ca3af',
        cardBorder: isDark ? '#4b5563' : '#eef2f7',
        divider: isDark ? '#4b5563' : '#e6e6e6',
        
        // Error/Validation
        danger: isDark ? '#f87171' : '#ef4444',
        success: isDark ? '#4ade80' : '#10b981',
        errorBg: isDark ? '#450a0a' : '#fff1f2',
        errorBorder: isDark ? '#7f1d1d' : '#fee2e2',
        errorText: isDark ? '#fecaca' : '#991b1b',

        // Icon Circle
        iconCircleBg: isDark ? 'rgba(79, 70, 229, 0.2)' : '#eef2ff',
        iconCircleColor: isDark ? '#818cf8' : '#4f46e5',
        googleButtonBg: isDark ? '#4b5563' : '#ffffff',
        googleButtonBorder: isDark ? '#6b7280' : '#e5e7eb',
    };

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
            let errorMessage = 'Google sign-in failed. Please try again.';
            
            // Handle specific error codes
            if (err.message?.includes('popup')) {
                errorMessage = err.message; 
            } else if (err.code === 'auth/network-request-failed') {
                errorMessage = 'Network error. Please check your connection and try again.';
            } else if (err.message) {
                errorMessage = err.message;
            }
            
            console.error('Google sign-in error:', err);
            setError(errorMessage);
            toast.error(errorMessage);
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
            toast.error('Validation failed.');
            return;
        }

        setIsSubmitting(true);
        setError('');

        const { email, password, fullName, photoURL } = formData;

        try {
            // 1. Create User in Firebase Authentication
            const result = await createUser(email, password);
            const user = result.user; // Get the user object after creation
            
            // 2. Update User Profile with Name and PhotoURL
            await updateUserProfile(fullName, photoURL || null);

            // 3. NEW STEP: Save user data to MongoDB 
            const userData = {
                email: user.email,
                fullName: fullName,
                photoURL: photoURL || null,
                firebaseUID: user.uid,
            };
            
            try {
                await saveUserToDB(userData); 
            } catch (dbError) {
                console.error('MongoDB save error (non-critical):', dbError);
                toast.success('Account created! (Some data sync delayed)');
            }
            
            toast.success('Registration successful! Welcome.');
            navigate('/');

        } catch (err) {
            let errorMessage = 'Registration failed. Please check your details.';
            
            // Handle specific Firebase error codes
            if (err.code === 'auth/email-already-in-use') {
                errorMessage = 'This email is already registered. Please try logging in.';
            } else if (err.code === 'auth/weak-password') {
                errorMessage = 'Password is too weak. Please use a stronger one.';
            } else if (err.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email address. Please check and try again.';
            } else if (err.code === 'auth/network-request-failed') {
                errorMessage = 'Network error. Please check your internet connection.';
            } else if (err.message) {
                errorMessage = err.message;
            }

            console.error('Registration error:', err);
            setError(errorMessage);
            toast.error(errorMessage);

        } finally {
            setIsSubmitting(false);
        }
    };

    const ValidationItem = ({ isValid, children }) => (
        <li style={{ display: 'flex', alignItems: 'center', fontSize: '12px', color: isValid ? colors.success : colors.danger }}>
            <span style={{ marginRight: '4px' }}>
                {isValid ? '✓' : '•'}
            </span>
            {children}
        </li>
    );

    // --- JSX Render ---
    return (
        <div style={{ minHeight: 'calc(100vh - 72px)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.pageBg, padding: '24px' }}>
            <div style={{ width: '100%', maxWidth: '420px', background: colors.surfaceBg, borderRadius: '12px', boxShadow: isDark ? '0 8px 30px rgba(0,0,0,0.4)' : '0 8px 30px rgba(17,24,39,0.06)', border: `1px solid ${colors.cardBorder}` }}>
                <div style={{ padding: '28px' }}>

                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <div style={{ margin: '0 auto', width: '56px', height: '56px', background: colors.iconCircleBg, color: colors.iconCircleColor, borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                            <User style={{ width: 20, height: 20 }} />
                        </div>
                        <h2 style={{ fontSize: '18px', fontWeight: 600, color: colors.primaryText }}>Create Account</h2>
                        <p style={{ fontSize: '13px', color: colors.secondaryText, marginTop: '6px' }}>Start building better habits today</p>
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div role="alert" style={{ 
                            marginBottom: '12px', 
                            fontSize: '13px', 
                            color: colors.errorText, 
                            background: colors.errorBg, 
                            border: `1px solid ${colors.errorBorder}`, 
                            borderRadius: '8px', 
                            padding: '10px' 
                        }}>
                            {error}
                        </div>
                    )}

                    {/* Registration Form */}
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                        {/* Full Name */}
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: colors.primaryText, marginBottom: '6px' }}>Name</label>
                            <div style={{ display: 'flex', alignItems: 'center', background: colors.inputBg, borderRadius: '8px', overflow: 'hidden' }}>
                                <div style={{ padding: '10px', color: colors.inputIcon }}><User style={{ width: 18, height: 18 }} /></div>
                                <input
                                    type="text"
                                    id="fullName"
                                    placeholder="John Doe"
                                    style={{ flex: 1, border: 'none', background: 'transparent', padding: '10px 12px', fontSize: '14px', color: colors.primaryText }}
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: colors.primaryText, marginBottom: '6px' }}>Email</label>
                            <div style={{ display: 'flex', alignItems: 'center', background: colors.inputBg, borderRadius: '8px', overflow: 'hidden' }}>
                                <div style={{ padding: '10px', color: colors.inputIcon }}><Mail style={{ width: 18, height: 18 }} /></div>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="you@example.com"
                                    style={{ flex: 1, border: 'none', background: 'transparent', padding: '10px 12px', fontSize: '14px', color: colors.primaryText }}
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Photo URL */}
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: colors.primaryText, marginBottom: '6px' }}>Photo URL</label>
                            <div style={{ display: 'flex', alignItems: 'center', background: colors.inputBg, borderRadius: '8px', overflow: 'hidden' }}>
                                <div style={{ padding: '10px', color: colors.inputIcon }}><LinkIcon style={{ width: 18, height: 18 }} /></div>
                                <input
                                    type="url"
                                    id="photoURL"
                                    placeholder="https://example.com/photo.jpg"
                                    style={{ flex: 1, border: 'none', background: 'transparent', padding: '10px 12px', fontSize: '14px', color: colors.primaryText }}
                                    value={formData.photoURL}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: colors.primaryText, marginBottom: '6px' }}>Password</label>
                            <div style={{ display: 'flex', alignItems: 'center', background: colors.inputBg, borderRadius: '8px', overflow: 'hidden' }}>
                                <div style={{ padding: '10px', color: colors.inputIcon }}><Lock style={{ width: 18, height: 18 }} /></div>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="********"
                                    style={{ flex: 1, border: 'none', background: 'transparent', padding: '10px 12px', fontSize: '14px', color: colors.primaryText }}
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            
                            {/* Validation Requirements List */}
                            <ul style={{ listStyle: 'none', paddingLeft: '0', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                <ValidationItem isValid={passwordValidation.minLength}>
                                    Length must be at least **6 characters**
                                </ValidationItem>
                                <ValidationItem isValid={passwordValidation.hasUppercase}>
                                    Must have an **Uppercase** letter
                                </ValidationItem>
                                <ValidationItem isValid={passwordValidation.hasLowercase}>
                                    Must have a **Lowercase** letter
                                </ValidationItem>
                            </ul>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            style={{ 
                                width: '100%', 
                                marginTop: '6px', 
                                borderRadius: '10px', 
                                padding: '10px 12px', 
                                fontSize: '14px', 
                                fontWeight: 600, 
                                color: '#fff', 
                                background: 'linear-gradient(90deg,#6366f1,#a855f7)', 
                                border: 'none', 
                                cursor: isSubmitting || !isFormValid ? 'default' : 'pointer', 
                                opacity: isSubmitting || !isFormValid ? 0.7 : 1,
                                transition: 'opacity 0.2s'
                            }}
                            disabled={!isFormValid || isSubmitting}
                        >
                            {isSubmitting ? 'Creating Account...' : 'Create Account'}
                        </button>

                        {/* Divider */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
                            <div style={{ flex: 1, height: '1px', background: colors.divider }}></div>
                            <div style={{ fontSize: '12px', color: colors.secondaryText }}>Or continue with</div>
                            <div style={{ flex: 1, height: '1px', background: colors.divider }}></div>
                        </div>

                        {/* Google Button */}
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={isSubmitting}
                            style={{ 
                                width: '100%', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                gap: '8px', 
                                border: `1px solid ${colors.googleButtonBorder}`, 
                                borderRadius: '8px', 
                                padding: '8px 10px', 
                                background: colors.googleButtonBg, 
                                fontSize: '14px', 
                                cursor: isSubmitting ? 'default' : 'pointer',
                                color: colors.primaryText
                            }}
                        >
                            <img src="https://i.pinimg.com/736x/2f/80/9e/2f809e3268f29a6f81eca9b0864af1d1.jpg" alt="Google" style={{ width: 18, height: 18 }} />
                            <span>Sign up with Google</span>
                        </button>

                    </form>

                    {/* Sign in link */}
                    <p style={{ textAlign: 'center', fontSize: '13px', color: colors.secondaryText, marginTop: '18px' }}>Already have an account? 
                        <button type="button" onClick={onLoginRedirect} style={{ color: '#7c3aed', fontWeight: 600, marginLeft: '6px', background: 'none', border: 'none', cursor: 'pointer' }}>
                            Sign in
                        </button>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Register;