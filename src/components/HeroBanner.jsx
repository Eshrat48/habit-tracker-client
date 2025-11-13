// src/components/HeroBanner.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 Imported
import banner01 from '../assets/banner/banner01.jpg';
import banner02 from '../assets/banner/banner02.jpg';
import banner03 from '../assets/banner/banner03.jpg';

const slidesData = [
  {
    id: 1,
    title: 'Build Lasting Habits',
    subtitle: 'Transform your life one day at a time',
    buttonText: 'Get Started',
    route: '/add-habit', 
    image: banner01,
  },
  {
    id: 2,
    title: 'Track Your Progress',
    subtitle: 'Visualize streaks, milestones and improvements',
    buttonText: 'View Dashboard',
    route: '/my-habits',
    image: banner02,
  },
  {
    id: 3,
    title: 'Join The Community',
    subtitle: 'Share your habits and learn from others',
    buttonText: 'Browse Public Habits',
    route: '/browse',
    image: banner03,
  },
];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate(); // 👈 INITIALIZED useNavigate

  // NEW: Handle button click using navigate
  const handleButtonClick = (route) => {
      navigate(route);
  };

  // autoplay every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slidesData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goPrev = () => {
    setCurrent((prev) => (prev - 1 + slidesData.length) % slidesData.length);
  };

  const goNext = () => {
    setCurrent((prev) => (prev + 1) % slidesData.length);
  };

  return (
    <section className="w-full" style={{ height: '720px', position: 'relative' }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
        {/* Slide Container */}
        {slidesData.map((slide, idx) => (
          <div
            key={slide.id}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: current === idx ? 1 : 0,
              transition: 'opacity 0.7s ease-in-out',
              zIndex: current === idx ? 10 : 0,
            }}
          >
            {/* Gradient Overlay */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                // Adjusting gradient start position for better contrast
                background: 'linear-gradient(90deg, rgba(76,0,153,0.9) 0%, rgba(99,35,166,0.6) 45%, rgba(123,31,162,0.35) 100%)',
              }}
            />

            {/* Text Content (Centered on the screen) */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '50%', // Centering logic
                transform: 'translateX(-50%)', // Centering logic
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center', // Center content horizontally
                zIndex: 20,
              }}
            >
              <div style={{ color: 'white', padding: '0 2rem', maxWidth: '50%', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '1rem', lineHeight: '1.2' }}>
                  {slide.title}
                </h1>
                <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.95 }}>
                  {slide.subtitle}
                </p>
                <button
                   // 👈 FIX: Add the onClick handler here
                   onClick={() => handleButtonClick(slide.route)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: 'white',
                    color: '#6d28d9',
                    fontWeight: '600',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  }}
                  onMouseEnter={(e) => (e.target.style.opacity = '0.9')}
                  onMouseLeave={(e) => (e.target.style.opacity = '1')}
                >
                  {slide.buttonText}
                </button>
              </div>
            </div>

            {/* Arrow Buttons (Only show on the active slide) */}
            {current === idx && (
              <>
                <button
                  onClick={goPrev}
                  aria-label="Previous slide"
                  style={{
                    position: 'absolute',
                    left: '1.5rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 30,
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = 'rgba(255,255,255,0.2)')}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = 'rgba(255,255,255,0.1)')}
                >
                  ‹
                </button>

                <button
                  onClick={goNext}
                  aria-label="Next slide"
                  style={{
                    position: 'absolute',
                    right: '1.5rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 30,
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = 'rgba(255,255,255,0.2)')}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = 'rgba(255,255,255,0.1)')}
                >
                  ›
                </button>
              </>
            )}
          </div>
        ))}

        {/* Pagination Dots */}
        <div
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '0.75rem',
            zIndex: 30,
          }}
        >
          {slidesData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{
                width: '0.75rem',
                height: '0.75rem',
                borderRadius: '50%',
                backgroundColor: current === idx ? 'white' : 'rgba(255,255,255,0.4)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s',
                transform: current === idx ? 'scale(1.3)' : 'scale(1)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;