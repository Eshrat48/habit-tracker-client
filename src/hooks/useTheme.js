// src/hooks/useTheme.js

import { useContext } from 'react';
import { ThemeContext } from '../providers/ThemeProvider';

/**
 * Custom hook to consume the ThemeContext.
 */
const useTheme = () => {
    const context = useContext(ThemeContext);

    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
};

export default useTheme;