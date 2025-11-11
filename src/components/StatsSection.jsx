// src/components/home/StatsSection.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaRegCircleCheck, FaBolt } from 'react-icons/fa6'; 

const statsData = [
    {
        icon: FaUsers,
        value: "10,000+",
        label: "Active Users",
    },
    {
        icon: FaRegCircleCheck,
        value: "50,000+",
        label: "Habits Completed",
    },
    {
        icon: FaBolt,
        value: "5,000+",
        label: "Streaks Active",
    },
];

const StatsSection = () => {
    // Styling constants for the stats section
    const sectionContainerStyle = {
        padding: '0rem 1rem',
        margin: '6rem auto',
        maxWidth: '1200px',
    };

    const statsBoxStyle = {
        padding: '4rem 2rem',
        borderRadius: '1rem',
        textAlign: 'center',
        // Purple gradient background
        backgroundImage: 'linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%)', 
        color: '#ffffff',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    };

    const headerTitleStyle = {
        fontSize: '2rem', 
        fontWeight: '700',
        marginBottom: '0.5rem',
        margin: 0,
    };

    const headerSubTitleStyle = {
        fontSize: '1rem',
        fontWeight: '300',
        marginTop: '0.75rem', 
        marginBottom: '4rem',
        margin: 0,
    };

    const statsGridStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        gap: '2rem',
        marginBottom: '3.5rem',
        flexWrap: 'wrap',
    };

    const statItemStyle = {
        flex: '1 1 200px',
        display: 'flex',          // Enable flexbox
        flexDirection: 'column',  // Stack items vertically
        alignItems: 'center',     // Center items horizontally (the fix!)
        textAlign: 'center',      // Still useful for text inside <p> elements
    };

    const iconStyle = {
        fontSize: '3rem', 
        marginTop: '2rem',
        marginBottom: '1rem', 
        color: '#ffffff',
    };

    // FIXED: Ensure all margins are set to zero to prevent default browser styling from offsetting the center.
    const valueStyle = {
        fontSize: '2.5rem',
        fontWeight: '800',
        margin: 0, // Explicitly set margin to 0
        lineHeight: '1.1',
    };

    // FIXED: Ensure all margins are set to zero and use padding/line-height for spacing if necessary.
    const labelStyle = {
        fontSize: '1rem',
        fontWeight: '400',
        marginTop: '0.75rem', // Controlled spacing below value
        margin: 0, // Explicitly set margin to 0, relying on marginTop for spacing
    };

    // Button style
    const buttonStyle = {
        display: 'inline-block',
        padding: '0.75rem 2.5rem',
        fontSize: '1rem',
        fontWeight: '600',
        color: '#8b5cf6',
        backgroundColor: '#ffffff',
        border: 'none',
        borderRadius: '0.5rem',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, transform 0.2s ease',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    };

    const handleMouseEnter = (e) => {
        e.currentTarget.style.backgroundColor = '#f3f4f6'; 
        e.currentTarget.style.transform = 'translateY(-2px)';
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.backgroundColor = '#ffffff';
        e.currentTarget.style.transform = 'translateY(0)';
    };

    return (
        <section style={sectionContainerStyle}>
            <div style={statsBoxStyle}>
                
                {/* Header */}
                <h3 style={headerTitleStyle}>Join Our Growing Community</h3>
                <p style={headerSubTitleStyle}>Thousands of people are building better habits every day</p>

                {/* Stats Grid */}
                <div style={statsGridStyle}>
                    {statsData.map((stat, index) => {
                        const IconComponent = stat.icon;
                        return (
                            <div key={index} style={statItemStyle}>
                                
                                <IconComponent style={iconStyle} /> 
                                
                                <p style={valueStyle}>{stat.value}</p>
                                <p style={labelStyle}>{stat.label}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Call-to-Action Button */}
                <Link 
                    to="/register" 
                    style={buttonStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    Start Building Today
                </Link>
            </div>
        </section>
    );
};

export default StatsSection;