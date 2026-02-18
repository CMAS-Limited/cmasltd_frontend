// src/User/Components/Sections/FeaturedProjects.jsx
import React, { useRef, useEffect, useState } from 'react';
import ProjectCard from '../../Components/UI/ProjectCard';
import { ArrowRight, Layers } from 'lucide-react';

const FeaturedProjects = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // === DATA ===
  const projects = [
    {
      id: 1,
      title: "Nairobi Expressway Plaza",
      location: "Nairobi, Kenya",
      category: "Infrastructure",
      year: "2023",
      image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070&auto=format&fit=crop",
      description: "A landmark commercial hub integrating modern office spaces with retail outlets, serving as the operational headquarters.",
      stats: { value: "$45M", label: "Project Value" }
    },
    {
      id: 2,
      title: "Sarit Centre Expansion",
      location: "Westlands, Nairobi",
      category: "Commercial",
      year: "2021",
      image: "https://images.unsplash.com/photo-1555636222-cae831e670b3?q=80&w=2077&auto=format&fit=crop",
      description: "Comprehensive expansion and modernization of one of East Africa's premier shopping destinations.",
      stats: { value: "250k", label: "Sq Ft Added" }
    },
    {
      id: 3,
      title: "Global Trade Centre (GTC)",
      location: "Nairobi, Kenya",
      category: "Mixed-Use",
      year: "2022",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop",
      description: "An iconic mixed-use development featuring an office tower, luxury hotel, and residential apartments.",
      stats: { value: "184m", label: "Height" }
    },
    {
      id: 4,
      title: "Diani Beach Resort",
      location: "Diani, Kwale",
      category: "Hospitality",
      year: "2024",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
      description: "A 5-star luxury beachfront resort designed with sustainable materials and eco-friendly construction practices.",
      stats: { value: "5-Star", label: "Rating" }
    },
    {
      id: 5,
      title: "Kileleshwa Heights",
      location: "Kileleshwa, Nairobi",
      category: "Residential",
      year: "2023",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop",
      description: "Modern luxury apartments focused on sustainable living and community spaces.",
      stats: { value: "120", label: "Units" }
    }
  ];

  // === AUTO SCROLL & INFINITE LOOP LOGIC ===
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId;

    const scrollLoop = () => {
      // If user is dragging, STOP auto-scroll
      if (isDragging) return;

      if (scrollContainer) {
        // Move forward by 0.5px per frame (Adjust for speed)
        scrollContainer.scrollLeft += 0.5;

        // INFINITE LOGIC:
        // We have 2 sets of cards. The "halfway point" is approximately half the scrollWidth.
        // If we scroll past the first set, we instantly jump back to 0.
        // This math assumes the two sets are identical width.
        const maxScroll = scrollContainer.scrollWidth / 2;
        
        if (scrollContainer.scrollLeft >= maxScroll) {
          scrollContainer.scrollLeft = 0; // Seamless jump back to start
        }
      }
      animationFrameId = requestAnimationFrame(scrollLoop);
    };

    animationFrameId = requestAnimationFrame(scrollLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isDragging]); // Re-run when dragging state changes


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
    const walk = (x - scrollRef.current.offsetLeft - startX) * 2; // *2 for faster scroll speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleStopDragging = () => {
    setIsDragging(false);
  };

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