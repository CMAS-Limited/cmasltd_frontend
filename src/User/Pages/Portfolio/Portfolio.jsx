import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient'; // Ensure this path is correct
import { Building, Loader2 } from 'lucide-react';
import ProjectCard from './PortfolioProjectCard'; 

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Database States
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // === DATA EXTRACTION ===
  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('created_at', { ascending: false }); 

      if (error) throw error;

      // Map the backend data to match exactly what your ProjectCard expects
      const formattedProjects = data.map((item) => {
        // Ensure images are always an array
        const imageArray = Array.isArray(item.images) 
          ? item.images 
          : (item.images ? item.images.split(',').map(img => img.trim()) : []);

        return {
          id: item.id,
          title: item.title,
          category: item.category || 'Uncategorized',
          location: item.location || 'Location Not Specified',
          scope: item.cmas_role || '', // Mapping backend cmas_role to frontend scope
          year: item.project_year || '',
          desc: item.description || '', // Mapping backend description to frontend desc
          images: imageArray.length > 0 ? imageArray : ['https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070&auto=format&fit=crop'] // Fallback image
        };
      });

      setProjects(formattedProjects);
    } catch (error) {
      console.error("Error fetching portfolio:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Dynamically generate filter categories based on the actual data in your database
  const uniqueCategories = Array.from(new Set(projects.map(p => p.category).filter(Boolean)));
  const categories = ['All', ...uniqueCategories];

  // Derived state: Calculates which projects to display based on the activeFilter.
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  // Graceful loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        <div className="flex flex-col items-center gap-3 text-teal-600">
          <Loader2 className="w-8 h-8 animate-spin" />
          <p className="text-xs font-bold uppercase tracking-widest">Compiling Case Studies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-white pt-24 min-h-screen overflow-hidden">
      
      {/* === 1. BACKGROUND LAYERS === */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-teal-400/10 rounded-full blur-[120px] pointer-events-none z-0 flex-shrink-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-teal-600/5 rounded-full blur-[150px] pointer-events-none z-0 flex-shrink-0"></div>
      
      {/* === 2. PAGE HEADER === */}
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
      {categories.length > 1 && (
        <section className="container mx-auto px-6 mb-16 relative z-10">
          <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 bg-white p-2 rounded-full w-fit mx-auto shadow-sm border border-gray-200">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
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
      )}

      {/* === 4. DYNAMIC PROJECT MAPPING === */}
      <div className="relative z-10 flex flex-col">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}

        {/* === 5. EMPTY STATE FALLBACK === */}
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