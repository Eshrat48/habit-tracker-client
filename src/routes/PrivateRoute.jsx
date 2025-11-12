// src/routes/PrivateRoute.jsx

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth'; // Note the relative path: up one level (to src), then into hooks/

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        // Show a loading state while Firebase checks the user's status
        return <div className="text-center py-20 text-xl text-gray-600">Loading user authentication...</div>;
    }

    if (user) {
        // User is logged in, render the protected component (children)
        return children; 
    }

    // User is NOT logged in, redirect them to the login page.
    // We pass 'state: { from: location }' so they can be redirected back after successful login.
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;