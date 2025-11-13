// src/componentsWhyBuildHabits.jsx

import React from 'react';
import { FaRegCompass, FaArrowTrendUp, FaBrain, FaRegHeart } from 'react-icons/fa6'; 
import useTheme from '../hooks/useTheme'; 

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
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const primaryColor = '#8b5cf6'; 
    const cardBg = isDark ? '#1f2937' : '#ffffff';
    const textColor = isDark ? '#e5e7eb' : '#1f2937';
    const subTextColor = isDark ? '#9ca3af' : '#6b7280';
    const cardBorder = isDark ? '#374151' : '#e5e7eb';
    const iconBoxBg = isDark ? '#374151' : '#f3f4f6';

    const containerStyle = {
        paddingTop: '6rem',
        paddingBottom: '6rem',
        backgroundColor: isDark ? '#111827' : '#ffffff', 
    };

    const headerStyle = {
        textAlign: 'center',
        marginBottom: '4rem',
    };

    const mainTitleStyle = {
        fontSize: '2.25rem', 
        fontWeight: '700',
        color: textColor, 
        margin: 0,
        marginBottom: '0.5rem',
    };

    const subTextStyle = {
        fontSize: '1rem',
        color: subTextColor, 
        margin: 0,
    };

    const gridContainerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1.5rem', 
        maxWidth: '1200px',
        margin: '0 auto',
        paddingLeft: '1rem',
        paddingRight: '1rem',
    };

    const cardStyle = {
        backgroundColor: cardBg,
        padding: '2rem',
        borderRadius: '0.75rem', 
        boxShadow: isDark
            ? '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.2)'
            : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        border: `1px solid ${cardBorder}`, 
        textAlign: 'left',
    };

    const iconBoxStyle = {
        color: primaryColor, 
        fontSize: '2.5rem', 
        marginBottom: '1rem',
        display: 'inline-flex',
        padding: '0.75rem',
        borderRadius: '50%',
        backgroundColor: iconBoxBg, 
    };

    const cardTitleStyle = {
        fontSize: '1.25rem', 
        fontWeight: '600',
        color: textColor,
        marginBottom: '0.5rem',
        marginTop: 0,
    };

    const cardDescriptionStyle = {
        fontSize: '0.9375rem', 
        color: subTextColor, 
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