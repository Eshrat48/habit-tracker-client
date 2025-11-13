// src/components/HowItWorks.jsx
import React from 'react';
import useTheme from '../hooks/useTheme.js'; 

const stepsData = [
    {
        number: 1,
        title: "Create Your Habit",
        description: "Define the habit you want to build with a clear title and description",
    },
    {
        number: 2,
        title: "Track Daily Progress",
        description: "Mark your habit complete each day and watch your streak grow",
    },
    {
        number: 3,
        title: "Achieve Your Goals",
        description: "Build consistency and transform your life one day at a time",
    },
];

const HowItWorks = () => {
    const { theme } = useTheme(); 
    const isDark = theme === 'dark';

    const primaryColor = '#8b5cf6'; 
    
    const containerStyle = {
        paddingTop: '6rem',
        paddingBottom: '6rem',
        backgroundColor: isDark ? '#111827' : '#ffffff', 
    };

    const contentBoxStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '3rem 1rem',
        backgroundColor: isDark ? '#1f2937' : '#e8f3ff', 
        borderRadius: '1rem',
        boxShadow: isDark 
            ? '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.2)' 
            : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    };

    const headerStyle = {
        marginBottom: '4rem',
    };

    const mainTitleStyle = {
        fontSize: '2.25rem', 
        fontWeight: '700',
        color: isDark ? '#e5e7eb' : '#1f2937', 
        margin: 0,
        marginBottom: '0.5rem',
    };

    const subTextStyle = {
        fontSize: '1rem',
        color: isDark ? '#9ca3af' : '#6b7280', 
        margin: 0,
    };

    const stepsContainerStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        gap: '2rem',
        flexWrap: 'wrap', 
    };

    const stepItemStyle = {
        flex: '0 0 30%', 
        minWidth: '250px',
        maxWidth: '300px',
        textAlign: 'center',
    };

    const numberCircleStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: primaryColor, 
        color: '#ffffff',
        fontSize: '1.5rem',
        fontWeight: '700',
        margin: '0 auto 1.5rem auto',
        boxShadow: isDark 
            ? `0 4px 10px ${primaryColor}66`
            : `0 4px 6px rgba(139, 92, 246, 0.4)`,
    };

    const stepTitleStyle = {
        fontSize: '1.25rem',
        fontWeight: '600',
        color: isDark ? '#e5e7eb' : '#1f2937', 
        marginBottom: '0.75rem',
        marginTop: 0,
    };

    const stepDescriptionStyle = {
        fontSize: '1rem',
        color: isDark ? '#9ca3af' : '#6b7280', 
        lineHeight: '1.6',
        margin: 0,
    };

    return (
        <section id="how-it-works" style={containerStyle}>
            <div style={contentBoxStyle}>
                
                {/* Header */}
                <div style={headerStyle}>
                    <h2 style={mainTitleStyle}>How It Works</h2>
                    <p style={subTextStyle}>Get started in three simple steps</p>
                </div>
                
                {/* Steps */}
                <div style={stepsContainerStyle}>
                    {stepsData.map((step, index) => (
                        <div key={index} style={stepItemStyle}>
                            
                            {/* Number Circle */}
                            <div style={numberCircleStyle}>
                                {step.number}
                            </div>
                            
                            {/* Title */}
                            <h3 style={stepTitleStyle}>{step.title}</h3>
                            
                            {/* Description */}
                            <p style={stepDescriptionStyle}>{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;