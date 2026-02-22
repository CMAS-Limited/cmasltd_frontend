import React from 'react';
import { ArrowRight, MapPin, Briefcase, Calendar } from 'lucide-react';
import ImageSlider from './Imageslider';

/**
 * ProjectCard Component
 * Displays a single portfolio project in a full-width row.
 * Automatically alternates between a "Light Mode" (image left) and "Dark Mode" (image right) 
 * layout based on its index position in the array.
 * * @param {Object} project - The data object containing title, desc, location, images, etc.
 * @param {Number} index - The array index of the project, used to determine the alternating layout.
 */
const ProjectCard = ({ project, index }) => {
  // === 1. ALTERNATING LAYOUT LOGIC ===
  // Calculate if the current index is an even number (0, 2, 4...)
  const isEven = index % 2 === 0;
  
  // Format the index into a two-digit string (e.g., '01', '02') for the massive background watermark
  const projectNumber = String(index + 1).padStart(2, '0');

  return (
    // Section wrapper: Handles the dark/light background toggle and smooth color transitions
    <section 
      className={`relative py-24 lg:py-32 transition-colors duration-500 ${
        isEven ? 'bg-white text-gray-900' : 'bg-[#132A2F] text-white'
      }`}
    >
      {/* === 2. BACKGROUND WATERMARK === */}
      {/* This is the massive "01", "02" text. 
        - 'pointer-events-none' & 'select-none' ensure it doesn't block the user from clicking links or text.
        - 'top-1/2 -translate-y-1/2' keeps it perfectly centered vertically in the section.
        - It swaps left/right positions based on the isEven logic so it's always behind the text, not the image.
      */}
      <div 
        className={`absolute top-1/2 -translate-y-1/2 ${
          isEven 
            ? 'right-0 md:right-10 lg:right-20 text-gray-100' // Solid light gray for white backgrounds
            : 'left-0 md:left-10 lg:left-20 text-white/[0.04]' // Faint transparent white for dark backgrounds
        } text-[15rem] md:text-[25rem] lg:text-[32rem] font-display font-bold leading-none pointer-events-none select-none z-0`}
      >
        {projectNumber}
      </div>

      {/* === 3. CORE CONTENT CONTAINER === */}
      {/* z-10 ensures all the readable content sits on top of the background watermark */}
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Flex container that swaps row direction (image left vs image right) */}
        <div 
          className={`flex flex-col gap-10 lg:gap-20 items-center ${
            isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
          } group`}
        >
          
          {/* === IMAGE SIDE === */}
          <div className="w-full lg:w-1/2 relative z-20">
            {/* The image container adjusts its border and shadow colors to match the dark/light mode */}
            <div className={`relative h-[350px] md:h-[500px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl ${
              isEven 
                ? 'shadow-teal-900/10 border-4 border-gray-50' 
                : 'shadow-black/30 border-4 border-white/10'
            }`}>
              
              {/* Uses our custom ImageSlider component to cycle through the project's photos */}
              <ImageSlider images={project.images} title={project.title} />
              
              {/* Floating Category Badge */}
              <div className={`absolute top-6 left-6 px-4 py-2 backdrop-blur-md rounded-xl text-[10px] font-bold tracking-widest uppercase shadow-sm z-20 ${
                isEven ? 'bg-white/95 text-teal-900' : 'bg-[#132A2F]/90 text-teal-300 border border-white/10'
              }`}>
                {project.category}
              </div>
            </div>
          </div>

          {/* === DATA / TEXT SIDE === */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center relative z-10">
            
            <h2 className={`text-3xl md:text-5xl font-bold font-display mb-6 transition-colors ${
              isEven ? 'text-teal-900 group-hover:text-teal-600' : 'text-white group-hover:text-teal-400'
            }`}>
              {project.title}
            </h2>
            
            <p className={`text-lg leading-relaxed mb-8 font-medium ${
              isEven ? 'text-gray-700' : 'text-gray-300'
            }`}>
              {project.desc}
            </p>

            {/* === METADATA GRID === */}
            {/* The entire styling of this grid (background, shadows, borders) flips based on isEven */}
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 mb-10 p-8 rounded-3xl border transition-all duration-300 ${
              isEven 
                ? 'bg-white shadow-xl shadow-gray-200/50 border-gray-100' // Crisp white card for light sections
                : 'bg-[#1A363D] shadow-xl shadow-black/20 border-teal-900/50' // Deep solid card for dark sections
            }`}>
              
              {/* Location Data */}
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg shrink-0 ${isEven ? 'bg-teal-50 text-teal-600' : 'bg-white/10 text-teal-400'}`}>
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className={`block text-[10px] uppercase tracking-widest font-bold mb-1 ${isEven ? 'text-gray-500' : 'text-gray-400'}`}>Location</span>
                  <span className={`font-bold ${isEven ? 'text-gray-900' : 'text-white'}`}>{project.location}</span>
                </div>
              </div>
              
              {/* Timeline Data */}
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg shrink-0 ${isEven ? 'bg-teal-50 text-teal-600' : 'bg-white/10 text-teal-400'}`}>
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <span className={`block text-[10px] uppercase tracking-widest font-bold mb-1 ${isEven ? 'text-gray-500' : 'text-gray-400'}`}>Timeline</span>
                  <span className={`font-bold ${isEven ? 'text-gray-900' : 'text-white'}`}>{project.year}</span>
                </div>
              </div>

              {/* Scope Data - Spans both columns so longer text doesn't break the grid */}
              <div className="flex items-start gap-4 md:col-span-2">
                <div className={`p-2 rounded-lg shrink-0 ${isEven ? 'bg-teal-50 text-teal-600' : 'bg-white/10 text-teal-400'}`}>
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <span className={`block text-[10px] uppercase tracking-widest font-bold mb-1 ${isEven ? 'text-gray-500' : 'text-gray-400'}`}>CMAS Role</span>
                  <span className={`font-bold ${isEven ? 'text-gray-900' : 'text-white'}`}>{project.scope}</span>
                </div>
              </div>
            </div>

            {/* === CALL TO ACTION BUTTON === */}
            <div>
              <button className={`inline-flex items-center gap-3 px-6 py-3 rounded-full font-bold uppercase tracking-widest text-[10px] transition-colors duration-300 group/btn shadow-md ${
                isEven ? 'bg-gray-900 text-white hover:bg-teal-600' : 'bg-white text-gray-900 hover:bg-teal-400 hover:text-white'
              }`}>
                View Case Study 
                {/* The arrow shifts slightly right when the user hovers over the button */}
                <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectCard;