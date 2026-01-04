// src/layouts/DashboardLayout.jsx
import React, { useState } from 'react';
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaPlus, FaList, FaUser, FaSignOutAlt, FaBars, FaTimes, FaChartLine } from 'react-icons/fa';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';
import useTheme from '../hooks/useTheme';
import ThemeToggle from '../components/ThemeToggle';
import ScrollToTop from '../components/ScrollToTop';
import defaultUserPhoto from '../assets/habit_icon.jpg';

const DashboardLayout = () => {
    const { user, logOut } = useAuth();
    const { theme } = useTheme();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const isDark = theme === 'dark';
    const primaryColor = '#8b5cf6';
    const bgColor = isDark ? '#111827' : '#f9fafb';
    const sidebarBg = isDark ? '#1f2937' : '#ffffff';
    const topBarBg = isDark ? '#1f2937' : '#ffffff';
    const borderColor = isDark ? '#374151' : '#e5e7eb';
    const textColor = isDark ? '#f9fafb' : '#111827';
    const subTextColor = isDark ? '#9ca3af' : '#6b7280';
    const hoverBg = isDark ? '#374151' : '#f3f4f6';
    const activeBg = primaryColor;

    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success('Logged out successfully');
                navigate('/');
            })
            .catch(error => {
                console.error(error);
                toast.error('Logout failed');
            });
    };

    const menuItems = [
        { path: '/dashboard', icon: FaChartLine, label: 'Overview', exact: true },
        { path: '/dashboard/my-habits', icon: FaList, label: 'My Habits' },
        { path: '/dashboard/add-habit', icon: FaPlus, label: 'Add Habit' },
        { path: '/dashboard/profile', icon: FaUser, label: 'Profile' }
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: bgColor }}>
            <ScrollToTop />
            {/* Sidebar */}
            <aside
                style={{
                    width: isSidebarOpen ? '250px' : '0',
                    backgroundColor: sidebarBg,
                    borderRight: `1px solid ${borderColor}`,
                    transition: 'width 0.3s',
                    overflow: 'hidden',
                    position: 'fixed',
                    height: '100vh',
                    zIndex: 40,
                }}
                onClick={(e) => {
                    if (window.innerWidth < 768 && e.target.tagName === 'A') {
                        setIsSidebarOpen(false);
                    }
                }}
            >
                <div style={{ padding: '1.5rem 1rem' }}>
                    {/* Logo with Close Button */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                        <Link
                            to="/"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                textDecoration: 'none',
                            }}
                        >
                            <img
                                src={defaultUserPhoto}
                                alt="Logo"
                                style={{ width: '36px', height: '36px', borderRadius: '50%' }}
                            />
                            <span style={{ fontSize: '1.25rem', fontWeight: '700', color: textColor }}>
                                HabitTracker
                            </span>
                        </Link>
                        
                        {/* Close Button */}
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                fontSize: '1.25rem',
                                color: textColor,
                                cursor: 'pointer',
                                padding: '0.25rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '0.375rem',
                                transition: 'background-color 0.2s',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverBg)}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                            <FaTimes />
                        </button>
                    </div>

                    {/* Menu Items */}
                    <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    end={item.exact}
                                    style={({ isActive }) => ({
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        padding: '0.75rem 1rem',
                                        borderRadius: '8px',
                                        textDecoration: 'none',
                                        color: isActive ? '#ffffff' : textColor,
                                        backgroundColor: isActive ? activeBg : 'transparent',
                                        fontWeight: isActive ? '600' : '500',
                                        fontSize: '0.95rem',
                                        transition: 'all 0.2s',
                                    })}
                                    onMouseEnter={(e) => {
                                        if (!e.currentTarget.className.includes('active')) {
                                            e.currentTarget.style.backgroundColor = hoverBg;
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!e.currentTarget.className.includes('active')) {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                        }
                                    }}
                                >
                                    <Icon style={{ fontSize: '1.1rem' }} />
                                    {item.label}
                                </NavLink>
                            );
                        })}
                    </nav>

                    {/* Back to Home */}
                    <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: `1px solid ${borderColor}` }}>
                        <Link
                            to="/"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                color: textColor,
                                fontWeight: '500',
                                fontSize: '0.95rem',
                                transition: 'all 0.2s',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverBg)}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                            <FaHome style={{ fontSize: '1.1rem' }} />
                            Back to Home
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div
                style={{
                    flex: 1,
                    marginLeft: window.innerWidth >= 768 && isSidebarOpen ? '250px' : '0',
                    transition: 'margin-left 0.3s',
                }}
            >
                {/* Top Navigation Bar */}
                <header
                    style={{
                        backgroundColor: topBarBg,
                        borderBottom: `1px solid ${borderColor}`,
                        padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1rem, 3vw, 2rem)',
                        position: 'sticky',
                        top: 0,
                        zIndex: 30,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    {/* Menu Toggle */}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            fontSize: '1.5rem',
                            color: textColor,
                            cursor: 'pointer',
                            padding: '0.5rem',
                        }}
                    >
                        {isSidebarOpen ? <FaTimes /> : <FaBars />}
                    </button>

                    {/* Right Side */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <ThemeToggle />

                        {/* Profile Dropdown */}
                        <div style={{ position: 'relative' }}>
                            <button
                                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    background: 'transparent',
                                    border: `1px solid ${borderColor}`,
                                    borderRadius: '9999px',
                                    padding: '0.5rem 1rem 0.5rem 0.5rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverBg)}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                            >
                                <img
                                    src={user?.photoURL || defaultUserPhoto}
                                    alt="User"
                                    style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                                />
                                <span style={{ color: textColor, fontWeight: '500', fontSize: '0.9rem' }}>
                                    {user?.displayName || 'User'}
                                </span>
                            </button>

                            {/* Dropdown Menu */}
                            {isProfileDropdownOpen && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '100%',
                                        right: 0,
                                        marginTop: '0.5rem',
                                        backgroundColor: sidebarBg,
                                        border: `1px solid ${borderColor}`,
                                        borderRadius: '8px',
                                        boxShadow: isDark
                                            ? '0 10px 25px rgba(0, 0, 0, 0.4)'
                                            : '0 10px 25px rgba(0, 0, 0, 0.1)',
                                        minWidth: '200px',
                                        padding: '0.5rem',
                                        zIndex: 50,
                                    }}
                                >
                                    <Link
                                        to="/dashboard/profile"
                                        onClick={() => setIsProfileDropdownOpen(false)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem',
                                            padding: '0.75rem 1rem',
                                            borderRadius: '6px',
                                            textDecoration: 'none',
                                            color: textColor,
                                            fontSize: '0.9rem',
                                            transition: 'background 0.2s',
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverBg)}
                                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                                    >
                                        <FaUser />
                                        Profile
                                    </Link>
                                    <Link
                                        to="/dashboard"
                                        onClick={() => setIsProfileDropdownOpen(false)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem',
                                            padding: '0.75rem 1rem',
                                            borderRadius: '6px',
                                            textDecoration: 'none',
                                            color: textColor,
                                            fontSize: '0.9rem',
                                            transition: 'background 0.2s',
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverBg)}
                                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                                    >
                                        <FaChartLine />
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setIsProfileDropdownOpen(false);
                                            handleLogout();
                                        }}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem',
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            borderRadius: '6px',
                                            border: 'none',
                                            background: 'transparent',
                                            color: '#ef4444',
                                            fontSize: '0.9rem',
                                            cursor: 'pointer',
                                            transition: 'background 0.2s',
                                            textAlign: 'left',
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverBg)}
                                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                                    >
                                        <FaSignOutAlt />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main style={{ padding: 'clamp(1rem, 3vw, 2rem)' }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
