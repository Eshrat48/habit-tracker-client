// src/components/Testimonials.jsx

import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa'; 
import useTheme from '../hooks/useTheme.js'; 

const testimonialsData = [
    {
        quote: "HabitTracker completely changed my approach to daily routines. The streak tracking is incredibly motivating, and I've finally stuck to my fitness goals for over 90 days straight!",
        name: "Jessica A.",
        title: "Productivity Enthusiast",
        rating: 5,
    },
    {
        quote: "The interface is simple and clean. Finding and adding new habits from the 'Browse Public Habits' section was a game-changer for starting my meditation practice.",
        name: "Mark T.",
        title: "Software Developer",
        rating: 5,
    },
    {
        quote: "As a student, balancing study and life was hard. HabitTracker provided the structure I needed. Seeing my progress visually makes consistency effortless.",
        name: "Sarah C.",
        title: "University Student",
        rating: 4,
    },
];

const Testimonials = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const primaryColor = '#8b5cf6'; 
    const activeStarColor = '#fcd34d'; 
    const inactiveStarColor = isDark ? '#4b5563' : '#d1d5db'; 

    const containerStyle = {
        paddingBottom: '6rem',
        backgroundColor: isDark ? '#111827' : '#ffffff', 
    };

    const headerStyle = {
        textAlign: 'center',
        marginBottom: '3rem',
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

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        paddingLeft: '1rem',
        paddingRight: '1rem',
    };

    const cardStyle = {
        backgroundColor: isDark ? '#1f2937' : '#f9fafb', 
        padding: '2rem',
        borderRadius: '0.75rem', 
        boxShadow: isDark 
            ? '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.2)'
            : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
    };
    
    const renderStars = (rating) => {
        const stars = [];

        for (let i = 1; i <= 5; i++) {
            stars.push(
                <FaStar 
                    key={i} 
                    style={{ color: i <= rating ? activeStarColor : inactiveStarColor, margin: '0 1px' }} 
                />
            );
        }
        return <div style={{ display: 'flex' }}>{stars}</div>;
    };

    return (
        <section id="testimonials" style={containerStyle}>
            <div style={headerStyle}>
                <h2 style={mainTitleStyle}>Hear From Our Successful Users</h2>
                <p style={subTextStyle}>Inspiring stories from people who built lasting habits with us.</p>
            </div>
            
            <div style={gridStyle}>
                {testimonialsData.map((testimonial, index) => (
                    <div key={index} style={cardStyle}>
                        
                        {/* Quote Icon */}
                        <FaQuoteLeft style={{ color: primaryColor, fontSize: '1.5rem', marginBottom: '1rem' }} />

                        {/* Quote Text */}
                        <p style={{ 
                            fontSize: '1rem', 
                            color: isDark ? '#d1d5db' : '#4b5563', 
                            flexGrow: 1, 
                            marginBottom: '1.5rem',
                            fontStyle: 'italic',
                        }}>
                            "{testimonial.quote}"
                        </p>
                        
                        {/* Divider */}
                        <div style={{ borderTop: `1px solid ${isDark ? '#374151' : '#e5eeeb'}`, margin: '0.5rem 0 1rem 0' }}></div> {/* Dynamic divider color */}
                        
                        {/* Footer: Rating and User Info */}
                        <div>
                            {renderStars(testimonial.rating)}
                            <p style={{ 
                                fontSize: '1rem', 
                                fontWeight: '600', 
                                color: isDark ? '#e5e7eb' : '#1f2937', 
                                margin: '0.5rem 0 0 0' 
                            }}>
                                {testimonial.name}
                            </p>
                            <p style={{ 
                                fontSize: '0.875rem', 
                                color: isDark ? '#9ca3af' : '#6b7280', 
                                margin: 0 
                            }}>
                                {testimonial.title}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;