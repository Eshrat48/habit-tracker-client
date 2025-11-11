// src/App.jsx

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from 'react-hot-toast'; 
import AuthProvider from './providers/AuthProvider'; 
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ErrorPage from './pages/ErrorPage'; 
import AddHabit from './pages/AddHabit'; 
import MyHabits from './pages/MyHabits'; 
import BrowsePublicHabits from './pages/BrowsePublicHabits';

// 1. Define Routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
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
    ],
  },
]);

// 2. Define the App component and export it as default
export default function App() {
  return (
    // Only return the providers and the router itself
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
  );
}