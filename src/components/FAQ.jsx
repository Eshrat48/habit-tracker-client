// src/components/FAQ.jsx
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import useTheme from '../hooks/useTheme';

const faqData = [
    {
        id: 1,
        question: "How does HabitTracker help me build better habits?",
        answer: "HabitTracker uses proven psychological principles like streak tracking, visual progress indicators, and daily reminders to help you build consistency. By making your progress visible and rewarding completion, you're more likely to stick with your habits long-term."
    },
    {
        id: 2,
        question: "Is HabitTracker free to use?",
        answer: "Yes! HabitTracker is completely free to use. You can create unlimited habits, track your progress, and access all features without any subscription or payment required."
    },
    {
        id: 3,
        question: "Can I share my habits with others?",
        answer: "Absolutely! When creating a habit, you can choose to make it public. Public habits appear in the 'Browse Public Habits' section where other users can discover and get inspired by your journey."
    },
    {
        id: 4,
        question: "What happens if I miss a day?",
        answer: "Missing a day will reset your current streak for that habit. However, your total completion history is preserved, and you can always start a new streak the next day. Don't let one missed day discourage you—consistency over time is what matters most."
    },
    {
        id: 5,
        question: "How are streaks calculated?",
        answer: "A streak counts consecutive days where you've marked the habit as complete. If you complete a habit today and yesterday, that's a 2-day streak. The streak continues as long as you don't miss a day."
    },
    {
        id: 6,
        question: "Can I edit or delete my habits?",
        answer: "Yes! You have full control over your habits. From your 'My Habits' page, you can update habit details, mark them as complete, or delete them entirely if they're no longer relevant."
    }
];

const FAQ = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [openId, setOpenId] = useState(null);

    const primaryColor = '#8b5cf6';
    const containerBg = isDark ? '#111827' : '#ffffff';
    const cardBg = isDark ? '#1f2937' : '#f9fafb';
    const cardBorder = isDark ? '#374151' : '#e5e7eb';
    const titleColor = isDark ? '#f9fafb' : '#111827';
    const questionColor = isDark ? '#e5e7eb' : '#1f2937';
    const answerColor = isDark ? '#d1d5db' : '#6b7280';

    const toggleFAQ = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section style={{
            padding: '6rem 1rem',
            backgroundColor: containerBg,
        }}>
            <div style={{
                maxWidth: '900px',
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
                        Frequently Asked Questions
                    </h2>
                    <p style={{
                        fontSize: '1rem',
                        color: answerColor,
                        maxWidth: '600px',
                        margin: '0 auto',
                    }}>
                        Got questions? We've got answers. Find everything you need to know about HabitTracker.
                    </p>
                </div>

                {/* FAQ Items */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                }}>
                    {faqData.map((faq) => (
                        <div
                            key={faq.id}
                            style={{
                                backgroundColor: cardBg,
                                border: `1px solid ${cardBorder}`,
                                borderRadius: '12px',
                                overflow: 'hidden',
                                transition: 'all 0.3s',
                                boxShadow: isDark 
                                    ? '0 2px 8px rgba(0, 0, 0, 0.2)' 
                                    : '0 2px 8px rgba(0, 0, 0, 0.05)',
                            }}
                        >
                            {/* Question */}
                            <button
                                onClick={() => toggleFAQ(faq.id)}
                                style={{
                                    width: '100%',
                                    padding: '1.5rem',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    transition: 'background-color 0.2s',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = isDark ? '#374151' : '#f3f4f6';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                }}
                            >
                                <span style={{
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    color: questionColor,
                                    flex: 1,
                                    paddingRight: '1rem',
                                }}>
                                    {faq.question}
                                </span>
                                {openId === faq.id ? (
                                    <FaChevronUp style={{ color: primaryColor, fontSize: '1.25rem', flexShrink: 0 }} />
                                ) : (
                                    <FaChevronDown style={{ color: primaryColor, fontSize: '1.25rem', flexShrink: 0 }} />
                                )}
                            </button>

                            {/* Answer */}
                            {openId === faq.id && (
                                <div style={{
                                    padding: '0 1.5rem 1.5rem 1.5rem',
                                    borderTop: `1px solid ${cardBorder}`,
                                    paddingTop: '1rem',
                                }}>
                                    <p style={{
                                        fontSize: '0.95rem',
                                        color: answerColor,
                                        lineHeight: '1.7',
                                        margin: 0,
                                    }}>
                                        {faq.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
