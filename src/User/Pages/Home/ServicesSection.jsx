import React, { useState, useRef, useEffect } from 'react';
import { 
  Gavel, 
  Calculator, 
  Compass, 
  CalendarClock, 
  Scale, 
  ArrowRight,
  CheckCircle2,
  Quote,
  LayoutGrid,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

const Services = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  // Scroll Detection Logic
  const scrollContainerRef = useRef(null);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(true);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (el) {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setShowLeftShadow(scrollLeft > 0);
      // Tolerance of 1px to handle fractional pixel widths
      setShowRightShadow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const services = [
    {
      id: 0,
      title: "Project Management",
      shortTitle: "Project Mgmt",
      icon: <Compass className="w-4 h-4" />,
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070&auto=format&fit=crop", 
      description: "We work closely with owners, architects, and engineers to provide seamless integration. From preconstruction to project closeout, CMAS provides proactive problem-solving solutions to ensure your vision becomes reality without compromise.",
      features: ["Schedule Management", "Quality Control", "Stakeholder Coordination"]
    },
    {
      id: 1,
      title: "Programme Management",
      shortTitle: "Programme Mgmt",
      icon: <CalendarClock className="w-4 h-4" />,
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop", 
      description: "Given our unmatched expertise in implementation, we offer advice on matters touching on construction programme formulation, review, and management throughout the life of the project.",
      features: ["Programme Formulation", "Progress Reviews", "Lifecycle Management"]
    },
    {
      id: 2,
      title: "Contract Administration",
      shortTitle: "Contract Admin",
      icon: <Gavel className="w-4 h-4" />,
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop", 
      description: "The complexity of construction projects has grown steadily. To safeguard our client's interests, CMAS adopts a pro-active approach in managing contracts for owners and contractors.",
      features: ["Risk Analysis", "Claims Management", "Dispute Resolution"]
    },
    {
      id: 3,
      title: "Quantity Surveying",
      shortTitle: "QS & Cost",
      icon: <Calculator className="w-4 h-4" />,
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop", 
      description: "We tailor our onsite quantity surveying and cost control service to meet the clients' needs, providing detailed BOQs and cost control to keep your budget on track.",
      features: ["Cost Estimation", "Bill of Quantities", "Final Accounts"]
    },
    {
      id: 4,
      title: "Alt. Dispute Resolution",
      shortTitle: "Dispute Res",
      icon: <Scale className="w-4 h-4" />,
      image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2070&auto=format&fit=crop", 
      description: "With the increase in construction disputes, CMAS offers vast experience in dispute avoidance and resolution, acting as arbitrators, adjudicators and expert witnesses.",
      features: ["Arbitration Services", "Adjudication", "Expert Witnessing"]
    }
  ];

  return (
    <section 
      id="expertise" 
      className="relative py-20 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 0% 0%, #ffffff 0%, transparent 55%),
          radial-gradient(circle at 100% 0%, #ccfbf1 0%, transparent 50%),
          radial-gradient(circle at 0% 100%, #1f2937 0%, transparent 60%),
          radial-gradient(circle at 100% 100%, #0d9488 0%, transparent 60%),
          #f3f4f6`
      }}
    >
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* LEFT SIDE (30%) */}
          <div className="w-full lg:w-1/3 pt-6">
             <div className="inline-flex items-center gap-2 mb-4">
                <div className="h-px w-8 bg-teal-600"></div>
                <span className="text-teal-700 font-bold tracking-widest uppercase text-xs">
                  Our Expertise
                </span>
             </div>
             
             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-display mb-6 leading-tight">
                Building trust through <br />
                <span className="text-teal-600">expert management.</span>
             </h2>

             <div className="text-gray-600 text-base leading-relaxed space-y-6">
               <p>
                  CMAS provides a comprehensive array of consulting and management services for projects encapsulating the pre-tender and post-tender stages of construction. 
               </p>
               <p>
                  These services enable our clients to identify potential risks facing successful implementation of various tasks with the objective of avoiding the problems and enabling the client to take effective control of the project.
               </p>
             </div>
          </div>


          {/* RIGHT SIDE (66%) */}
          <div className="w-full lg:w-2/3">
            
            <div className="relative bg-gray-900 rounded-2xl shadow-2xl border border-white/10 overflow-hidden h-[500px] flex flex-col group">
              
              {/* Background Image Layer */}
              {services.map((service, index) => (
                <div 
                  key={service.id} 
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeTab === index ? 'opacity-100' : 'opacity-0'}`}
                >
                   <img src={service.image} alt={service.title} className="w-full h-full object-cover opacity-60" />
                   <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-transparent"></div>
                </div>
              ))}

              {/* HEADER SECTION */}
              <div className="relative z-20 px-4 pt-5 pb-3 border-b border-white/5 bg-gray-900/50 backdrop-blur-sm">
                
                <div className="flex items-center gap-2 mb-3 px-1">
                  <LayoutGrid className="w-3.5 h-3.5 text-teal-500" />
                  <span className="text-teal-400 font-bold uppercase tracking-widest text-[10px]">
                    Our Services
                  </span>
                </div>

                {/* SCROLLABLE BUTTONS CONTAINER */}
                <div className="relative group/nav">
                  
                  {/* === LEFT FADE + ARROW === */}
                  <div className={`absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-900 via-gray-900/90 to-transparent z-10 pointer-events-none transition-opacity duration-300 flex items-center justify-start pl-1 ${showLeftShadow ? 'opacity-100' : 'opacity-0'}`}>
                    <ChevronLeft className="w-4 h-4 text-teal-400 animate-pulse" />
                  </div>
                  
                  {/* === RIGHT FADE + ARROW === */}
                  <div className={`absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-900 via-gray-900/90 to-transparent z-10 pointer-events-none transition-opacity duration-300 flex items-center justify-end pr-1 ${showRightShadow ? 'opacity-100' : 'opacity-0'}`}>
                    <ChevronRight className="w-4 h-4 text-teal-400 animate-pulse" />
                  </div>

                  {/* BUTTONS LIST */}
                  <div 
                    ref={scrollContainerRef}
                    onScroll={checkScroll}
                    className="flex flex-nowrap overflow-x-auto gap-2 pb-1 scrollbar-hide relative z-0" 
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {services.map((service, index) => (
                      <button
                        key={service.id}
                        onClick={() => setActiveTab(index)}
                        className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                          activeTab === index 
                            ? 'bg-teal-600 text-white border-teal-500 shadow-lg shadow-teal-900/50 scale-100' 
                            : 'bg-white/5 text-gray-400 border-transparent hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <span className="hidden md:block">{service.icon}</span>
                        <span className="whitespace-nowrap">{service.shortTitle}</span>
                      </button>
                    ))}
                    {/* Spacer to ensure last item is visible under gradient */}
                    <div className="w-4 flex-shrink-0"></div>
                  </div>
                </div>

              </div>

              {/* CONTENT AREA */}
              <div className="relative z-10 flex-grow p-8 md:p-10 flex flex-col justify-center max-w-xl">
                 <div key={activeTab} className="animate-in fade-in slide-in-from-left-4 duration-500 h-full flex flex-col">
                    
                    <div className="mb-4 shrink-0">
                      <h3 className="text-3xl font-bold text-white font-display">
                        {services[activeTab].title}
                      </h3>
                    </div>

                    <div className="mb-6 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-teal-900 scrollbar-track-transparent max-h-[160px]">
                      <div className="relative">
                        <Quote className="absolute -top-1 -left-4 w-4 h-4 text-teal-700/50 transform -scale-x-100" />
                        <p className="text-gray-300 leading-relaxed text-sm">
                          {services[activeTab].description}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 shrink-0">
                      {services[activeTab].features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                           <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                           <span className="text-xs font-medium text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="shrink-0 mt-auto">
                      <a href="#" className="inline-flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest hover:text-teal-400 transition-colors border-b border-teal-500/30 pb-1 hover:border-teal-400">
                        Service Details 
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                 </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Services;