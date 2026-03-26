import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '../../../supabaseClient'; // Ensure this path is correct for your project structure
import * as LucideIcons from 'lucide-react'; // Import all icons for dynamic rendering
import { 
  ArrowRight,
  CheckCircle2,
  LayoutGrid,
  ChevronRight,
  ChevronLeft,
  X,
  Layers // Default fallback icon
} from 'lucide-react';

// --- Dynamic Icon Renderer ---
const DynamicIcon = ({ iconName, className }) => {
  if (!iconName) return <Layers className={className} />;
  
  // Handle both standard names (e.g., 'building') and lucide prefixed names (e.g., 'lucide-building')
  const formattedName = iconName.replace(/^lucide-/, '').toLowerCase();
  
  // Find the icon by converting kebab-case/lowercase to PascalCase (e.g., building -> Building)
  const IconComponent = Object.keys(LucideIcons).find(
    key => key.toLowerCase() === formattedName
  );

  const Icon = IconComponent ? LucideIcons[IconComponent] : Layers;
  return <Icon className={className} />;
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Scroll Detection Logic
  const scrollContainerRef = useRef(null);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(true);

  // --- Database Extraction ---
  useEffect(() => {
    fetchActiveServices();
  }, []);

  const fetchActiveServices = async () => {
    try {
      // We only select the fields we need, and ONLY where the service is active
      // Assuming your table is named 'services' based on previous context. If it is 'company_services', change it below.
      const { data, error } = await supabase
        .from('services') 
        .select('*')
        .order('created_at', { ascending: true }); // You might want an 'order' column later

      if (error) throw error;
      
      // We don't have an is_active flag in the services table schema we built, 
      // but if you added one, you'd add `.eq('is_active', true)` above.
      setServices(data || []);
    } catch (error) {
      console.error("Error fetching services:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

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

  // Loading State UI
  if (isLoading) {
    return (
      <section id="expertise" className="relative py-20 overflow-hidden bg-gray-50 flex justify-center items-center min-h-[600px]">
        <div className="flex flex-col items-center gap-3 text-teal-600">
          <LucideIcons.Loader2 className="w-8 h-8 animate-spin" />
          <p className="text-xs font-bold uppercase tracking-widest">Loading Expertise...</p>
        </div>
      </section>
    );
  }

  // Empty State UI
  if (!services || services.length === 0) {
    return null; // Silently hide the section if no services exist
  }

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
                   <img src={service.image_url} alt={service.title} className="w-full h-full object-cover opacity-40 mix-blend-luminosity" />
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
                        <span className="hidden md:block">
                           <DynamicIcon iconName={service.icon_name} className="w-4 h-4" />
                        </span>
                        <span className="whitespace-nowrap">{service.short_title}</span>
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
                      {services[activeTab].features?.slice(0, 4).map((feature, idx) => (
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
      {isModalOpen && services[activeTab] && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
          <div 
            className="absolute inset-0 bg-gray-950/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-50 w-10 h-10 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-full flex items-center justify-center text-gray-900 transition-colors shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="hidden md:block md:w-2/5 relative">
              <img 
                src={services[activeTab].image_url} 
                alt={services[activeTab].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-teal-900/20 mix-blend-multiply"></div>
            </div>
            
            <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto pt-16 md:pt-12">
              <div className="inline-flex items-center gap-2 mb-4 bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg border border-teal-100">
                <DynamicIcon iconName={services[activeTab].icon_name} className="w-4 h-4" />
                <span className="font-bold tracking-widest uppercase text-[10px]">
                  {services[activeTab].short_title}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-display mb-6">
                {services[activeTab].title}
              </h2>
              <div className="w-12 h-1 bg-teal-500 mb-8"></div>
              <p className="text-gray-600 leading-relaxed mb-8 whitespace-pre-line">
                {services[activeTab].long_description}
              </p>
              
              {services[activeTab].features && services[activeTab].features.length > 0 && (
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
              )}
              
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