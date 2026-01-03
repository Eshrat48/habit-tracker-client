// src/pages/Home.jsx

import React from 'react';
import HeroBanner from '../components/HeroBanner';
import FeaturedHabits from '../components/FeaturedHabits';
import Testimonials from '../components/Testimonials';
import WhyBuildHabits from '../components/WhyBuildHabits';
import HowItWorks from '../components/HowItWorks';
import StatsSection from '../components/StatsSection';
import Blog from '../components/Blog';
import FAQ from '../components/FAQ';
import Newsletter from '../components/Newsletter';
import CTA from '../components/CTA';

const Home = () => {
  return (
    <div className="home-page-container w-full">
      <HeroBanner />
      <FeaturedHabits />
      <WhyBuildHabits />
      <HowItWorks />
      <Testimonials />
      <StatsSection />
      <Blog />
      <FAQ />
      <Newsletter />
      <CTA />
    </div>
  );
};

export default Home;