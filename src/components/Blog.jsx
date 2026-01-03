// src/components/Blog.jsx
import React from 'react';
import { FaArrowRight, FaClock, FaUser } from 'react-icons/fa';
import useTheme from '../hooks/useTheme';

const blogPosts = [
    {
        id: 1,
        title: "5 Science-Backed Strategies to Build Lasting Habits",
        excerpt: "Discover the research-proven methods that can help you stick to your habits and achieve long-term success.",
        author: "Dr. Sarah Johnson",
        date: "Dec 28, 2025",
        readTime: "5 min read",
        category: "Research",
        image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=250&fit=crop"
    },
    {
        id: 2,
        title: "The Power of Tiny Habits: Start Small, Win Big",
        excerpt: "Learn why starting with micro-habits can lead to massive transformations over time.",
        author: "James Clear",
        date: "Dec 25, 2025",
        readTime: "7 min read",
        category: "Tips",
        image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&h=250&fit=crop"
    },
    {
        id: 3,
        title: "How to Recover After Breaking Your Streak",
        excerpt: "Missing a day doesn't mean failure. Here's how to bounce back stronger and maintain momentum.",
        author: "Alex Morgan",
        date: "Dec 22, 2025",
        readTime: "4 min read",
        category: "Motivation",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=250&fit=crop"
    }
];

const Blog = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const primaryColor = '#8b5cf6';
    const containerBg = isDark ? '#1f2937' : '#ffffff';
    const cardBg = isDark ? '#374151' : '#f9fafb';
    const cardBorder = isDark ? '#4b5563' : '#e5e7eb';
    const titleColor = isDark ? '#f9fafb' : '#111827';
    const cardTitleColor = isDark ? '#e5e7eb' : '#1f2937';
    const textColor = isDark ? '#d1d5db' : '#6b7280';
    const metaColor = isDark ? '#9ca3af' : '#9ca3af';
    const categoryBg = isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.1)';

    return (
        <section style={{
            padding: '6rem 1rem',
            backgroundColor: containerBg,
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
            }}>
                {/* Header */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '3rem',
                }}>
                    <h2 style={{
                        fontSize: '2.25rem',
                        fontWeight: '700',
                        color: titleColor,
                        marginBottom: '1rem',
                    }}>
                        Latest from Our Blog
                    </h2>
                    <p style={{
                        fontSize: '1rem',
                        color: textColor,
                        maxWidth: '600px',
                        margin: '0 auto',
                    }}>
                        Expert insights, tips, and stories to help you build better habits and achieve your goals.
                    </p>
                </div>

                {/* Blog Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '2rem',
                    marginBottom: '3rem',
                }}>
                    {blogPosts.map((post) => (
                        <article
                            key={post.id}
                            style={{
                                backgroundColor: cardBg,
                                borderRadius: '12px',
                                overflow: 'hidden',
                                border: `1px solid ${cardBorder}`,
                                transition: 'all 0.3s',
                                boxShadow: isDark 
                                    ? '0 4px 12px rgba(0, 0, 0, 0.3)' 
                                    : '0 4px 12px rgba(0, 0, 0, 0.08)',
                                cursor: 'pointer',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = isDark 
                                    ? '0 8px 20px rgba(0, 0, 0, 0.4)' 
                                    : '0 8px 20px rgba(0, 0, 0, 0.12)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = isDark 
                                    ? '0 4px 12px rgba(0, 0, 0, 0.3)' 
                                    : '0 4px 12px rgba(0, 0, 0, 0.08)';
                            }}
                        >
                            {/* Image */}
                            <div style={{
                                height: '200px',
                                backgroundImage: `url(${post.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                position: 'relative',
                            }}>
                                {/* Category Badge */}
                                <span style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    left: '1rem',
                                    padding: '4px 12px',
                                    backgroundColor: categoryBg,
                                    color: primaryColor,
                                    fontSize: '0.75rem',
                                    fontWeight: '600',
                                    borderRadius: '4px',
                                    backdropFilter: 'blur(8px)',
                                }}>
                                    {post.category}
                                </span>
                            </div>

                            {/* Content */}
                            <div style={{ padding: '1.5rem' }}>
                                <h3 style={{
                                    fontSize: '1.25rem',
                                    fontWeight: '700',
                                    color: cardTitleColor,
                                    marginBottom: '0.75rem',
                                    lineHeight: '1.4',
                                }}>
                                    {post.title}
                                </h3>

                                <p style={{
                                    fontSize: '0.9rem',
                                    color: textColor,
                                    lineHeight: '1.6',
                                    marginBottom: '1rem',
                                }}>
                                    {post.excerpt}
                                </p>

                                {/* Meta Info */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    fontSize: '0.8rem',
                                    color: metaColor,
                                    marginBottom: '1rem',
                                    flexWrap: 'wrap',
                                }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                        <FaUser />
                                        {post.author}
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                        <FaClock />
                                        {post.readTime}
                                    </span>
                                    <span>{post.date}</span>
                                </div>

                                {/* Read More Link */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    color: primaryColor,
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    transition: 'gap 0.2s',
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.gap = '0.75rem'}
                                    onMouseLeave={(e) => e.currentTarget.style.gap = '0.5rem'}
                                >
                                    Read More <FaArrowRight />
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* View All Button */}
                <div style={{ textAlign: 'center' }}>
                    <button
                        style={{
                            padding: '12px 32px',
                            backgroundColor: 'transparent',
                            border: `2px solid ${primaryColor}`,
                            color: primaryColor,
                            borderRadius: '8px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = primaryColor;
                            e.target.style.color = '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                            e.target.style.color = primaryColor;
                        }}
                    >
                        View All Articles
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Blog;
