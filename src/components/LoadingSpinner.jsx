// src/components/LoadingSpinner.jsx

import React from 'react';

const LoadingSpinner = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column', // Stack items vertically
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh', // Ensure it covers most of the screen vertically
            width: '100%',
            color: '#6366f1', // Primary color for text
        }}>
            <div 
                style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    border: '5px solid #e5e7eb', // Light grey ring
                    borderTop: '5px solid #6366f1', // Blue spinner color
                    animation: 'spin 1s linear infinite',
                    marginBottom: '15px'
                }}
            />
            <p style={{ fontSize: '18px', fontWeight: '600' }}>Loading Data...</p>
            {/* Inject the spin keyframes into the style tag */}
            <style>
                {`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                `}
            </style>
        </div>
    );
};

export default LoadingSpinner;