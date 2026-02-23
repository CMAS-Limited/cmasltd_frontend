import React, { useState, useRef, useEffect } from 'react';
import { 
  Gavel, 
  Calculator, 
  Compass, 
  CalendarClock, 
  Scale, 
  ArrowRight,
  CheckCircle2,
  LayoutGrid,
  ChevronRight,
  ChevronLeft,
  X 
} from 'lucide-react';

const Services = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Scroll Detection Logic
  const scrollContainerRef = useRef(null);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(true);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (el) {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setShowLeftShadow(scrollLeft > 0);
      setShowRightShadow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  const services = [
    {
      id: 0,
      title: "Project Management",
      shortTitle: "Project Mgmt",
      icon: <Compass className="w-4 h-4" />,
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070&auto=format&fit=crop", 
      description: "We work closely with owners, architects, and engineers to provide seamless integration. From preconstruction to project closeout, CMAS provides proactive problem-solving solutions.",
      longDescription: "Our comprehensive Project Management services encompass the entire project lifecycle. We act as your principal representative, managing the triad of time, cost, and quality. From initial feasibility studies and assembling the consultant team to procurement, construction oversight, and final handover, CMAS ensures that every phase is executed with precision. We implement stringent risk management protocols and maintain transparent communication channels, ensuring stakeholders are consistently informed and aligned.",
      features: ["Schedule Management", "Quality Control", "Stakeholder Coordination"]
    },
    {
      id: 1,
      title: "Programme Management",
      shortTitle: "Programme Mgmt",
      icon: <CalendarClock className="w-4 h-4" />,
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop", 
      description: "Given our unmatched expertise in implementation, we offer advice on matters touching on construction programme formulation, review, and management throughout the life of the project.",
      longDescription: "When dealing with multi-faceted, large-scale developments or a portfolio of concurrent projects, standard project management is not enough. Our Programme Management approach synchronizes multiple project lifecycles to maximize efficiency and resource allocation. We establish overarching governance structures, standardize reporting metrics, and identify cross-project dependencies to prevent systemic delays and budget overruns across your entire real estate portfolio.",
      features: ["Programme Formulation", "Progress Reviews", "Lifecycle Management"]
    },
    {
      id: 2,
      title: "Contract Administration",
      shortTitle: "Contract Admin",
      icon: <Gavel className="w-4 h-4" />,
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop", 
      description: "The complexity of construction projects has grown steadily. To safeguard our client's interests, CMAS adopts a pro-active approach in managing contracts for owners and contractors.",
      longDescription: "A well-drafted contract is your primary shield against project failure. CMAS provides rigorous Contract Administration services, ensuring that all parties adhere strictly to their contractual obligations. We handle the preparation of tender documents, evaluation of bids, drafting of formal contracts (including FIDIC and strictly bespoke forms), and the continuous assessment of claims, variations, and extensions of time to protect you from unwarranted financial exposure.",
      features: ["Risk Analysis", "Claims Management", "Dispute Resolution"]
    },
    {
      id: 3,
      title: "Quantity Surveying",
      shortTitle: "QS & Cost",
      icon: <Calculator className="w-4 h-4" />,
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop", 
      description: "We tailor our onsite quantity surveying and cost control service to meet the clients' needs, providing detailed BOQs and cost control to keep your budget on track.",
      longDescription: "Financial certainty is the bedrock of successful construction. Our Quantity Surveying team provides microscopic cost management from inception to final account. We deliver highly accurate preliminary cost advice, detailed Bills of Quantities (BOQs), rigorous value engineering, and strict monthly valuation of works in progress. By continuously forecasting the cost-to-completion, we ensure you never face unexpected financial shortfalls.",
      features: ["Cost Estimation", "Bill of Quantities", "Final Accounts"]
    },
    {
      id: 4,
      title: "Alt. Dispute Resolution",
      shortTitle: "Dispute Res",
      icon: <Scale className="w-4 h-4" />,
      image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2070&auto=format&fit=crop", 
      description: "With the increase in construction disputes, CMAS offers vast experience in dispute avoidance and resolution, acting as arbitrators, adjudicators and expert witnesses.",
      longDescription: "When disagreements threaten to derail a project, litigation should be the last resort. CMAS specializes in Alternative Dispute Resolution (ADR) tailored specifically for the construction industry. Our senior partners act as impartial Adjudicators, Arbitrators, and Expert Witnesses. We focus on swift, pragmatic resolution through mediation and conciliation, saving our clients the immense time, cost, and reputational damage associated with prolonged court battles.",
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
            
            <div className="relative bg-[#0A1A1E] rounded-3xl shadow-2xl border border-white/10 overflow-hidden min-h-[550px] lg:h-[550px] flex flex-col group">
              
              {/* Background Image Layer */}
              {services.map((service, index) => (
                <div 
                  key={service.id} 
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeTab === index ? 'opacity-100' : 'opacity-0'}`}
                >
                   <img src={service.image} alt={service.title} className="w-full h-full object-cover opacity-40 mix-blend-luminosity" />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A1E] via-[#0A1A1E]/95 to-[#0A1A1E]/40"></div>
                </div>
              ))}

              {/* HEADER SECTION (Tabs) */}
              <div className="relative z-20 px-4 pt-5 pb-3 border-b border-white/5 bg-[#0A1A1E]/80 backdrop-blur-md">
                
                <div className="flex items-center gap-2 mb-3 px-1">
                  <LayoutGrid className="w-3.5 h-3.5 text-teal-500" />
                  <span className="text-teal-400 font-bold uppercase tracking-widest text-[10px]">
                    Our Services
                  </span>
                </div>

                {/* SCROLLABLE BUTTONS CONTAINER */}
                <div className="relative group/nav">
                  
                  <div className={`absolute left-0 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-r from-[#0A1A1E] via-[#0A1A1E]/90 to-transparent z-10 pointer-events-none transition-opacity duration-300 flex items-center justify-start pl-1 ${showLeftShadow ? 'opacity-100' : 'opacity-0'}`}>
                    <ChevronLeft className="w-4 h-4 text-teal-400 animate-pulse" />
                  </div>
                  
                  <div className={`absolute right-0 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-l from-[#0A1A1E] via-[#0A1A1E]/90 to-transparent z-10 pointer-events-none transition-opacity duration-300 flex items-center justify-end pr-1 ${showRightShadow ? 'opacity-100' : 'opacity-0'}`}>
                    <ChevronRight className="w-4 h-4 text-teal-400 animate-pulse" />
                  </div>

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
                        className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all duration-300 border ${
                          activeTab === index 
                            ? 'bg-teal-600 text-white border-teal-500 shadow-lg shadow-teal-900/50 scale-100' 
                            : 'bg-white/5 text-gray-400 border-transparent hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <span className="hidden md:block">{service.icon}</span>
                        <span className="whitespace-nowrap">{service.shortTitle}</span>
                      </button>
                    ))}
                    <div className="w-4 flex-shrink-0"></div>
                  </div>
                </div>

              </div>

              {/* CONTENT AREA */}
              <div className="relative z-10 flex-grow p-6 md:p-10 flex flex-col max-w-2xl mt-auto">
                 <div key={activeTab} className="animate-in fade-in slide-in-from-left-4 duration-500 flex flex-col h-full">
                    
                    <div className="mb-4 shrink-0 mt-auto">
                      <h3 className="text-3xl md:text-4xl font-bold text-white font-display leading-tight">
                        {services[activeTab].title}
                      </h3>
                    </div>

                    <div className="mb-6 lg:max-h-[160px] lg:overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-teal-900 scrollbar-track-transparent">
                      <p className="text-gray-300 leading-relaxed text-[15px]">
                        {services[activeTab].description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 shrink-0">
                      {services[activeTab].features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                           <CheckCircle2 className="w-4.5 h-4.5 text-teal-400 shrink-0" />
                           <span className="text-sm font-medium text-gray-200">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="shrink-0 pt-2 border-t border-white/10">
                      <button 
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-widest hover:text-white transition-colors py-2"
                      >
                        Service Details 
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                 </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* === THE MODAL OVERLAY === */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
          <div 
            className="absolute inset-0 bg-gray-950/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300">
            
            {/* THE FIX: Updated Close Button to be highly visible on all screens */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-50 w-10 h-10 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-full flex items-center justify-center text-gray-900 transition-colors shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="hidden md:block md:w-2/5 relative">
              <img 
                src={services[activeTab].image} 
                alt={services[activeTab].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-teal-900/20 mix-blend-multiply"></div>
            </div>
            
            <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto pt-16 md:pt-12">
              <div className="inline-flex items-center gap-2 mb-4 bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg border border-teal-100">
                {services[activeTab].icon}
                <span className="font-bold tracking-widest uppercase text-[10px]">
                  {services[activeTab].shortTitle}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-display mb-6">
                {services[activeTab].title}
              </h2>
              <div className="w-12 h-1 bg-teal-500 mb-8"></div>
              <p className="text-gray-600 leading-relaxed mb-8">
                {services[activeTab].longDescription}
              </p>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Core Competencies</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services[activeTab].features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                       <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
                       <span className="text-sm font-medium text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-10 pt-8 border-t border-gray-100">
                 <a href="/contact" className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-teal-600 transition-colors duration-300 w-full sm:w-auto text-center">
                    Discuss Your Project <ArrowRight className="w-4 h-4" />
                 </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default Services;