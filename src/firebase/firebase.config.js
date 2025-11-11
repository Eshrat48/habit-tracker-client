// src/firebase/firebase.config.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 

// 1. Get configuration variables from .env.local
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let app;
let auth;

// CRITICAL FIX: Only attempt to initialize Firebase if the API Key exists.
if (firebaseConfig.apiKey) {
    // 2. Initialize the app
    app = initializeApp(firebaseConfig);

    // 3. Initialize Auth
    auth = getAuth(app);
} else {
    // 4. Placeholder for development without keys (prevents crash)
    console.warn("Firebase API Key is missing. Auth functionality is disabled.");
    // Create a dummy object for 'auth' to prevent crashes in AuthProvider
    auth = {
        currentUser: null,
        onAuthStateChanged: (callback) => { 
            callback(null); 
            return () => {}; // Return an unsubscribe function
        },
        // Provide dummy functions that will be used in AuthProvider
        signInWithEmailAndPassword: () => Promise.reject(new Error("Firebase not initialized")),
        createUserWithEmailAndPassword: () => Promise.reject(new Error("Firebase not initialized")),
        signOut: () => Promise.resolve(),
        updateProfile: () => Promise.resolve(),
        signInWithPopup: () => Promise.reject(new Error("Firebase not initialized")),
    };
}

export default auth;