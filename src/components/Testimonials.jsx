// src/components/Testimonials.jsx

import React from 'react';
// Import a star icon for rating (assuming you have react-icons installed)
import { FaQuoteLeft, FaStar } from 'react-icons/fa'; 

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
    // Styling constants for consistency with your Footer's inline style approach
    const containerStyle = {
        paddingBottom: '6rem',
        backgroundColor: '#ffffff', // White background
    };

    const headerStyle = {
        textAlign: 'center',
        marginBottom: '3rem',
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
        backgroundColor: '#f9fafb', // gray-50
        padding: '2rem',
        borderRadius: '0.75rem', // rounded-xl
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
    };
    
    // Function to render star icons based on rating
    const renderStars = (rating) => {
        const stars = [];
        const activeStarColor = '#fcd34d'; // amber-400
        const inactiveStarColor = '#d1d5db'; // gray-300

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
                        <FaQuoteLeft style={{ color: '#8b5cf6', fontSize: '1.5rem', marginBottom: '1rem' }} />

                        {/* Quote Text */}
                        <p style={{ 
                            fontSize: '1rem', 
                            color: '#4b5563', 
                            flexGrow: 1, 
                            marginBottom: '1.5rem',
                            fontStyle: 'italic',
                        }}>
                            "{testimonial.quote}"
                        </p>
                        
                        {/* Divider */}
                        <div style={{ borderTop: '1px solid #e5eeeb', margin: '0.5rem 0 1rem 0' }}></div>
                        
                        {/* Footer: Rating and User Info */}
                        <div>
                            {renderStars(testimonial.rating)}
                            <p style={{ 
                                fontSize: '1rem', 
                                fontWeight: '600', 
                                color: '#1f2937', 
                                margin: '0.5rem 0 0 0' 
                            }}>
                                {testimonial.name}
                            </p>
                            <p style={{ 
                                fontSize: '0.875rem', 
                                color: '#6b7280', 
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