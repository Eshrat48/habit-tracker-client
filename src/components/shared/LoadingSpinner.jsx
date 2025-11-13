// src/components/shared/LoadingSpinner.jsx

import React from 'react';

/**
 * Reusable Loading Spinner Component
 * Displays a centered spinner with optional custom message
 */
const LoadingSpinner = ({ message = 'Loading...', fullScreen = false }) => {
    const containerClasses = fullScreen 
        ? 'fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50' 
        : 'flex flex-col items-center justify-center py-20';

    return (
        <div className={containerClasses}>
            <div className="flex flex-col items-center gap-4">
                {/* Spinner Animation */}
                <div className="relative w-12 h-12">
                    <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
                
                {/* Message */}
                {message && (
                    <p className="text-gray-600 text-sm font-medium">{message}</p>
                )}
            </div>
        </div>
    );
};

export default LoadingSpinner;
