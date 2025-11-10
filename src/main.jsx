// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from 'react-hot-toast'; // Import Toaster
import AuthProvider from './providers/AuthProvider'; // Import AuthProvider
import './index.css'; // Your main CSS file

// 1. Import or create your main layout and page components
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ErrorPage from './pages/ErrorPage'; 
import AddHabit from './pages/AddHabit'; // Protected Route
import MyHabits from './pages/MyHabits'; // Protected Route
import BrowsePublicHabits from './pages/BrowsePublicHabits';

// 2. Define Routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // MainLayout includes Header and Footer
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/browse",
        element: <BrowsePublicHabits />,
      },
      // PRIVATE ROUTES (Will be protected later)
      {
        path: "/add-habit",
        element: <AddHabit />, 
      },
      {
        path: "/my-habits",
        element: <MyHabits />,
      },
      // ... other routes (Details page, Update page)
    ],
  },
  // The 404 page is handled as the errorElement above, but can also be a standalone route.
]);


// 3. Render the app with the necessary wrappers
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* Wrap the whole app with Auth context */}
      <RouterProvider router={router} />
      <Toaster /> {/* Place the Toaster component at the root */}
    </AuthProvider>
  </React.StrictMode>,
);