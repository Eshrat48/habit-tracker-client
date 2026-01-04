// src/pages/Profile.jsx
import React, { useState } from 'react';
import { updateProfile } from 'firebase/auth';
import { FaUser, FaEnvelope, FaImage, FaSave } from 'react-icons/fa';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';
import useTheme from '../hooks/useTheme';

const Profile = () => {
    const { user } = useAuth();
    const { theme } = useTheme();
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
    const [loading, setLoading] = useState(false);

    const isDark = theme === 'dark';
    const primaryColor = '#8b5cf6';
    const bgColor = isDark ? '#111827' : '#f9fafb';
    const cardBg = isDark ? '#1f2937' : '#ffffff';
    const titleColor = isDark ? '#f9fafb' : '#111827';
    const textColor = isDark ? '#d1d5db' : '#6b7280';
    const borderColor = isDark ? '#374151' : '#e5e7eb';
    const inputBg = isDark ? '#111827' : '#f9fafb';

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        
        if (!displayName.trim()) {
            toast.error('Display name cannot be empty');
            return;
        }

        setLoading(true);
        try {
            await updateProfile(user, {
                displayName: displayName.trim(),
                photoURL: photoURL.trim() || null,
            });
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Page Title */}
            <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: '700', color: titleColor, marginBottom: '0.5rem' }}>
                My Profile
            </h1>
            <p style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)', color: textColor, marginBottom: '2rem' }}>
                Update your personal information
            </p>

            <div style={{ maxWidth: '800px' }}>
                {/* Profile Card */}
                <div
                    style={{
                        backgroundColor: cardBg,
                        borderRadius: '12px',
                        border: `1px solid ${borderColor}`,
                        padding: 'clamp(1.5rem, 3vw, 2rem)',
                        marginBottom: '2rem',
                    }}
                >
                    {/* Profile Photo Section */}
                    <div style={{ display: 'flex', flexDirection: window.innerWidth < 640 ? 'column' : 'row', alignItems: 'center', gap: 'clamp(1rem, 3vw, 2rem)', marginBottom: '2rem', textAlign: window.innerWidth < 640 ? 'center' : 'left' }}>
                        <div
                            style={{
                                width: 'clamp(80px, 15vw, 100px)',
                                height: 'clamp(80px, 15vw, 100px)',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                border: `3px solid ${primaryColor}`,
                                backgroundColor: isDark ? '#374151' : '#e5e7eb',
                                flexShrink: 0,
                            }}
                        >
                            {user?.photoURL ? (
                                <img
                                    src={user.photoURL}
                                    alt="Profile"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            ) : (
                                <div
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '3rem',
                                        color: textColor,
                                    }}
                                >
                                    <FaUser />
                                </div>
                            )}
                        </div>
                        <div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: titleColor, margin: 0, marginBottom: '0.5rem' }}>
                                {user?.displayName || 'User'}
                            </h2>
                            <p style={{ fontSize: '0.875rem', color: textColor, margin: 0 }}>
                                {user?.email}
                            </p>
                        </div>
                    </div>

                    {/* Edit Form */}
                    <form onSubmit={handleUpdateProfile}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label
                                htmlFor="displayName"
                                style={{
                                    display: 'block',
                                    fontSize: '0.875rem',
                                    fontWeight: '600',
                                    color: titleColor,
                                    marginBottom: '0.5rem',
                                }}
                            >
                                Display Name
                            </label>
                            <div style={{ position: 'relative' }}>
                                <FaUser
                                    style={{
                                        position: 'absolute',
                                        left: '1rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: textColor,
                                        fontSize: '1rem',
                                    }}
                                />
                                <input
                                    type="text"
                                    id="displayName"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    placeholder="Enter your name"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem 0.75rem 3rem',
                                        fontSize: '1rem',
                                        backgroundColor: inputBg,
                                        border: `1px solid ${borderColor}`,
                                        borderRadius: '8px',
                                        color: titleColor,
                                        outline: 'none',
                                        transition: 'border-color 0.2s',
                                        boxSizing: 'border-box',
                                    }}
                                    onFocus={(e) => (e.target.style.borderColor = primaryColor)}
                                    onBlur={(e) => (e.target.style.borderColor = borderColor)}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label
                                htmlFor="email"
                                style={{
                                    display: 'block',
                                    fontSize: '0.875rem',
                                    fontWeight: '600',
                                    color: titleColor,
                                    marginBottom: '0.5rem',
                                }}
                            >
                                Email Address
                            </label>
                            <div style={{ position: 'relative' }}>
                                <FaEnvelope
                                    style={{
                                        position: 'absolute',
                                        left: '1rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: textColor,
                                        fontSize: '1rem',
                                    }}
                                />
                                <input
                                    type="email"
                                    id="email"
                                    value={user?.email || ''}
                                    disabled
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem 0.75rem 3rem',
                                        fontSize: '1rem',
                                        backgroundColor: isDark ? '#0f172a' : '#f3f4f6',
                                        border: `1px solid ${borderColor}`,
                                        borderRadius: '8px',
                                        color: textColor,
                                        cursor: 'not-allowed',
                                        boxSizing: 'border-box',
                                    }}
                                />
                            </div>
                            <p style={{ fontSize: '0.75rem', color: textColor, marginTop: '0.25rem' }}>
                                Email cannot be changed
                            </p>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label
                                htmlFor="photoURL"
                                style={{
                                    display: 'block',
                                    fontSize: '0.875rem',
                                    fontWeight: '600',
                                    color: titleColor,
                                    marginBottom: '0.5rem',
                                }}
                            >
                                Profile Photo URL
                            </label>
                            <div style={{ position: 'relative' }}>
                                <FaImage
                                    style={{
                                        position: 'absolute',
                                        left: '1rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: textColor,
                                        fontSize: '1rem',
                                    }}
                                />
                                <input
                                    type="url"
                                    id="photoURL"
                                    value={photoURL}
                                    onChange={(e) => setPhotoURL(e.target.value)}
                                    placeholder="https://example.com/photo.jpg"
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem 0.75rem 3rem',
                                        fontSize: '1rem',
                                        backgroundColor: inputBg,
                                        border: `1px solid ${borderColor}`,
                                        borderRadius: '8px',
                                        color: titleColor,
                                        outline: 'none',
                                        transition: 'border-color 0.2s',
                                        boxSizing: 'border-box',
                                    }}
                                    onFocus={(e) => (e.target.style.borderColor = primaryColor)}
                                    onBlur={(e) => (e.target.style.borderColor = borderColor)}
                                />
                            </div>
                            <p style={{ fontSize: '0.75rem', color: textColor, marginTop: '0.25rem' }}>
                                Enter a valid image URL
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '0.875rem 2rem',
                                fontSize: '1rem',
                                fontWeight: '600',
                                color: '#ffffff',
                                backgroundColor: primaryColor,
                                border: 'none',
                                borderRadius: '8px',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                opacity: loading ? 0.6 : 1,
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                            }}
                            onMouseEnter={(e) => {
                                if (!loading) e.target.style.backgroundColor = '#7c3aed';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = primaryColor;
                            }}
                        >
                            {loading ? (
                                <>
                                    <div
                                        style={{
                                            width: '16px',
                                            height: '16px',
                                            border: '2px solid #ffffff',
                                            borderTop: '2px solid transparent',
                                            borderRadius: '50%',
                                            animation: 'spin 1s linear infinite',
                                        }}
                                    />
                                    <span>Saving...</span>
                                </>
                            ) : (
                                <>
                                    <FaSave />
                                    <span>Save Changes</span>
                                </>
                            )}
                        </button>
                        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                    </form>
                </div>

                {/* Account Info */}
                <div
                    style={{
                        backgroundColor: cardBg,
                        borderRadius: '12px',
                        border: `1px solid ${borderColor}`,
                        padding: '1.5rem',
                    }}
                >
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: titleColor, marginBottom: '1rem' }}>
                        Account Information
                    </h3>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '0.875rem', color: textColor }}>Account Created:</span>
                            <span style={{ fontSize: '0.875rem', color: titleColor, fontWeight: '600' }}>
                                {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}
                            </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '0.875rem', color: textColor }}>Last Sign In:</span>
                            <span style={{ fontSize: '0.875rem', color: titleColor, fontWeight: '600' }}>
                                {user?.metadata?.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleDateString() : 'N/A'}
                            </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '0.875rem', color: textColor }}>User ID:</span>
                            <span style={{ fontSize: '0.875rem', color: titleColor, fontWeight: '600', fontFamily: 'monospace' }}>
                                {user?.uid?.substring(0, 16)}...
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
