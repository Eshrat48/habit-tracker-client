// src/pages/Contact.jsx
import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import toast from 'react-hot-toast';
import useTheme from '../hooks/useTheme';

const Contact = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const primaryColor = '#8b5cf6';
    const pageBg = isDark ? '#111827' : '#ffffff';
    const sectionBg = isDark ? '#1f2937' : '#f9fafb';
    const cardBg = isDark ? '#374151' : '#ffffff';
    const titleColor = isDark ? '#f9fafb' : '#111827';
    const textColor = isDark ? '#d1d5db' : '#6b7280';
    const inputBg = isDark ? '#1f2937' : '#f3f4f6';
    const inputBorder = isDark ? '#4b5563' : '#d1d5db';
    const inputTextColor = isDark ? '#e5e7eb' : '#111827';
    const borderColor = isDark ? '#374151' : '#e5e7eb';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            toast.error('Please fill in all fields');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        setIsSubmitting(true);
        const submitToastId = toast.loading('Sending your message...');

        // Simulate form submission
        setTimeout(() => {
            toast.success('Message sent successfully! We\'ll get back to you soon.', { id: submitToastId });
            setFormData({ name: '', email: '', subject: '', message: '' });
            setIsSubmitting(false);
        }, 1500);
    };

    const contactInfo = [
        {
            icon: FaEnvelope,
            title: 'Email',
            value: 'support@habittracker.com',
            link: 'mailto:support@habittracker.com'
        },
        {
            icon: FaPhone,
            title: 'Phone',
            value: '+1 (555) 123-4567',
            link: 'tel:+15551234567'
        },
        {
            icon: FaMapMarkerAlt,
            title: 'Address',
            value: 'San Francisco, CA, USA',
            link: null
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
                    <h1 style={{
                        fontSize: '3rem',
                        fontWeight: '700',
                        color: titleColor,
                        marginBottom: '1rem',
                    }}>
                        Get in Touch
                    </h1>
                    <p style={{
                        fontSize: '1.25rem',
                        color: textColor,
                        maxWidth: '700px',
                        margin: '0 auto',
                        lineHeight: '1.6',
                    }}>
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section style={{
                padding: '4rem 1rem',
                maxWidth: '1200px',
                margin: '0 auto',
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '3rem',
                }}>
                    {/* Contact Form */}
                    <div>
                        <h2 style={{
                            fontSize: '1.75rem',
                            fontWeight: '700',
                            color: titleColor,
                            marginBottom: '2rem',
                        }}>
                            Send us a Message
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.95rem',
                                    fontWeight: '600',
                                    color: titleColor,
                                    marginBottom: '0.5rem',
                                }}>
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        fontSize: '0.95rem',
                                        backgroundColor: inputBg,
                                        border: `1px solid ${inputBorder}`,
                                        borderRadius: '8px',
                                        color: inputTextColor,
                                        outline: 'none',
                                        transition: 'border-color 0.2s',
                                        boxSizing: 'border-box',
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = primaryColor}
                                    onBlur={(e) => e.target.style.borderColor = inputBorder}
                                />
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.95rem',
                                    fontWeight: '600',
                                    color: titleColor,
                                    marginBottom: '0.5rem',
                                }}>
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        fontSize: '0.95rem',
                                        backgroundColor: inputBg,
                                        border: `1px solid ${inputBorder}`,
                                        borderRadius: '8px',
                                        color: inputTextColor,
                                        outline: 'none',
                                        transition: 'border-color 0.2s',
                                        boxSizing: 'border-box',
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = primaryColor}
                                    onBlur={(e) => e.target.style.borderColor = inputBorder}
                                />
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.95rem',
                                    fontWeight: '600',
                                    color: titleColor,
                                    marginBottom: '0.5rem',
                                }}>
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        fontSize: '0.95rem',
                                        backgroundColor: inputBg,
                                        border: `1px solid ${inputBorder}`,
                                        borderRadius: '8px',
                                        color: inputTextColor,
                                        outline: 'none',
                                        transition: 'border-color 0.2s',
                                        boxSizing: 'border-box',
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = primaryColor}
                                    onBlur={(e) => e.target.style.borderColor = inputBorder}
                                />
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.95rem',
                                    fontWeight: '600',
                                    color: titleColor,
                                    marginBottom: '0.5rem',
                                }}>
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                    rows="5"
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        fontSize: '0.95rem',
                                        backgroundColor: inputBg,
                                        border: `1px solid ${inputBorder}`,
                                        borderRadius: '8px',
                                        color: inputTextColor,
                                        outline: 'none',
                                        transition: 'border-color 0.2s',
                                        boxSizing: 'border-box',
                                        fontFamily: 'inherit',
                                        resize: 'vertical',
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = primaryColor}
                                    onBlur={(e) => e.target.style.borderColor = inputBorder}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                style={{
                                    width: '100%',
                                    padding: '12px 24px',
                                    backgroundColor: primaryColor,
                                    color: '#ffffff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.2s',
                                    opacity: isSubmitting ? 0.6 : 1,
                                }}
                                onMouseEnter={(e) => !isSubmitting && (e.target.style.backgroundColor = '#7c3aed')}
                                onMouseLeave={(e) => !isSubmitting && (e.target.style.backgroundColor = primaryColor)}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h2 style={{
                            fontSize: '1.75rem',
                            fontWeight: '700',
                            color: titleColor,
                            marginBottom: '2rem',
                        }}>
                            Contact Information
                        </h2>

                        {/* Contact Cards */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
                            {contactInfo.map((info, idx) => {
                                const Icon = info.icon;
                                const content = (
                                    <div
                                        key={idx}
                                        style={{
                                            backgroundColor: cardBg,
                                            padding: '1.5rem',
                                            borderRadius: '1rem',
                                            border: `1px solid ${borderColor}`,
                                            display: 'flex',
                                            gap: '1rem',
                                            alignItems: 'flex-start',
                                        }}
                                    >
                                        <div style={{
                                            width: '50px',
                                            height: '50px',
                                            backgroundColor: isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.1)',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                        }}>
                                            <Icon style={{ fontSize: '20px', color: primaryColor }} />
                                        </div>
                                        <div>
                                            <h3 style={{
                                                fontSize: '1rem',
                                                fontWeight: '700',
                                                color: titleColor,
                                                marginBottom: '0.25rem',
                                            }}>
                                                {info.title}
                                            </h3>
                                            <p style={{
                                                fontSize: '0.95rem',
                                                color: textColor,
                                                margin: 0,
                                            }}>
                                                {info.value}
                                            </p>
                                        </div>
                                    </div>
                                );

                                return info.link ? (
                                    <a key={idx} href={info.link} style={{ textDecoration: 'none' }}>
                                        {content}
                                    </a>
                                ) : (
                                    content
                                );
                            })}
                        </div>

                        {/* Response Time Info */}
                        <div style={{
                            backgroundColor: isDark ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.05)',
                            padding: '1.5rem',
                            borderRadius: '1rem',
                            border: `1px solid ${isDark ? 'rgba(139, 92, 246, 0.3)' : 'rgba(139, 92, 246, 0.2)'}`,
                        }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <FaStar style={{ color: primaryColor, fontSize: '20px', marginTop: '0.25rem' }} />
                                <div>
                                    <h3 style={{
                                        fontSize: '1rem',
                                        fontWeight: '700',
                                        color: titleColor,
                                        marginBottom: '0.25rem',
                                    }}>
                                        Quick Response Time
                                    </h3>
                                    <p style={{
                                        fontSize: '0.9rem',
                                        color: textColor,
                                        margin: 0,
                                        lineHeight: '1.5',
                                    }}>
                                        We typically respond to all inquiries within 24 hours. Thank you for your patience!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
