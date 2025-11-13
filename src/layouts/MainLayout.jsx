// src/layouts/MainLayout.jsx

import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/shared/Header'; 
import Footer from '../components/shared/Footer'; 
import useTheme from '../hooks/useTheme';

const MainLayout = () => {
    const location = useLocation();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const isErrorPage = location.pathname === '/404' || location.pathname === '/error';

    return (
        <div 
            className="flex flex-col min-h-screen" 
            style={{ 
                backgroundColor: isDark ? '#111827' : '#ffffff', 
                color: isDark ? '#e5e7eb' : '#1f2937', 
            }}
        > 
            
            {/* Header / Navbar */}
            <Header /> 

            <main className="flex-grow"> 
                <Outlet />
            </main>

            {/* Footer Section */}
            <Footer />
        </div>
    );
};

export default MainLayout;