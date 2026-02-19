// src/User/Pages/Home/Home.jsx
import React from 'react';
import Hero from './HeroSection'; 
import Stats from './StatsBar';
import Services from './ServicesSection';
import FeaturedProjects from './FeautredProjects';
import Team from './TeamMembers';
import Contact from './ContactsUs';

const Home = () => {
  return (
    <main className="flex-grow">
      <Hero />
      <Stats />
      <Services />
      <FeaturedProjects />
      <Team />
      <Contact />
    </main>
  );
};

export default Home;