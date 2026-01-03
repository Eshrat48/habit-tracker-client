// src/components/Newsletter.jsx
import React, { useState } from 'react';
import { FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import toast from 'react-hot-toast';
import useTheme from '../hooks/useTheme';

const Newsletter = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const primaryColor = '#8b5cf6';
    const containerBg = isDark ? '#1f2937' : '#f9fafb';
    const boxBg = isDark ? '#374151' : '#ffffff';
    const titleColor = isDark ? '#f9fafb' : '#111827';
    const textColor = isDark ? '#d1d5db' : '#6b7280';
    const inputBg = isDark ? '#1f2937' : '#f3f4f6';
    const inputBorder = isDark ? '#4b5563' : '#d1d5db';
    const inputTextColor = isDark ? '#e5e7eb' : '#111827';

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        setIsSubmitting(true);
        
        // Simulate newsletter subscription
        setTimeout(() => {
            toast.success('Thank you for subscribing! 🎉');
            setEmail('');
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <section style={{
            padding: '6rem 1rem',
            backgroundColor: containerBg,
        }}>
            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                backgroundColor: boxBg,
                borderRadius: '1rem',
                padding: '3rem 2rem',
                textAlign: 'center',
                boxShadow: isDark 
                    ? '0 10px 25px -3px rgba(0, 0, 0, 0.4)' 
                    : '0 10px 25px -3px rgba(0, 0, 0, 0.1)',
            }}>
                {/* Icon */}
                <div style={{
                    width: '64px',
                    height: '64px',
                    margin: '0 auto 1.5rem',
                    backgroundColor: isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <FaEnvelope style={{ fontSize: '28px', color: primaryColor }} />
                </div>

                {/* Title */}
                <h2 style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: titleColor,
                    marginBottom: '1rem',
                }}>
                    Stay Updated with HabitTracker
                </h2>

                {/* Description */}
                <p style={{
                    fontSize: '1rem',
                    color: textColor,
                    marginBottom: '2rem',
                    lineHeight: '1.6',
                }}>
                    Subscribe to our newsletter for tips, tricks, and insights on building better habits.
                    Get weekly motivation and exclusive content delivered to your inbox.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} style={{
                    display: 'flex',
                    gap: '1rem',
                    maxWidth: '500px',
                    margin: '0 auto',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}>
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isSubmitting}
                        style={{
                            flex: '1',
                            minWidth: '250px',
                            padding: '12px 16px',
                            fontSize: '14px',
                            backgroundColor: inputBg,
                            border: `1px solid ${inputBorder}`,
                            borderRadius: '8px',
                            color: inputTextColor,
                            outline: 'none',
                            transition: 'border-color 0.2s',
                        }}
                        onFocus={(e) => e.target.style.borderColor = primaryColor}
                        onBlur={(e) => e.target.style.borderColor = inputBorder}
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                            padding: '12px 32px',
                            backgroundColor: primaryColor,
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 0.2s',
                            opacity: isSubmitting ? 0.6 : 1,
                        }}
                        onMouseEnter={(e) => !isSubmitting && (e.target.style.backgroundColor = '#7c3aed')}
                        onMouseLeave={(e) => !isSubmitting && (e.target.style.backgroundColor = primaryColor)}
                    >
                        <FaPaperPlane />
                        {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                    </button>
                </form>

                {/* Privacy Note */}
                <p style={{
                    fontSize: '0.75rem',
                    color: textColor,
                    marginTop: '1.5rem',
                    opacity: 0.8,
                }}>
                    We respect your privacy. Unsubscribe at any time.
                </p>
            </div>
        </section>
    );
};

export default Newsletter;
