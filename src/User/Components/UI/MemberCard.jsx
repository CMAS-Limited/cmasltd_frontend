// src/User/Components/TeamCard.jsx
import React, { useState } from 'react';
import { Linkedin, Mail, Award } from 'lucide-react';

const TeamCard = ({ member }) => {
  // State to handle "Tap" on mobile
  const [isTapped, setIsTapped] = useState(false);

  return (
    <div 
      // ON CLICK: Toggle the state (for mobile users)
      onClick={() => setIsTapped(!isTapped)}
      className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-teal-900/10 transition-all duration-500 border border-gray-100 cursor-pointer"
    >
      
      {/* IMAGE CONTAINER */}
      <div className="relative h-[280px] overflow-hidden bg-gray-200">
        <img 
          src={member.image} 
          alt={member.name} 
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 group-hover:filter group-hover:brightness-110" 
        />
        
        {/* Overlay Gradient: Visible on Hover OR Tap */}
        <div className={`absolute inset-0 bg-gradient-to-t from-teal-900/90 via-teal-900/40 to-transparent transition-opacity duration-500 ${isTapped ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>

        {/* Social Actions: Slide Up on Hover OR Tap */}
        <div className={`absolute bottom-0 inset-x-0 p-4 transition-transform duration-500 flex justify-center gap-3 z-20 ${isTapped ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0'}`}>
           <a href={member.linkedin} className="p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-teal-700 transition-colors">
             <Linkedin className="w-4 h-4" />
           </a>
           <a href={member.email} className="p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-teal-700 transition-colors">
             <Mail className="w-4 h-4" />
           </a>
        </div>
      </div>

      {/* TEXT CONTENT */}
      <div className="p-5 text-center relative bg-white">
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
           <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-[9px] font-bold uppercase tracking-wider shadow-sm">
             <Award className="w-3 h-3" />
             {member.qualifications}
           </span>
        </div>

        <div className="mt-3">
          <h3 className="text-lg font-bold text-gray-900 font-display mb-0.5 group-hover:text-teal-700 transition-colors">
            {member.name}
          </h3>
          <p className="text-teal-600 font-medium text-xs mb-3 uppercase tracking-wide">
            {member.role}
          </p>
          
          <div className="w-8 h-0.5 bg-gray-100 mx-auto mb-3 group-hover:w-full group-hover:bg-teal-50 transition-all duration-500"></div>

          <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
            {member.bio}
          </p>
        </div>
      </div>

    </div>
  );
};

export default TeamCard;