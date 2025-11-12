// src/components/shared/Header.jsx

import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth'; 
import defaultUserPhoto from '../../assets/habit_icon.jpg'; 

const Header = () => {
    const { user, logOut, loading } = useAuth(); 

    const handleLogout = () => {
        logOut()
            .then(() => toast.success('You have logged out.'))
            .catch(error => {
                console.error(error);
                toast.error('Logout failed.');
            });
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '1rem' }}>
                <span className="loading loading-spinner loading-lg text-indigo-600"></span>
            </div>
        );
    }

    return (
        <header style={{ 
            position: 'sticky', 
            top: 0, 
            zIndex: 50, 
            backgroundColor: '#ffffff',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            width: '100%'
        }}>
            <nav style={{
                maxWidth: '1280px',
                margin: '0 auto',
                padding: '1rem 2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '2rem'
            }}>
                
                {/* Logo - Left */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                    <Link to="/" style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: '#111827',
                        textDecoration: 'none',
                        transition: 'opacity 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                        <img src={defaultUserPhoto} alt="Habit Icon" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                        HabitTracker
                    </Link>
                </div>

                {/* Navigation - Center */}
                <div style={{ 
                    display: 'flex',
                    gap: '2rem',
                    alignItems: 'center',
                    flex: 1,
                    justifyContent: 'center'
                }}>
                    <NavLink
                        to="/"
                        style={({ isActive }) => ({
                            color: isActive ? '#7c3aed' : '#374151',
                            textDecoration: 'none',
                            fontWeight: isActive ? '600' : '400',
                            borderBottom: isActive ? '2px solid #7c3aed' : 'none',
                            paddingBottom: '0.5rem',
                            transition: 'all 0.3s',
                            cursor: 'pointer'
                        })}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/browse"
                        style={({ isActive }) => ({
                            color: isActive ? '#7c3aed' : '#374151',
                            textDecoration: 'none',
                            fontWeight: isActive ? '600' : '400',
                            borderBottom: isActive ? '2px solid #7c3aed' : 'none',
                            paddingBottom: '0.5rem',
                            transition: 'all 0.3s',
                            cursor: 'pointer'
                        })}
                    >
                        Browse Public Habits
                    </NavLink>
                    {user && (
                        <>
                            <NavLink
                                to="/add-habit"
                                style={({ isActive }) => ({
                                    color: isActive ? '#7c3aed' : '#374151',
                                    textDecoration: 'none',
                                    fontWeight: isActive ? '600' : '400',
                                    borderBottom: isActive ? '2px solid #7c3aed' : 'none',
                                    paddingBottom: '0.5rem',
                                    transition: 'all 0.3s',
                                    cursor: 'pointer'
                                })}
                            >
                                Add Habit
                            </NavLink>
                            <NavLink
                                to="/my-habits"
                                style={({ isActive }) => ({
                                    color: isActive ? '#7c3aed' : '#374151',
                                    textDecoration: 'none',
                                    fontWeight: isActive ? '600' : '400',
                                    borderBottom: isActive ? '2px solid #7c3aed' : 'none',
                                    paddingBottom: '0.5rem',
                                    transition: 'all 0.3s',
                                    cursor: 'pointer'
                                })}
                            >
                                My Habits
                            </NavLink>
                        </>
                    )}
                </div>

                {/* Auth - Right */}
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1.5rem',
                    flexShrink: 0
                }}>
                    {!user ? (
                        <>
                            <Link
                                to="/login"
                                style={{
                                    color: '#374151',
                                    textDecoration: 'none',
                                    fontWeight: '500',
                                    transition: 'color 0.3s',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.color = '#7c3aed'}
                                onMouseLeave={(e) => e.currentTarget.style.color = '#374151'}
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
                        </>
                    ) : (
                        <div className="dropdown dropdown-end">
                            <button className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full border-2" style={{ borderColor: '#7c3aed', width: '40px', height: '40px', overflow: 'hidden' }}>
                                    <img src={user.photoURL || defaultUserPhoto} alt={user.displayName || 'User'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                            </button>
                            <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li><span style={{ fontWeight: 'bold' }}>{user.displayName || 'User'}</span></li>
                                <li><span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{user.email}</span></li>
                                <li><button onClick={handleLogout} style={{ color: '#dc2626' }}>Logout</button></li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;