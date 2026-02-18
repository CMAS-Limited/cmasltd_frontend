import React, { useState } from 'react';
import { ArrowUpRight, MapPin, Calendar } from 'lucide-react';

const ProjectCard = ({ title, location, category, year, image, description, stats }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      onClick={() => setIsExpanded(!isExpanded)}
      className={`group relative flex-shrink-0 w-[300px] md:w-[400px] h-[420px] md:h-[500px] bg-gray-900 rounded-2xl overflow-hidden cursor-pointer border border-white/10 transition-all duration-500 mx-4 ${isExpanded ? 'ring-2 ring-teal-500' : ''}`}
    >
      
      {/* Background Image */}
      <img 
        src={image} 
        alt={title} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Gradient Overlay - Made stronger at bottom for text readability */}
      <div className={`absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/80 to-transparent transition-opacity duration-500 ${isExpanded ? 'opacity-95' : 'opacity-80 group-hover:opacity-95'}`}></div>

      {/* Category Badge - Adjusted position for mobile */}
      <div className="absolute top-5 left-5 md:top-6 md:left-6 z-20">
        <span className="px-3 py-1 rounded-full bg-teal-900/60 backdrop-blur-md border border-teal-500/30 text-teal-100 text-[10px] font-bold uppercase tracking-wider">
          {category}
        </span>
      </div>

      {/* Content Container - Pinned to bottom, NO Translation */}
      <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 z-20 flex flex-col justify-end">
        
        {/* Meta Info (Location/Year) - Slides in or fades in */}
        <div className={`flex items-center gap-4 text-teal-400 text-xs font-bold uppercase tracking-widest mb-3 transition-all duration-500 ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}`}>
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate max-w-[120px]">{location}</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-teal-500 shrink-0"></div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {year}
          </div>
        </div>

        {/* Title - Always Visible */}
        <h3 className="text-2xl md:text-3xl font-bold text-white font-display mb-3 leading-tight drop-shadow-lg">
          {title}
        </h3>

        {/* Description - The "Accordion" Effect */}
        {/* We animate max-height to slide it open/closed */}
        <div 
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isExpanded ? 'max-h-[200px] opacity-100 mb-6' : 'max-h-0 opacity-0 group-hover:max-h-[200px] group-hover:opacity-100 group-hover:mb-6'
          }`}
        >
             <p className="text-gray-300 text-sm leading-relaxed border-l-2 border-teal-500 pl-4">
               {description}
             </p>
        </div>

        {/* Footer Stats & Arrow - Always Visible */}
        {/* Added border-t to separate it visually */}
        <div className={`flex items-center justify-between pt-4 border-t border-white/10 transition-colors duration-300 ${isExpanded || 'group-hover:border-teal-500/30'}`}>
           <div>
             <p className="text-white font-bold text-lg leading-none mb-1">{stats.value}</p>
             <p className="text-gray-400 text-[10px] uppercase tracking-wider">{stats.label}</p>
           </div>
           
           <div className={`w-10 h-10 rounded-full border flex items-center justify-center text-white transition-all duration-300 ${isExpanded ? 'bg-teal-600 border-teal-600 scale-110' : 'bg-white/5 border-white/10 group-hover:bg-teal-600 group-hover:border-teal-600 group-hover:scale-110'}`}>
             <ArrowUpRight className="w-5 h-5" />
           </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectCard;