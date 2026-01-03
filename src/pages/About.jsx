// src/pages/About.jsx
import React from 'react';
import { FaBullseye, FaLightbulb, FaHeart, FaUsers } from 'react-icons/fa';
import useTheme from '../hooks/useTheme';

const About = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const primaryColor = '#8b5cf6';
    const pageBg = isDark ? '#111827' : '#ffffff';
    const sectionBg = isDark ? '#1f2937' : '#f9fafb';
    const cardBg = isDark ? '#374151' : '#ffffff';
    const titleColor = isDark ? '#f9fafb' : '#111827';
    const textColor = isDark ? '#d1d5db' : '#6b7280';
    const borderColor = isDark ? '#374151' : '#e5e7eb';

    const values = [
        {
            icon: FaBullseye,
            title: "Our Mission",
            description: "To empower individuals to build lasting habits that transform their lives through consistent daily actions and community support."
        },
        {
            icon: FaLightbulb,
            title: "Our Vision",
            description: "A world where everyone has the tools and motivation to achieve their personal goals through the power of habit formation."
        },
        {
            icon: FaHeart,
            title: "Our Values",
            description: "We believe in simplicity, consistency, and the power of small daily improvements. Every streak counts, and every user matters."
        },
        {
            icon: FaUsers,
            title: "Our Community",
            description: "We're building a supportive community where users can share habits, celebrate wins, and inspire each other to reach new heights."
        }
    ];

    const teamMembers = [
        {
            name: "Sarah Johnson",
            role: "Founder & Product Lead",
            bio: "Passionate about habit formation and personal development with 10+ years of experience.",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
        },
        {
            name: "Alex Morgan",
            role: "Lead Developer",
            bio: "Full-stack developer dedicated to creating intuitive and performant applications.",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
        },
        {
            name: "Emma Wilson",
            role: "UX/UI Designer",
            bio: "Focused on creating beautiful, accessible designs that users love.",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
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
                        About HabitTracker
                    </h1>
                    <p style={{
                        fontSize: '1.25rem',
                        color: textColor,
                        maxWidth: '700px',
                        margin: '0 auto',
                        lineHeight: '1.6',
                    }}>
                        We're on a mission to help millions of people build better habits, one day at a time.
                    </p>
                </div>
            </section>

            {/* Story Section */}
            <section style={{
                padding: '4rem 1rem',
                maxWidth: '1200px',
                margin: '0 auto',
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '3rem',
                    alignItems: 'center',
                }}>
                    <div>
                        <h2 style={{
                            fontSize: '2.25rem',
                            fontWeight: '700',
                            color: titleColor,
                            marginBottom: '1.5rem',
                        }}>
                            Our Story
                        </h2>
                        <p style={{
                            fontSize: '1rem',
                            color: textColor,
                            lineHeight: '1.8',
                            marginBottom: '1rem',
                        }}>
                            HabitTracker was born from a simple observation: most people struggle to build lasting habits because they lack visibility and motivation. Traditional habit-tracking apps were either too complex or didn't provide meaningful feedback.
                        </p>
                        <p style={{
                            fontSize: '1rem',
                            color: textColor,
                            lineHeight: '1.8',
                            marginBottom: '1rem',
                        }}>
                            In 2024, our founder Sarah decided to create something different. She wanted to build a platform that makes habit tracking simple, beautiful, and genuinely motivating. The result? HabitTracker—an app designed for anyone who wants to build better habits.
                        </p>
                        <p style={{
                            fontSize: '1rem',
                            color: textColor,
                            lineHeight: '1.8',
                        }}>
                            Today, thousands of users trust HabitTracker to help them build streaks, achieve goals, and transform their lives through consistent daily actions.
                        </p>
                    </div>
                    <div style={{
                        height: '400px',
                        backgroundColor: isDark ? '#374151' : '#f3f4f6',
                        borderRadius: '1rem',
                        backgroundImage: 'url(https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }} />
                </div>
            </section>

            {/* Values Section */}
            <section style={{
                padding: '4rem 1rem',
                backgroundColor: sectionBg,
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={{
                        fontSize: '2.25rem',
                        fontWeight: '700',
                        color: titleColor,
                        textAlign: 'center',
                        marginBottom: '3rem',
                    }}>
                        What We Believe In
                    </h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '2rem',
                    }}>
                        {values.map((value, idx) => {
                            const Icon = value.icon;
                            return (
                                <div
                                    key={idx}
                                    style={{
                                        backgroundColor: cardBg,
                                        padding: '2rem',
                                        borderRadius: '1rem',
                                        border: `1px solid ${borderColor}`,
                                        textAlign: 'center',
                                    }}
                                >
                                    <div style={{
                                        width: '60px',
                                        height: '60px',
                                        margin: '0 auto 1.5rem',
                                        backgroundColor: isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.1)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Icon style={{ fontSize: '24px', color: primaryColor }} />
                                    </div>
                                    <h3 style={{
                                        fontSize: '1.25rem',
                                        fontWeight: '700',
                                        color: titleColor,
                                        marginBottom: '0.75rem',
                                    }}>
                                        {value.title}
                                    </h3>
                                    <p style={{
                                        fontSize: '0.95rem',
                                        color: textColor,
                                        lineHeight: '1.6',
                                    }}>
                                        {value.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section style={{
                padding: '4rem 1rem',
                maxWidth: '1200px',
                margin: '0 auto',
            }}>
                <h2 style={{
                    fontSize: '2.25rem',
                    fontWeight: '700',
                    color: titleColor,
                    textAlign: 'center',
                    marginBottom: '3rem',
                }}>
                    Meet Our Team
                </h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                }}>
                    {teamMembers.map((member, idx) => (
                        <div
                            key={idx}
                            style={{
                                backgroundColor: cardBg,
                                borderRadius: '1rem',
                                overflow: 'hidden',
                                border: `1px solid ${borderColor}`,
                                textAlign: 'center',
                                padding: '2rem 1.5rem',
                            }}
                        >
                            <img
                                src={member.avatar}
                                alt={member.name}
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '50%',
                                    margin: '0 auto 1.5rem',
                                    objectFit: 'cover',
                                    border: `3px solid ${primaryColor}`,
                                }}
                            />
                            <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: '700',
                                color: titleColor,
                                marginBottom: '0.25rem',
                            }}>
                                {member.name}
                            </h3>
                            <p style={{
                                fontSize: '0.9rem',
                                color: primaryColor,
                                fontWeight: '600',
                                marginBottom: '1rem',
                            }}>
                                {member.role}
                            </p>
                            <p style={{
                                fontSize: '0.95rem',
                                color: textColor,
                                lineHeight: '1.6',
                            }}>
                                {member.bio}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Stats Section */}
            <section style={{
                padding: '4rem 1rem',
                backgroundColor: sectionBg,
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '2rem',
                        textAlign: 'center',
                    }}>
                        {[
                            { number: '10,000+', label: 'Active Users' },
                            { number: '50,000+', label: 'Habits Completed' },
                            { number: '5,000+', label: 'Active Streaks' },
                            { number: '4.8★', label: 'Average Rating' }
                        ].map((stat, idx) => (
                            <div key={idx}>
                                <p style={{
                                    fontSize: '2.5rem',
                                    fontWeight: '700',
                                    color: primaryColor,
                                    margin: '0 0 0.5rem 0',
                                }}>
                                    {stat.number}
                                </p>
                                <p style={{
                                    fontSize: '1rem',
                                    color: textColor,
                                    margin: 0,
                                }}>
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
