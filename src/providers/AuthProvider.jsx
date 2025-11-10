// src/providers/AuthProvider.jsx

import { createContext, useState, useEffect, useContext } from 'react';
import auth from '../firebase/firebase.config'; 
import { 
    onAuthStateChanged, 
    signOut, 
    GoogleAuthProvider, 
    signInWithPopup,
    createUserWithEmailAndPassword, // For registration
    signInWithEmailAndPassword,     // For login
    updateProfile                   // To add name/photoURL on registration
} from 'firebase/auth'; 

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // --- Authentication Methods ---
    
    // Email/Password Registration (for Register page)
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Update User Profile (for Register page)
    const updateUserProfile = (name, photoURL) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoURL
        });
    };

    // Email/Password Login (for Login page)
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Google Login (Required)
    const googleLogin = () => { 
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // Log Out
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    // --- User State Observer (Crucial for persistence) ---
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
            // This runs whenever the user logs in, logs out, or the page reloads.
        });
        return () => unsubscribe(); // Cleanup function
    }, []);

    const authInfo = { 
        user, 
        loading, 
        createUser,
        updateUserProfile,
        signIn, 
        logOut, 
        googleLogin 
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;