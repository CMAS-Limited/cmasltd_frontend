import React, { useState } from 'react';
import { Building } from 'lucide-react';
import ProjectCard from './PortfolioProjectCard'; // Your newly separated child component

/**
 * Portfolio Page Component
 * Serves as the main container for the Case Studies section.
 * Handles category filtering logic and passes data down to the individual ProjectCards.
 */
const Portfolio = () => {
  // State to track which category is currently selected by the user. Defaults to 'All'.
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Available filter categories. Keep 'All' as the default reset state.
  const categories = ['All', 'Infrastructure', 'Commercial', 'Residential'];

  // Placeholder local state data. 
  // TODO: In the future, replace this with a useEffect hook that fetches data from your backend API.
  const projects = [
    {
      id: 1,
      title: "Nairobi Expressway Expansion",
      category: "Infrastructure",
      location: "Nairobi, Kenya",
      scope: "Lead Project Management & Quantity Surveying",
      year: "2023",
      desc: "Comprehensive management of the 27km toll road project, ensuring strict adherence to budget constraints and timeline milestones across complex urban terrain.",
      images: [
        "https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
      ]
    },
    {
      id: 2,
      title: "Diplomatic Enclave Plaza",
      category: "Commercial",
      location: "Kigali, Rwanda",
      scope: "Contract Administration",
      year: "2022",
      desc: "Drafting of contractual documentation and rigorous delay analysis for this high-security, multi-tenant diplomatic commercial center.",
      images: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070&auto=format&fit=crop"
      ]
    },
    {
      id: 3,
      title: "Lakeside Luxury Residences",
      category: "Residential",
      location: "Entebbe, Uganda",
      scope: "Full Cost Management",
      year: "2024",
      desc: "End-to-end cost planning, procurement, and risk mitigation for a 500-unit premium residential estate overlooking Lake Victoria.",
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
      ]
    },
    {
      id: 4,
      title: "Regional Port Authority",
      category: "Infrastructure",
      location: "Mombasa, Kenya",
      scope: "Dispute Resolution",
      year: "2021",
      desc: "Expert advisory and dispute resolution services managing stakeholder communications and contractual closeout for the port expansion.",
      images: [
        "https://images.unsplash.com/photo-1574320311653-339243761df1?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop"
      ]
    }
  ];

  // Derived state: Calculates which projects to display based on the activeFilter.
  // If 'All' is selected, it returns the entire array. Otherwise, it filters by category match.
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    // Wrapper: relative positioning ensures background layers stay contained
    <div className="relative bg-white pt-24 min-h-screen overflow-hidden">
      
      {/* === 1. BACKGROUND LAYERS === */}
      {/* Z-0 keeps these behind the content. The linear-gradient creates the subtle architectural grid. */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-teal-400/10 rounded-full blur-[120px] pointer-events-none z-0 flex-shrink-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-teal-600/5 rounded-full blur-[150px] pointer-events-none z-0 flex-shrink-0"></div>
      
      {/* === 2. PAGE HEADER === */}
      {/* Z-10 brings the content above the background glows/grid */}
      <section className="container mx-auto px-6 pt-12 pb-12 text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-teal-500"></div>
            <span className="text-teal-700 font-bold tracking-widest uppercase text-xs">Our Track Record</span>
            <div className="w-8 h-px bg-teal-500"></div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 font-display leading-[1.1] mb-8">
            Featured <span className="text-teal-600">Case Studies.</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Delivering excellence across East, Central, and West Africa. Browse our portfolio of complex, large-scale construction implementations.
          </p>
        </div>
      </section>

      {/* === 3. FILTER NAVIGATION === */}
      <section className="container mx-auto px-6 mb-16 relative z-10">
        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 bg-white p-2 rounded-full w-fit mx-auto shadow-sm border border-gray-200">
          {categories.map((category) => (
            <button
              key={category}
              // Updates the activeFilter state when clicked, triggering a re-render of filteredProjects
              onClick={() => setActiveFilter(category)}
              // Dynamic classes apply teal background if active, transparent if inactive
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-900/10'
                  : 'bg-transparent text-gray-500 hover:bg-teal-50 hover:text-teal-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* === 4. DYNAMIC PROJECT MAPPING === */}
      <div className="relative z-10 flex flex-col">
        {/* Loop through the filtered array and render a ProjectCard for each object */}
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}

        {/* === 5. EMPTY STATE FALLBACK === */}
        {/* Only displays if the user selects a filter category that currently has 0 associated projects */}
        {filteredProjects.length === 0 && (
          <section className="container mx-auto px-6 py-24 text-center">
            <div className="bg-white/50 backdrop-blur-sm rounded-[3rem] border border-gray-100 p-16">
              <div className="inline-flex w-16 h-16 rounded-full bg-teal-50 text-teal-600 items-center justify-center mb-4 shadow-sm">
                <Building className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 font-display mb-2">Portfolio Updating</h3>
              <p className="text-gray-600 max-w-md mx-auto">We are currently curating our specific case studies for the {activeFilter} sector.</p>
            </div>
          </section>
        )}
      </div>

    </div>
  );
};

export default Portfolio;