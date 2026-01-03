// src/pages/PrivacyTerms.jsx
import React, { useState } from 'react';
import { FaShieldAlt } from 'react-icons/fa';
import useTheme from '../hooks/useTheme';

const PrivacyTerms = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [activeTab, setActiveTab] = useState('privacy');

    const primaryColor = '#8b5cf6';
    const pageBg = isDark ? '#111827' : '#ffffff';
    const sectionBg = isDark ? '#1f2937' : '#f9fafb';
    const cardBg = isDark ? '#374151' : '#ffffff';
    const titleColor = isDark ? '#f9fafb' : '#111827';
    const textColor = isDark ? '#d1d5db' : '#6b7280';
    const borderColor = isDark ? '#374151' : '#e5e7eb';
    const tabActiveBg = primaryColor;
    const tabInactiveBg = isDark ? '#374151' : '#f3f4f6';

    const privacyContent = [
        {
            title: "1. Information We Collect",
            content: "We collect information you provide directly (name, email, profile information) and automatically (usage data, device information). This helps us improve your experience and provide personalized services."
        },
        {
            title: "2. How We Use Your Information",
            content: "Your information is used to provide, maintain, and improve our services. We use it to send you updates, respond to inquiries, and analyze how you use HabitTracker to enhance features."
        },
        {
            title: "3. Data Security",
            content: "We implement industry-standard security measures to protect your personal information. All data is encrypted in transit and at rest. However, no method of transmission over the internet is 100% secure."
        },
        {
            title: "4. Third-Party Services",
            content: "We use third-party services like Firebase for authentication and MongoDB for data storage. These services have their own privacy policies that you should review."
        },
        {
            title: "5. Your Privacy Rights",
            content: "You have the right to access, modify, or delete your personal information. You can manage your preferences through your account settings or contact us directly."
        },
        {
            title: "6. Cookies and Tracking",
            content: "We use cookies and similar tracking technologies to enhance your browsing experience. You can disable cookies in your browser settings, though this may limit functionality."
        },
        {
            title: "7. Policy Changes",
            content: "We may update this privacy policy periodically. We'll notify you of significant changes via email or through our platform."
        }
    ];

    const termsContent = [
        {
            title: "1. Acceptance of Terms",
            content: "By accessing and using HabitTracker, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
        },
        {
            title: "2. User Responsibilities",
            content: "You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. You must notify us immediately of any unauthorized use."
        },
        {
            title: "3. Intellectual Property Rights",
            content: "HabitTracker and all content, features, and functionality are owned by HabitTracker, its licensors, or other providers of such material. Unauthorized use is prohibited."
        },
        {
            title: "4. User-Generated Content",
            content: "By creating a habit and marking it as public, you grant HabitTracker a worldwide, non-exclusive license to display and use your content. You retain all rights to your original content."
        },
        {
            title: "5. Limitation of Liability",
            content: "To the fullest extent permitted by law, HabitTracker shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service."
        },
        {
            title: "6. Indemnification",
            content: "You agree to indemnify and hold harmless HabitTracker and its officers, directors, and employees from any claims, damages, or losses arising from your violation of these terms."
        },
        {
            title: "7. Termination",
            content: "We may terminate your account and access to HabitTracker at any time, with or without cause. Upon termination, your right to use the service immediately ceases."
        },
        {
            title: "8. Governing Law",
            content: "These terms are governed by and construed in accordance with the laws of the United States, and you irrevocably submit to the exclusive jurisdiction of the courts in that location."
        }
    ];

    return (
        <div style={{ backgroundColor: pageBg, minHeight: '100vh' }}>
            {/* Hero Section */}
            <section style={{
                padding: '4rem 1rem',
                backgroundColor: sectionBg,
                textAlign: 'center',
                borderBottom: `1px solid ${borderColor}`,
            }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        margin: '0 auto 1.5rem',
                        backgroundColor: isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <FaShieldAlt style={{ fontSize: '36px', color: primaryColor }} />
                    </div>
                    <h1 style={{
                        fontSize: '3rem',
                        fontWeight: '700',
                        color: titleColor,
                        marginBottom: '1rem',
                    }}>
                        Privacy & Terms
                    </h1>
                    <p style={{
                        fontSize: '1.25rem',
                        color: textColor,
                        maxWidth: '700px',
                        margin: '0 auto',
                        lineHeight: '1.6',
                    }}>
                        We're transparent about how we protect your data and how our service works.
                    </p>
                </div>
            </section>

            {/* Tabs */}
            <section style={{
                padding: '2rem 1rem',
                maxWidth: '1200px',
                margin: '0 auto',
            }}>
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    borderBottom: `2px solid ${borderColor}`,
                    marginBottom: '3rem',
                }}>
                    <button
                        onClick={() => setActiveTab('privacy')}
                        style={{
                            padding: '1rem 2rem',
                            backgroundColor: activeTab === 'privacy' ? tabActiveBg : 'transparent',
                            color: activeTab === 'privacy' ? '#ffffff' : textColor,
                            border: 'none',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            borderRadius: '8px 8px 0 0',
                            transition: 'all 0.3s',
                        }}
                    >
                        Privacy Policy
                    </button>
                    <button
                        onClick={() => setActiveTab('terms')}
                        style={{
                            padding: '1rem 2rem',
                            backgroundColor: activeTab === 'terms' ? tabActiveBg : 'transparent',
                            color: activeTab === 'terms' ? '#ffffff' : textColor,
                            border: 'none',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            borderRadius: '8px 8px 0 0',
                            transition: 'all 0.3s',
                        }}
                    >
                        Terms of Service
                    </button>
                </div>

                {/* Content */}
                <div style={{ maxWidth: '900px' }}>
                    {activeTab === 'privacy' && (
                        <div>
                            <h2 style={{
                                fontSize: '2rem',
                                fontWeight: '700',
                                color: titleColor,
                                marginBottom: '2rem',
                            }}>
                                Privacy Policy
                            </h2>
                            <p style={{
                                fontSize: '0.95rem',
                                color: textColor,
                                marginBottom: '2rem',
                                lineHeight: '1.6',
                            }}>
                                Last updated: January 2026. This Privacy Policy explains how HabitTracker collects, uses, and protects your personal information.
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                {privacyContent.map((section, idx) => (
                                    <div key={idx}>
                                        <h3 style={{
                                            fontSize: '1.25rem',
                                            fontWeight: '700',
                                            color: titleColor,
                                            marginBottom: '0.75rem',
                                        }}>
                                            {section.title}
                                        </h3>
                                        <p style={{
                                            fontSize: '0.95rem',
                                            color: textColor,
                                            lineHeight: '1.8',
                                            margin: 0,
                                        }}>
                                            {section.content}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'terms' && (
                        <div>
                            <h2 style={{
                                fontSize: '2rem',
                                fontWeight: '700',
                                color: titleColor,
                                marginBottom: '2rem',
                            }}>
                                Terms of Service
                            </h2>
                            <p style={{
                                fontSize: '0.95rem',
                                color: textColor,
                                marginBottom: '2rem',
                                lineHeight: '1.6',
                            }}>
                                Last updated: January 2026. These terms govern your use of HabitTracker and constitute a legal agreement between you and HabitTracker.
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                {termsContent.map((section, idx) => (
                                    <div key={idx}>
                                        <h3 style={{
                                            fontSize: '1.25rem',
                                            fontWeight: '700',
                                            color: titleColor,
                                            marginBottom: '0.75rem',
                                        }}>
                                            {section.title}
                                        </h3>
                                        <p style={{
                                            fontSize: '0.95rem',
                                            color: textColor,
                                            lineHeight: '1.8',
                                            margin: 0,
                                        }}>
                                            {section.content}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Contact Section */}
            <section style={{
                padding: '3rem 1rem',
                maxWidth: '1200px',
                margin: '3rem auto 0',
                borderTop: `1px solid ${borderColor}`,
            }}>
                <div style={{
                    backgroundColor: sectionBg,
                    padding: '2rem',
                    borderRadius: '1rem',
                    textAlign: 'center',
                }}>
                    <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        color: titleColor,
                        marginBottom: '0.75rem',
                    }}>
                        Questions About Our Policies?
                    </h3>
                    <p style={{
                        fontSize: '0.95rem',
                        color: textColor,
                        marginBottom: '1rem',
                    }}>
                        If you have any questions about this Privacy Policy or Terms of Service, please contact us at{' '}
                        <a href="mailto:privacy@habittracker.com" style={{
                            color: primaryColor,
                            textDecoration: 'none',
                            fontWeight: '600',
                        }}>
                            privacy@habittracker.com
                        </a>
                    </p>
                </div>
            </section>
        </div>
    );
};

export default PrivacyTerms;
