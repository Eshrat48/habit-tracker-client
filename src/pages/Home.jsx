// src/pages/Home.jsx

import React from 'react';
import HeroBanner from '../components/HeroBanner';
import FeaturedHabits from '../components/FeaturedHabits';
import Testimonials from '../components/Testimonials';
import WhyBuildHabits from '../components/WhyBuildHabits';
import HowItWorks from '../components/HowItWorks';
import StatsSection from '../components/StatsSection';

const Home = () => {
  return (
    <div className="home-page-container w-full">
      
      {/* 1. HERO BANNER / SLIDER */}
      <HeroBanner />

      {/* --- */}

      {/* 2. FEATURED HABITS SECTION (6 newest public habits) */}
      <FeaturedHabits />
      <WhyBuildHabits />
      <HowItWorks />
      <Testimonials />
      <StatsSection />
      
    </div>
  );
};

export default Home;