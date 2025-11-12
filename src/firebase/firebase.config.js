// src/firebase/firebase.config.js

import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth"; 

// 1. Get configuration variables from .env.local or environment
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Check if all required config values exist
const hasValidConfig = Object.values(firebaseConfig).every(val => val && val.trim && val.trim() !== '');

let app;
let auth;

if (hasValidConfig) {
    try {
        // 2. Initialize the app
        app = initializeApp(firebaseConfig);
        
        // 3. Initialize Auth
        auth = getAuth(app);
        
        // 4. Set persistence to LOCAL to keep user logged in
        setPersistence(auth, browserLocalPersistence).catch(error => {
            console.warn("Error setting persistence:", error);
        });
        
        console.log("✅ Firebase initialized successfully");
    } catch (error) {
        console.error("❌ Firebase initialization error:", error);
        auth = null;
    }
} else {
    console.warn("⚠️  Firebase configuration is incomplete. Missing or empty environment variables. Please create a .env.local file with your Firebase credentials.");
    auth = null;
}

export default auth;