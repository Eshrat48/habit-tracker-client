// src/App.jsx

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from 'react-hot-toast'; 
import AuthProvider from './providers/AuthProvider'; 
import { ThemeProvider } from './providers/ThemeProvider';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import PrivateRoute from './routes/PrivateRoute';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ErrorPage from './pages/ErrorPage'; 
import AddHabit from './pages/AddHabit'; 
import MyHabits from './pages/MyHabits'; 
import BrowsePublicHabits from './pages/BrowsePublicHabits';
import HabitDetail from './pages/HabitDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyTerms from './pages/PrivacyTerms';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

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
      {
        path: "/habit-detail/:id",
        element: (
            <PrivateRoute>
                <HabitDetail />
            </PrivateRoute>
        ), 
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/privacy-terms",
        element: <PrivacyTerms />,
      },
      {
        path: "*", 
        element: <ErrorPage />, 
      },
    ],
  },
  // DASHBOARD ROUTES (SEPARATE LAYOUT)
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "my-habits",
        element: <MyHabits />,
      },
      {
        path: "add-habit",
        element: <AddHabit />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

// 2. Define the App component and export it as default
export default function App() {
  return (
    // ThemeProvider must be outside to wrap everything
    <ThemeProvider> 
        <AuthProvider>
            <RouterProvider router={router} />
            {/* Toaster can be outside the router */}
            <Toaster position="top-right" /> 
        </AuthProvider>
    </ThemeProvider>
  );
}
