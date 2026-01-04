// src/providers/AuthProvider.jsx

import { createContext, useState, useEffect } from 'react';
import auth from '../firebase/firebase.config'; 
import { 
    onAuthStateChanged, 
    signOut, 
    GoogleAuthProvider, 
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from 'firebase/auth'; 

import { saveUserToDB } from '../api/userApi'; 

// 1. Create Context
export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    // 2. State
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // --- Authentication Methods ---
    
    // Email/Password Registration
    const createUser = async (email, password) => {
        if (!auth) {
            return Promise.reject(new Error('Firebase is not initialized. Please check your .env.local file has all Firebase credentials.'));
        }
        setLoading(true);
        try {
            return await createUserWithEmailAndPassword(auth, email, password);
        } finally {
            setLoading(false);
        }
    };

    // Update User Profile
    const updateUserProfile = (name, photoURL) => {
        if (!auth || !auth.currentUser) {
            return Promise.reject(new Error('No user is currently authenticated.'));
        }
        return updateProfile(auth.currentUser, {
            displayName: name, 
            photoURL: photoURL
        });
    };

    // Email/Password Login
    const signIn = async (email, password) => {
        if (!auth) {
            return Promise.reject(new Error('Firebase is not initialized. Please check your .env.local file has all Firebase credentials.'));
        }
        setLoading(true);
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        } finally {
            setLoading(false);
        }
    };

    // Google Login
    const googleLogin = async () => { 
        if (!auth) {
            setLoading(false);
            throw new Error('Firebase is not initialized. Please check your .env.local file has all Firebase credentials.');
        }
        
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            
            // Prepare user data for MongoDB
            const userData = {
                email: user.email,
                fullName: user.displayName || user.email.split('@')[0], 
                photoURL: user.photoURL,
                firebaseUID: user.uid,
            };

            // Save user to MongoDB
            try {
                await saveUserToDB(userData);
            } catch (dbError) {
                console.error('MongoDB save error (non-critical):', dbError);
            }
            
            return result;

        } catch (error) {
            let detailedError = error;
            
            if (error.code === 'auth/popup-blocked') {
                detailedError = new Error('Pop-up was blocked. Please allow pop-ups for this site and try again.');
            } else if (error.code === 'auth/popup-closed-by-user') {
                detailedError = new Error('Sign-in was cancelled.');
            } else if (error.code === 'auth/operation-not-allowed') {
                detailedError = new Error('Google sign-in is not enabled. Please contact support.');
            } else if (error.code === 'auth/network-request-failed') {
                detailedError = new Error('Network error. Please check your internet connection and try again.');
            } else if (!error.message) {
                detailedError = new Error('Google sign-in failed. Please try again.');
            }
            
            console.error('Google login error:', error);
            throw detailedError;
        } finally {
            setLoading(false);
        }
    };

    // Log Out
    const logOut = async () => {
        if (!auth) {
            return Promise.reject(new Error('Firebase is not initialized.'));
        }
        setLoading(true);
        try {
            return await signOut(auth);
        } finally {
            setLoading(false);
        }
    };

    // --- User State Observer ---
    useEffect(() => {
        if (!auth) {
            console.warn('Firebase not initialized - skipping auth state observer.');
            setLoading(false);
            return;
        }
        
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // 3. Auth Info Object
    const authInfo = { 
        user, 
        loading, 
        createUser,
        updateUserProfile,
        signIn, 
        logOut, 
        googleLogin,
        saveUserToDB
    };

    // 4. Provide Context
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;