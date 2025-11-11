// src/main.jsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx' // Now correctly imports the default export from App.jsx

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Renders the App component which contains the Router, AuthProvider, and Toaster */}
    <App /> 
  </StrictMode>,
)