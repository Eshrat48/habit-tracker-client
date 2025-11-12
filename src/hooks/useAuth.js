// src/hooks/useAuth.js

import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider'; // Adjust path as needed

/**
 * Custom hook to use the authentication context.
 * Provides access to user, loading state, and all auth methods (e.g., createUser, signIn).
 */
const useAuth = () => {
    const authContext = useContext(AuthContext);
    
    if (authContext === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    
    return authContext;
};

export default useAuth;