import React from 'react';

/**
 * ContactMap Component
 * Renders a full-width embedded Google Map.
 * Applies a grayscale filter to match the dark theme, which reveals color on hover.
 */
const ContactMap = () => {
  return (
    <section className="w-full h-[500px] md:h-[600px] relative z-10 bg-[#0A1A1E]">
      <iframe 
        title="CMAS Headquarters Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.789127814407!2d36.7729853!3d-1.2917757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f109e99a8b1dd%3A0xc3f98e6d2b591b6e!2sDiani%20Cl%2C%20Nairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
        width="100%" 
        height="100%" 
        style={{ border: 0 }} 
        allowFullScreen="" 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
        // Tailwind classes handling the grayscale hover effect
        className="grayscale opacity-70 contrast-125 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
      ></iframe>
    </section>
  );
};

export default ContactMap;