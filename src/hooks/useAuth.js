// src/hooks/useAuth.js

import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

/**
 * Custom hook to consume the AuthContext.
 * Provides easy access to the user, loading state, and all auth methods.
 */
const useAuth = () => {
    const auth = useContext(AuthContext);
    return auth;
};

export default useAuth;