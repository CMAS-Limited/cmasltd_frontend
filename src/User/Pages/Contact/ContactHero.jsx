import React from 'react';

/**
 * ContactHero Component
 * Renders the introductory text and titles at the top of the Contact page.
 * Uses a clean, light theme to contrast with the dark form section below.
 */
const ContactHero = () => {
  return (
    <section className="container mx-auto px-6 pt-12 pb-20 text-center relative z-10">
      <div className="max-w-3xl mx-auto">
        
        {/* Decorative Brand Accent Line */}
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="w-8 h-px bg-teal-500"></div>
          <span className="text-teal-700 font-bold tracking-widest uppercase text-xs">
            Client Relations
          </span>
          <div className="w-8 h-px bg-teal-500"></div>
        </div>
        
        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 font-display leading-[1.05] mb-8 tracking-tight">
          Initiate your <span className="text-teal-600 italic font-normal">next milestone.</span>
        </h1>
        
        {/* Subtitle / Value Proposition */}
        <p className="text-gray-500 text-lg leading-relaxed max-w-2xl mx-auto">
          Engage CMAS for rigorous cost management, dispute resolution, and expert project administration. Our leadership is ready to deploy.
        </p>
        
      </div>
    </section>
  );
};

export default ContactHero;