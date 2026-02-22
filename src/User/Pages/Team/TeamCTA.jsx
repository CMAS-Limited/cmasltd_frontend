import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';

/**
 * TeamCTA Component
 * A reusable Call-To-Action banner designed to sit at the bottom of the Team page.
 * It provides a strong visual "floor" to the page and directs users to the contact section.
 */
const TeamCTA = () => {
  return (
    // Outer section: Provides a top border to separate from the content above
    // and standard container constraints for alignment.
    <section className="container mx-auto px-6 py-20 relative z-10 border-t border-teal-100/50">
      
      {/* Main Card Container:
        - Uses a deep dark teal background (#0A1A1E) for high contrast.
        - Flex layout stacks elements vertically on mobile, horizontally on medium (md) screens.
        - 'overflow-hidden' ensures the blurred background glow doesn't spill out of the rounded corners.
      */}
      <div className="bg-[#0A1A1E] rounded-[3rem] p-10 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl">
        
        {/* Decorative Abstract Glow:
            A massive blurred circle positioned off-center to create a premium, ambient lighting effect.
            'pointer-events-none' ensures it doesn't accidentally block any clicks.
        */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

        {/* Text & Icon Content (Takes up 2/3 of the width on desktop) */}
        <div className="md:w-2/3 relative z-10">
          
          {/* Shield Icon Box */}
          <div className="w-16 h-16 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center mb-6 border border-teal-500/30">
            <ShieldCheck className="w-8 h-8" />
          </div>
          
          {/* Main Headline */}
          <h2 className="text-3xl md:text-5xl font-bold text-white font-display mb-4">
            Uncompromising standards. <br/>
            <span className="text-teal-400 italic font-normal">Unmatched execution.</span>
          </h2>
          
          {/* Subtext/Value Proposition */}
          <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
            Whether you require rigorous cost management, complex dispute resolution, or end-to-end project administration, our leadership is ready to deploy.
          </p>
        </div>

        {/* CTA Button Container (Takes up 1/3 of the width on desktop and aligns right) */}
        <div className="md:w-1/3 shrink-0 relative z-10 flex justify-center md:justify-end">
          
          {/* Action Button:
            - Links to the contact section ('/#contact').
            - Includes a 'group' class so the inner ArrowRight icon can animate 
              (translate-x-1) when the whole button is hovered.
          */}
          <a href="/#contact" className="inline-flex items-center gap-3 bg-teal-600 text-white px-8 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-teal-950 transition-all duration-300 shadow-xl shadow-teal-900/50 group">
            Reach Our Team 
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default TeamCTA;