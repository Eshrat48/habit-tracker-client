// src/pages/ErrorPage.jsx

import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError(); // Get error details from React Router

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-8">
      <h1 className="text-7xl font-extrabold text-red-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Oops! Page Not Found</h2>
      <p className="text-lg text-gray-600 mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <p className="text-sm text-gray-500 italic">
        {error.statusText || error.message}
      </p>
    </div>
  );
};

// CRITICAL FIX: The component must be exported as default
export default ErrorPage;