// src/components/shared/Header.jsx

import React, { useState } from 'react'; 
import { Link, NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth'; 
import useTheme from '../../hooks/useTheme'; 
import ThemeToggle from '../ThemeToggle'; 
import defaultUserPhoto from '../../assets/habit_icon.jpg'; 

const Header = () => {
    const { user, logOut, loading } = useAuth(); 
    const { theme } = useTheme();
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success('You have logged out.');
                setIsDropdownOpen(false); 
            })
            .catch(error => {
                console.error(error);
                toast.error('Logout failed.');
            });
    };

    const headerStyle = {
        position: 'sticky', 
        top: 0, 
        zIndex: 50, 
        backgroundColor: theme === 'light' ? '#ffffff' : '#1f2937', 
        boxShadow: theme === 'light' ? '0 1px 3px rgba(0,0,0,0.1)' : '0 1px 3px rgba(255,255,255,0.05)',
        width: '100%'
    };

    const linkBaseColor = theme === 'light' ? '#374151' : '#d1d5db'; 
    const logoColor = theme === 'light' ? '#111827' : '#e5e7eb'; 
    const activeLinkColor = '#7c3aed'; 

    // Desktop Nav Link Style
    const getNavLinkStyle = ({ isActive }) => ({
        color: isActive ? activeLinkColor : linkBaseColor,
        textDecoration: 'none',
        fontWeight: isActive ? '600' : '400',
        borderBottom: isActive ? `2px solid ${activeLinkColor}` : 'none',
        paddingBottom: '0.5rem',
        transition: 'all 0.3s',
        cursor: 'pointer'
    });

    // Desktop and Mobile gap increased
    const navContainerStyle = {
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '1rem 3rem', // Increased padding for wider spacing
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '3rem'  // Increased gap between elements
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: headerStyle.backgroundColor }}>
                <span className="loading loading-spinner loading-lg text-indigo-600"></span>
            </div>
        );
    }

    return (
        <header style={headerStyle}> 
            <nav style={navContainerStyle}>
                
                {/* Logo - Left */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                    <Link to="/" style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: logoColor, 
                        textDecoration: 'none',
                        transition: 'opacity 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1' }
                    >
                        <img src={defaultUserPhoto} alt="Habit Icon" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                        HabitTracker
                    </Link>
                </div>

                {/* Navigation - Center (DESKTOP ONLY) */}

{/* Navigation - Center (DESKTOP ONLY) */}
<div 
    className="hidden lg:flex" 
    style={{ 
        gap: '4rem',  // Increased gap between the nav links (previously 3rem)
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    }}
>
    <NavLink 
        to="/" 
        style={({ isActive }) => ({
            color: isActive ? '#7c3aed' : theme === 'light' ? '#374151' : '#d1d5db',
            textDecoration: 'none',
            fontWeight: isActive ? '600' : '400',
            borderBottom: isActive ? `2px solid #7c3aed` : 'none',
            paddingBottom: '0.5rem',
            transition: 'all 0.3s',
            cursor: 'pointer',
            padding: '0 1rem', 
        })}
    >
        Home
    </NavLink>

    <NavLink 
        to="/browse" 
        style={({ isActive }) => ({
            color: isActive ? '#7c3aed' : theme === 'light' ? '#374151' : '#d1d5db',
            textDecoration: 'none',
            fontWeight: isActive ? '600' : '400',
            borderBottom: isActive ? `2px solid #7c3aed` : 'none',
            paddingBottom: '0.5rem',
            transition: 'all 0.3s',
            cursor: 'pointer',
            padding: '0 1rem',
        })}
    >
        Browse Public Habits
    </NavLink>

    {!user && (
        <NavLink 
            to="/about" 
            style={({ isActive }) => ({
                color: isActive ? '#7c3aed' : theme === 'light' ? '#374151' : '#d1d5db',
                textDecoration: 'none',
                fontWeight: isActive ? '600' : '400',
                borderBottom: isActive ? `2px solid #7c3aed` : 'none',
                paddingBottom: '0.5rem',
                transition: 'all 0.3s',
                cursor: 'pointer',
                padding: '0 1rem',
            })}
        >
            About
        </NavLink>
    )}

    {user && (
        <>
            <NavLink 
                to="/dashboard" 
                style={({ isActive }) => ({
                    color: isActive ? '#7c3aed' : theme === 'light' ? '#374151' : '#d1d5db',
                    textDecoration: 'none',
                    fontWeight: isActive ? '600' : '400',
                    borderBottom: isActive ? `2px solid #7c3aed` : 'none',
                    paddingBottom: '0.5rem',
                    transition: 'all 0.3s',
                    cursor: 'pointer',
                    padding: '0 1rem',
                })}
            >
                Dashboard
            </NavLink>
        </>
    )}
</div>


                {/* Auth & Theme Toggle - Right */}
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '3rem',  // Increased gap between the auth links and theme toggle
                    flexShrink: 0
                }}>
                    <ThemeToggle />

                    {/* Login and Sign Up Section */}
                    <div style={{
                        display: 'flex',
                        gap: '2.5rem',  // Increase gap between Login, SignUp and the theme toggle
                        alignItems: 'center',
                    }}>
                        {!user ? (
                            <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
                                <Link
                                    to="/login"
                                    style={{
                                        color: linkBaseColor, 
                                        textDecoration: 'none',
                                        fontWeight: '500',
                                        transition: 'color 0.3s',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = activeLinkColor}
                                    onMouseLeave={(e) => e.currentTarget.style.color = linkBaseColor}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    style={{
                                        background: 'linear-gradient(to right, #6366f1, #a855f7, #9333ea)',
                                        color: '#ffffff',
                                        padding: '0.5rem 1.5rem',
                                        borderRadius: '9999px',
                                        textDecoration: 'none',
                                        fontWeight: '600',
                                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                        transition: 'all 0.3s',
                                        display: 'inline-block',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.opacity = '0.95';
                                        e.currentTarget.style.transform = 'scale(1.05)';
                                        e.currentTarget.style.boxShadow = '0 8px 12px rgba(0,0,0,0.15)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.opacity = '1';
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                                    }}
                                >
                                    Sign Up
                                </Link>
                            </div>
                        ) : (
                            <div className="dropdown dropdown-end hidden lg:block"> 
                                <div 
                                    tabIndex={0} 
                                    role="button" 
                                    className="cursor-pointer" 
                                    onClick={toggleDropdown} 
                                    style={{ 
                                        width: '40px', 
                                        height: '40px', 
                                        borderRadius: '50%', 
                                        overflow: 'hidden',
                                        border: `2px solid ${activeLinkColor}`, 
                                        cursor: 'pointer',
                                        backgroundColor: 'transparent', 
                                        padding: '0', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center' 
                                    }}
                                >
                                    <img 
                                        src={user.photoURL || defaultUserPhoto} 
                                        alt={user.displayName || 'User'} 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                    />
                                </div>
                                
                                <ul 
                                    tabIndex={0} 
                                    className="dropdown-content menu p-2 shadow rounded-box w-52"
                                    style={{
                                        display: isDropdownOpen ? 'block' : 'none', 
                                        backgroundColor: theme === 'light' ? '#ffffff' : '#374151',
                                        color: linkBaseColor,
                                        border: `1px solid ${theme === 'light' ? '#e5e7eb' : '#4b5563'}`,
                                        padding: '12px 16px', 
                                        position: 'absolute', 
                                        top: 'calc(100% + 10px)', 
                                        right: '0',              
                                        zIndex: 60,
                                    }}
                                >
                                    <li style={{ marginBottom: '10px' }}>
                                        <div style={{ padding: '0', display: 'block' }}>
                                            <p style={{ fontWeight: '700', color: logoColor, margin: '0' }}>
                                                {user.displayName || 'User'}
                                            </p>
                                            <p style={{ fontSize: '0.8rem', color: theme === 'light' ? '#6b7280' : '#9ca3af', margin: '0', wordBreak: 'break-all' }}>
                                                {user.email}
                                            </p>
                                        </div>
                                    </li>
                                    
                                    <div style={{ height: '1px', background: theme === 'light' ? '#e5e7eb' : '#4b5563', margin: '6px 0' }}></div>

                                    <li>
                                        <button 
                                            onClick={handleLogout} 
                                            style={{ 
                                                color: '#dc2626', 
                                                fontWeight: '600',
                                                backgroundColor: 'transparent',
                                                border: 'none',
                                                textAlign: 'left',
                                                padding: '8px 10px',
                                                width: '100%',
                                                borderRadius: '6px',
                                                cursor: 'pointer',
                                                transition: 'background-color 0.15s'
                                            }}
                                            onMouseEnter={(e) => e.target.style.backgroundColor = theme === 'light' ? '#fee2e2' : '#ef444430'}
                                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
