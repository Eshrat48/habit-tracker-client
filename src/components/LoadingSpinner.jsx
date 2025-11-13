// src/components/LoadingSpinner.jsx
import React from 'react';
import useTheme from '../hooks/useTheme.js'; 

const LoadingSpinner = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    // Dynamic Colors
    const primaryColor = '#6366f1'; 
    const textColor = primaryColor; 
    const containerBg = isDark ? '#1f2937' : '#ffffff'; 
    const spinnerRingColor = isDark ? '#374151' : '#e5e7eb'; 

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column', 
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh', 
            width: '100%',
            backgroundColor: containerBg, 
            color: textColor, 
        }}>
            <div 
                style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    border: `5px solid ${spinnerRingColor}`, 
                    borderTop: `5px solid ${primaryColor}`,
                    animation: 'spin 1s linear infinite',
                    marginBottom: '15px'
                }}
            />
            <p style={{ fontSize: '18px', fontWeight: '600' }}>Loading Data...</p>
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