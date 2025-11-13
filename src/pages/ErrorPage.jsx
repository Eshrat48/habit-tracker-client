// src/pages/ErrorPage.jsx (CSS combined in line)

import React from 'react';
// Assuming error404Img is correctly imported or you use a placeholder path
import error404Img from '../assets/error-404.png'; 

const ErrorPage = () => (
    <div 
        style={{ 
            width: '100%', 
            minHeight: '70vh', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center' 
        }}
    >
        <img 
            src={error404Img} 
            alt="404" 
            style={{ 
                width: '340px', 
                maxWidth: '80vw', 
                marginTop: '50px', 
                marginBottom: '30px' 
            }}
        />
        <h2 
            style={{ 
                fontSize: '48px', 
                fontWeight: 600, 
                color: '#001931', 
                marginBottom: '8px', 
                textAlign: 'center' 
            }}
        >
            Oops, page not found!
        </h2>
        <p 
            style={{ 
                color: '#627382', 
                fontSize: '20px', 
                fontWeight: 500, 
                marginBottom: '22px', 
                textAlign: 'center' 
            }}
        >
            The page you are looking for is not available.
        </p>
        <button 
            style={{ 
                backgroundImage: 'linear-gradient(to right, #632EE3, #9F62F2)', 
                color: '#ffffff', 
                fontSize: '16px', 
                fontWeight: 500, 
                border: 'none', 
                outline: 'none', 
                borderRadius: '8px', 
                padding: '10px 34px', 
                cursor: 'pointer', 
                marginBottom: '50px'
                // Hover and transition effects are lost with inline styles
            }} 
            onClick={() => window.location.href = '/'}
        >
            Go Back!
        </button>
    </div>
);

export default ErrorPage;