// src/components/shared/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
// Note: Using a common icon library for X/Twitter is recommended. 
// You might need to install 'react-icons' if you haven't already: npm install react-icons
import { FaXTwitter } from 'react-icons/fa6'; // Represents the new X logo

const Footer = () => {
    // Assuming the website name is "Habit Tracker"
    const websiteName = "Habit Tracker";

    return (
        <footer className="bg-gray-800 text-white border-t border-purple-700/50">
            <div className="container mx-auto px-4 py-10 md:py-16">
                
                {/* Grid Container for Layout */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">

                    {/* 1. Logo, Website Name, and Contact Details */}
                    <div className="col-span-2 md:col-span-1 lg:col-span-2 space-y-4">
                        <div className="flex items-center space-x-2">
                            {/* Logo Placeholder (Replace with your actual Logo component or SVG) */}
                            <span className="text-3xl text-purple-400">🔥</span> 
                            {/* Website Name */}
                            <h3 className="text-2xl font-bold">{websiteName}</h3>
                        </div>
                        <p className="text-gray-400">
                            A web app for users to create, track, and manage daily habits to build streaks and boost productivity.
                        </p>
                        {/* Contact Details */}
                        <div className="text-gray-400 text-sm space-y-1 pt-2">
                            <p>Email: support@{websiteName.toLowerCase().replace(/\s/g, '')}.com</p>
                            <p>Phone: +1 (555) 123-4567</p>
                        </div>
                    </div>

                    {/* 2. Quick Links Section */}
                    <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-purple-300">Quick Links</h4>
                        <nav className="space-y-2 text-sm">
                            <Link to="/" className="block text-gray-400 hover:text-purple-400 transition-colors">Home</Link>
                            <Link to="/add-habit" className="block text-gray-400 hover:text-purple-400 transition-colors">Add Habit</Link>
                            <Link to="/my-habits" className="block text-gray-400 hover:text-purple-400 transition-colors">My Habits</Link>
                            <Link to="/browse" className="block text-gray-400 hover:text-purple-400 transition-colors">Browse Public Habits</Link>
                        </nav>
                    </div>
                    
                    {/* 3. Legal/Terms & Conditions */}
                    <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-purple-300">Legal</h4>
                        <nav className="space-y-2 text-sm">
                            <Link to="/terms" className="block text-gray-400 hover:text-purple-400 transition-colors">Terms & Conditions</Link>
                            <Link to="/privacy" className="block text-gray-400 hover:text-purple-400 transition-colors">Privacy Policy</Link>
                            <Link to="/cookies" className="block text-gray-400 hover:text-purple-400 transition-colors">Cookie Policy</Link>
                        </nav>
                    </div>

                    {/* 4. Social Media Links */}
                    <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-purple-300">Connect</h4>
                        <div className="flex space-x-4">
                            {/* New X Logo  */}
                            <a href="#" aria-label="X (Twitter)" className="text-gray-400 hover:text-white transition-colors text-xl">
                                <FaXTwitter />
                            </a>
                            <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors text-xl">
                                <FaFacebook />
                            </a>
                            <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors text-xl">
                                <FaInstagram />
                            </a>
                            <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors text-xl">
                                <FaLinkedin />
                            </a>
                        </div>
                    </div>

                </div>

                {/* Copyright/Final Alignment */}
                <div className="text-center border-t border-gray-700 mt-10 pt-6">
                    <p className="text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} {websiteName}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;