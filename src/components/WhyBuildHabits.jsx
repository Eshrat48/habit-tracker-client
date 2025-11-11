// src/componentsWhyBuildHabits.jsx

import React from 'react';
// Use icons that are visually similar to the mockup
import { FaRegCompass, FaArrowTrendUp, FaBrain, FaRegHeart } from 'react-icons/fa6'; 

const benefitsData = [
    {
        icon: FaRegCompass,
        title: "Better Focus",
        description: "Stay on track with your goals and build consistency through daily habits.",
    },
    {
        icon: FaArrowTrendUp,
        title: "Increased Productivity",
        description: "Accomplish more by making positive behaviors automatic and effortless.",
    },
    {
        icon: FaBrain,
        title: "Mental Clarity",
        description: "Reduce decision fatigue and free up mental space for what matters most.",
    },
    {
        icon: FaRegHeart,
        title: "Reduced Stress",
        description: "Create structure and predictability that helps manage stress and anxiety.",
    },
];

const WhyBuildHabits = () => {
    // Styling constants for consistency
    const containerStyle = {
        paddingTop: '6rem',
        paddingBottom: '6rem',
        backgroundColor: '#ffffff', // White background
    };

    const headerStyle = {
        textAlign: 'center',
        marginBottom: '4rem',
    };

    const mainTitleStyle = {
        fontSize: '2.25rem', // text-4xl
        fontWeight: '700',
        color: '#1f2937', // gray-900
        margin: 0,
        marginBottom: '0.5rem',
    };

    const subTextStyle = {
        fontSize: '1rem',
        color: '#6b7280', // gray-500
        margin: 0,
    };

    const gridContainerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', // Responsive 4-column grid
        gap: '1.5rem', // gap-6
        maxWidth: '1200px',
        margin: '0 auto',
        paddingLeft: '1rem',
        paddingRight: '1rem',
    };

    const cardStyle = {
        backgroundColor: '#ffffff',
        padding: '2rem',
        borderRadius: '0.75rem', // rounded-xl
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)', // Subtle shadow
        border: '1px solid #e5e7eb', // Border for definition
        textAlign: 'left',
    };

    const iconBoxStyle = {
        color: '#8b5cf6', // Purple color for the icon
        fontSize: '2.5rem', // Icon size
        marginBottom: '1rem',
        // Optional: container for a light background circle around the icon
        display: 'inline-flex',
        padding: '0.75rem',
        borderRadius: '50%',
        backgroundColor: '#f3f4f6', // Light gray background
    };

    const cardTitleStyle = {
        fontSize: '1.25rem', // text-xl
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '0.5rem',
        marginTop: 0,
    };

    const cardDescriptionStyle = {
        fontSize: '0.9375rem', // Slightly larger than typical small text
        color: '#6b7280',
        lineHeight: '1.6',
        margin: 0,
    };

    return (
        <section id="why-build-habits" style={containerStyle}>
            
            {/* Header */}
            <div style={headerStyle}>
                <h2 style={mainTitleStyle}>Why Build Habits?</h2>
                <p style={subTextStyle}>Small daily actions lead to remarkable long-term results</p>
            </div>
            
            {/* Grid of Benefit Cards */}
            <div style={gridContainerStyle}>
                {benefitsData.map((benefit, index) => {
                    const IconComponent = benefit.icon;
                    return (
                        <div key={index} style={cardStyle}>
                            <div style={iconBoxStyle}>
                                <IconComponent />
                            </div>
                            <h3 style={cardTitleStyle}>{benefit.title}</h3>
                            <p style={cardDescriptionStyle}>{benefit.description}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default WhyBuildHabits;