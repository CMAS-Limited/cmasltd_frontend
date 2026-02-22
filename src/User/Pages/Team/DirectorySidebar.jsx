import React from 'react';
import { ChevronRight } from 'lucide-react';

/**
 * DirectorySidebar Component
 * Renders the interactive, sticky left-hand navigation menu for the Team page.
 * * @param {Array} categories - Array of unique category strings (e.g., ["Board of Directors", "Senior Management"]).
 * @param {Array} teamData - The full array of team member objects.
 * @param {Object} activeMember - The currently selected team member object.
 * @param {Function} setActiveMember - State setter function to update the active member on click.
 */
const DirectorySidebar = ({ categories, teamData, activeMember, setActiveMember }) => {
  return (
    // Outer Container: Uses lg:sticky so it stays pinned to the screen while scrolling on desktop
    <div className="bg-[#0A1A1E] rounded-[2.5rem] p-6 md:p-8 shadow-2xl lg:sticky lg:top-32 flex flex-col gap-10 border border-teal-900/50">
      
      {/* 1. Loop through each unique category to create sections */}
      {categories.map((category) => (
        <div key={category}>
          
          {/* Category Section Header */}
          <h3 className="text-[10px] font-bold text-teal-400 uppercase tracking-widest mb-4 border-b border-white/10 pb-3">
            {category}
          </h3>
          
          {/* List Container: 
              - Mobile: 'flex-row overflow-x-auto' creates a swipeable horizontal row.
              - Desktop: 'lg:flex-col' stacks them vertically. 
          */}
          <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 hide-scrollbar">
            
            {/* 2. Filter the main team array to only show members belonging to the current category */}
            {teamData.filter(member => member.category === category).map((member) => {
              
              // Check if this specific button represents the currently viewed member
              const isActive = activeMember.id === member.id;
              
              return (
                <button
                  key={member.id}
                  // Updates the parent component's state, instantly changing the right-hand spotlight panel
                  onClick={() => setActiveMember(member)}
                  className={`flex items-center justify-between text-left w-full px-5 py-4 rounded-2xl transition-all duration-300 shrink-0 md:shrink border ${
                    // Dynamic Styling based on active state
                    isActive 
                      ? 'bg-teal-600 text-white border-teal-500 shadow-lg shadow-teal-900/50' // Highlighted state
                      : 'bg-transparent text-gray-400 border-transparent hover:bg-white/5 hover:text-white' // Default/Hover state
                  }`}
                >
                  <div>
                    <p className="font-bold font-display text-lg">{member.name}</p>
                    
                    {/* Role text: 
                        We use split('&')[0] to grab just the first part of their title 
                        (e.g., "Managing Director" instead of "Managing Director & Principal QS") 
                        to keep the sidebar looking clean and uncluttered.
                    */}
                    <p className={`text-[10px] tracking-widest uppercase mt-1 ${isActive ? 'text-teal-100' : 'text-gray-500'}`}>
                      {member.role.split('&')[0]}
                    </p>
                  </div>
                  
                  {/* Visual indicator (Arrow) that only appears on the active button */}
                  {isActive && <ChevronRight className="w-5 h-5 text-white" />}
                </button>
              );
            })}
          </div>
          
        </div>
      ))}
    </div>
  );
};

export default DirectorySidebar;