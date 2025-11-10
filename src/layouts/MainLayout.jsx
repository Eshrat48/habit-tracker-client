// src/layouts/MainLayout.jsx

import { Outlet } from 'react-router-dom';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';

const MainLayout = () => {
    return (
        <div>
            <Header /> 
            
            {/* Tailwind/DaisyUI class for minimum height to push footer down */}
            <main className="min-h-[calc(100vh-250px)]"> 
                <Outlet />
            </main>
            
            <Footer />
        </div>
    );
};

export default MainLayout;