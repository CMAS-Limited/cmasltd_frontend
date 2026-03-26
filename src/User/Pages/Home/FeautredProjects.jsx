import React, { useRef, useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient'; 
import ProjectCard from '../../Components/UI/ProjectCard';
import { ArrowRight, Layers, Loader2 } from 'lucide-react';

const FeaturedProjects = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
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
        .order('created_at', { ascending: false })
        .limit(8); 

      if (error) throw error;

      // Map the backend data to match exactly what the ProjectCard expects
      const formattedProjects = data.map((item) => {
        const coverImg = Array.isArray(item.images) && item.images.length > 0 
          ? item.images[0] 
          : 'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070&auto=format&fit=crop'; 

        // --- NEW STATS MAPPING LOGIC ---
        // Check if features exist and are stored as an array
        const hasFeatures = Array.isArray(item.mainfeatures) && item.mainfeatures.length > 0;
        
        // Grab the first feature for the BIG text (Fallback to project year if empty)
        const statValue = hasFeatures ? item.mainfeatures[0] : item.project_year;
        
        // Grab the second feature for the SMALL label (Fallback to 'Highlight' if they only typed one word)
        const statLabel = hasFeatures && item.mainfeatures.length > 1 ? item.mainfeatures[1] : 'Highlight';

        return {
          id: item.id,
          title: item.title,
          location: item.location || 'Kenya',
          category: item.category,
          year: item.project_year,
          image: coverImg,
          description: item.description,
          
          // Inject the dynamically mapped features into the card's stats
          stats: { 
            value: statValue, 
            label: statLabel 
          }
        };
      });

      setProjects(formattedProjects);
    } catch (error) {
      console.error("Error fetching portfolio:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // === AUTO SCROLL & INFINITE LOOP LOGIC ===
  useEffect(() => {
    // Prevent the scroll script from running if we are still loading or have no data
    if (isLoading || projects.length === 0) return;

    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId;

    const scrollLoop = () => {
      if (isDragging) return;

      if (scrollContainer) {
        scrollContainer.scrollLeft += 0.5;

        // INFINITE LOGIC:
        const maxScroll = scrollContainer.scrollWidth / 2;
        if (scrollContainer.scrollLeft >= maxScroll) {
          scrollContainer.scrollLeft = 0; 
        }
      }
      animationFrameId = requestAnimationFrame(scrollLoop);
    };

    animationFrameId = requestAnimationFrame(scrollLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isDragging, isLoading, projects.length]); // Re-run when dragging state or data changes


  // === MANUAL DRAG HANDLERS (Mouse & Touch) ===
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX || e.touches[0].pageX;
    const walk = (x - scrollRef.current.offsetLeft - startX) * 2; 
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleStopDragging = () => {
    setIsDragging(false);
  };

  // Graceful loading state
  if (isLoading) {
    return (
      <section id="portfolio" className="relative py-24 bg-[#0F5156] flex justify-center items-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3 text-teal-400">
          <Loader2 className="w-8 h-8 animate-spin" />
          <p className="text-xs font-bold uppercase tracking-widest">Loading Portfolio...</p>
        </div>
      </section>
    );
  }

  // Graceful empty state
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section id="portfolio" className="relative py-24 bg-[#0F5156] overflow-hidden">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
      </div>

      <div className="container mx-auto px-6 relative z-10 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
             <div className="inline-flex items-center gap-2 mb-4">
                <Layers className="w-5 h-5 text-teal-400" />
                <span className="text-teal-400 font-bold tracking-widest uppercase text-xs">
                  Our Portfolio
                </span>
             </div>
             <h2 className="text-4xl md:text-6xl font-bold text-white font-display leading-tight">
                Featured <span className="text-teal-400">Projects</span>
             </h2>
             <p className="text-teal-100/70 mt-6 text-lg leading-relaxed max-w-xl">
               A showcase of our defining work across infrastructure, commercial, and residential sectors.
             </p>
          </div>
          {/* Note: Update this href if you create a dedicated standalone portfolio page later */}
          <a href="#" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-teal-400/30 text-white font-semibold hover:bg-teal-400 hover:text-[#0F5156] transition-all">
            View All Projects <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* === DRAGGABLE SCROLL CONTAINER === */}
      <div 
        className="relative w-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleStopDragging}
        onMouseUp={handleStopDragging}
        onMouseMove={handleMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleStopDragging}
        onTouchMove={handleMove}
      >
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-0 scrollbar-hide select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Set 1 */}
          <div className="flex">
            {projects.map((project) => (
              <ProjectCard key={`a-${project.id}`} {...project} />
            ))}
          </div>
          {/* Duplicate Set (Necessary for infinite loop) */}
          <div className="flex">
            {projects.map((project) => (
              <ProjectCard key={`b-${project.id}`} {...project} />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default FeaturedProjects;