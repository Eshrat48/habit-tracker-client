// src/pages/Home.jsx

import React from 'react';
import HeroBanner from '../components/HeroBanner'; 
// Placeholder for the next component you will build
// import FeaturedHabits from '../components/FeaturedHabits'; 
import Testimonials from '../components/Testimonials';
import WhyBuildHabits from '../components/WhyBuildHabits';
import HowItWorks from '../components/HowItWorks';

const Home = () => {
  return (
    <div className="home-page-container w-full">
      
      {/* 1. HERO BANNER / SLIDER */}
      <HeroBanner />

      {/* --- */}

      {/* 2. FEATURED HABITS SECTION (6 newest public habits) [cite: 39, 43] */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
            🔥 Featured Habits
          </h2>
          {/* This is where the FeaturedHabits component will go */}
          {/* <FeaturedHabits /> */}
        </div>
      </section>

      {/* --- */}
      
      {/* 3. WHY BUILD HABITS SECTION (Static content) [cite: 50] */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
            Why Build Habits?
          </h2>
          {/* Add 4 benefit cards with icons and short descriptions */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Example Card Structure: */}
            <div className="card shadow-xl bg-white p-6 text-center">
                <div className="text-indigo-600 text-5xl mb-4">⭐</div>
                <h3 className="text-xl font-bold mb-2">Better Focus</h3>
                <p className="text-gray-600">Reduce stress and concentrate on important tasks.</p>
            </div>
            <div className="card shadow-xl bg-white p-6 text-center">
                <div className="text-indigo-600 text-5xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-2">Boost Energy</h3>
                <p className="text-gray-600">Regular routines improve your overall vitality.</p>
            </div>
            <div className="card shadow-xl bg-white p-6 text-center">
                <div className="text-indigo-600 text-5xl mb-4">🧘</div>
                <h3 className="text-xl font-bold mb-2">Reduce Stress</h3>
                <p className="text-gray-600">Predictable days lead to a calmer mindset.</p>
            </div>
            <div className="card shadow-xl bg-white p-6 text-center">
                <div className="text-indigo-600 text-5xl mb-4">📈</div>
                <h3 className="text-xl font-bold mb-2">Achieve Goals</h3>
                <p className="text-gray-600">Small daily actions lead to big long-term wins.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* --- */}

      {/* 4. EXTRA RELEVANT SECTIONS (2 of your choice) [cite: 41, 52] */}
      {/* You can add your two custom sections here */}
      <WhyBuildHabits />
      <HowItWorks />
      <Testimonials />
      
    </div>
  );
};

export default Home;