import React from 'react';
import { Linkedin, Mail, Award, CheckCircle2 } from 'lucide-react';

/**
 * MemberSpotlight Component
 * Renders the large, detailed right-hand panel for the selected team member.
 * This component acts as a "dumb" component—it simply displays whatever data 
 * is passed into it via the 'activeMember' prop.
 * * @param {Object} activeMember - The data object for the currently selected team member.
 */
const MemberSpotlight = ({ activeMember }) => {
  return (
    // THE 'key' TRICK: 
    // By setting the key to activeMember.id, we force React to completely unmount 
    // and remount this div whenever the user clicks a new name. This causes the 
    // 'animate-in fade-in' Tailwind classes to re-trigger, creating a smooth transition!
    <div 
      key={activeMember.id} 
      className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-gray-100 animate-in fade-in duration-700"
    >
      
      {/* Container: Splits into two columns (Image | Data) on extra-large (xl) screens */}
      <div className="flex flex-col xl:flex-row gap-10 xl:gap-12">
        
        {/* === LEFT COLUMN: Image & Contact Actions === */}
        <div className="w-full xl:w-2/5 shrink-0">
          
          {/* Portrait Container */}
          <div className="w-full aspect-square xl:aspect-[4/5] rounded-[2rem] overflow-hidden bg-gray-100 shadow-lg border border-gray-100">
            <img 
              src={activeMember.image} 
              alt={activeMember.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Desktop Contact Buttons 
              Hidden on mobile, visible only on 'xl' screens to sit neatly below the portrait.
          */}
          <div className="hidden xl:flex flex-col gap-3 mt-8">
            <a 
              href={`mailto:${activeMember.email}`} 
              className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-gray-900 text-white font-bold text-[10px] uppercase tracking-widest hover:bg-teal-600 transition-colors shadow-sm"
            >
              {/* split(' ')[0] extracts just the first name for a friendlier CTA (e.g., "Email David") */}
              <Mail className="w-4 h-4" /> Email {activeMember.name.split(' ')[0]}
            </a>
            
            <a 
              href="#" // Replace with activeMember.linkedin in production
              className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-white text-gray-500 font-bold text-[10px] uppercase tracking-widest hover:bg-gray-50 hover:text-teal-600 transition-colors border border-gray-200 shadow-sm"
            >
              <Linkedin className="w-4 h-4" /> View LinkedIn
            </a>
          </div>
        </div>

        {/* === RIGHT COLUMN: Detailed Data & Biography === */}
        <div className="w-full xl:w-3/5 flex flex-col justify-center">
          
          {/* Header Block: Name and Role */}
          <div className="mb-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-display mb-2">
              {activeMember.name}
            </h2>
            <p className="text-teal-600 font-bold uppercase tracking-widest text-sm">
              {activeMember.role}
            </p>
          </div>

          {/* Accreditations Badge 
              Uses inline-flex to shrink-wrap the container tightly around the text.
          */}
          <div className="inline-flex items-center gap-2 bg-[#F0F5F4] px-4 py-2 rounded-lg border border-teal-100 w-fit mb-8 shadow-sm">
            <Award className="w-4 h-4 text-teal-600" />
            <span className="text-teal-900 font-bold text-[10px] uppercase tracking-widest">
              {activeMember.accreditation}
            </span>
          </div>

          {/* Visual Divider */}
          <div className="w-12 h-1 bg-gray-200 mb-8"></div>

          {/* Core Biography */}
          <p className="text-gray-600 text-lg leading-relaxed mb-10">
            {activeMember.bio}
          </p>

          {/* Areas of Focus: Dynamic Skill Pills */}
          <div className="mb-10 xl:mb-0">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
              Areas of Expertise
            </p>
            
            <div className="flex flex-wrap gap-2">
              {/* Loops through the 'focus' array to generate individual tags */}
              {activeMember.focus.map((skill, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 text-gray-700 text-sm font-medium shadow-sm hover:border-teal-300 transition-colors cursor-default"
                >
                  <CheckCircle2 className="w-4 h-4 text-teal-500" />
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Contact Buttons 
              These sit at the very bottom of the text column on smaller screens, 
              but are hidden on 'xl' screens where the left-column buttons take over.
          */}
          <div className="flex xl:hidden flex-col sm:flex-row gap-3 mt-10 border-t border-gray-100 pt-8">
            <a 
              href={`mailto:${activeMember.email}`} 
              className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-gray-900 text-white font-bold text-[10px] uppercase tracking-widest hover:bg-teal-600 transition-colors shadow-sm"
            >
              <Mail className="w-4 h-4" /> Email
            </a>
            
            <a 
              href="#" 
              className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-white text-gray-600 font-bold text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MemberSpotlight;