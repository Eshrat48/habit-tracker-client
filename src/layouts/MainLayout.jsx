// src/layouts/MainLayout.jsx

import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/shared/Header'; 
import Footer from '../components/shared/Footer'; 

const MainLayout = () => {
    const location = useLocation();

    // The router's errorElement handles the 404 page, so we keep the layout simple here.
    const isErrorPage = location.pathname === '/404' || location.pathname === '/error';

    return (
        <div className="flex flex-col min-h-screen bg-white"> 
            
            {/* Header / Navbar */}
            <Header /> 

            {/* Main Content Area (Routes are rendered here) */}
            <main className="flex-grow"> 
                <Outlet />
            </main>

            {/* Footer Section */}
            <Footer />
        </div>
    );
};

export default MainLayout;