import React from 'react';
import ContactHero from './ContactHero';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';
import ContactMap from './ContactMap';

/**
 * Contact Page Wrapper
 * Serves as the master layout for the Contact route, arranging the 
 * modular components into their respective grid sections.
 */
const Contact = () => {
  return (
    <div className="relative bg-white pt-24 min-h-screen overflow-hidden">
      
      {/* 1. Light Header Section */}
      <ContactHero />

      {/* 2. Dark Mode Contact Details & Form Section */}
      <section className="relative bg-[#0A1A1E] text-white py-24 lg:py-32 overflow-hidden border-t-4 border-teal-600">
        
        {/* Massive Brand Watermark positioned in the background */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 text-white/[0.03] text-[15rem] md:text-[25rem] lg:text-[32rem] font-display font-bold leading-none pointer-events-none select-none z-0">
          CMAS
        </div>

        {/* Content Container */}
        <div className="container mx-auto px-6 relative z-10">
          
          {/* Grid Layout: Splitting Info (left) and Form (right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Left Column: 5/12 width on large screens */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <ContactInfo />
            </div>

            {/* Right Column: 7/12 width on large screens */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

      {/* 3. Full-Width Embedded Map */}
      <ContactMap />

    </div>
  );
};

export default Contact;