import React from 'react';
import { 
  ArrowDownRight, 
  Map, 
  Building, 
  ShieldCheck, 
  FileText, 
  Clock, 
  Users, 
  MessageSquare, 
  CheckCircle,
  Quote,
  Globe2
} from 'lucide-react';

const About = () => {
  
  const valueAdds = [
    {
      id: "01",
      title: "Risk Management",
      desc: "Mitigation and recommendation services to retain the health of the project from inception to handover.",
      icon: <ShieldCheck className="w-5 h-5" />
    },
    {
      id: "02",
      title: "Contractual Drafting",
      desc: "Drafting of contractual letters and documentation on behalf of the Client to ensure absolute legal clarity.",
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: "03",
      title: "Programme Management",
      desc: "Rigorous delay analysis and timeline management to ensure your project stays on schedule without compromise.",
      icon: <Clock className="w-5 h-5" />
    },
    {
      id: "04",
      title: "Client Representation",
      desc: "Active advice and management of the client representative role throughout the construction lifecycle.",
      icon: <Users className="w-5 h-5" />
    },
    {
      id: "05",
      title: "Communication Protocol",
      desc: "Establishing and enforcing robust communication frameworks between all project stakeholders.",
      icon: <MessageSquare className="w-5 h-5" />
    },
    {
      id: "06",
      title: "Closeout Management",
      desc: "Comprehensive oversight dedicated to ensuring a smooth, defect-free, and successful project handover.",
      icon: <CheckCircle className="w-5 h-5" />
    }
  ];

  return (
    <div className="bg-[#F0F5F4] pt-16 pb-12">
      
      {/* === 1. HERO: Elevated Editorial Layout === */}
      <section className="container mx-auto px-6 pt-8 pb-12 lg:pt-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-5 relative z-10">
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-12 h-px bg-teal-500"></div>
              <span className="text-teal-700 font-bold tracking-widest uppercase text-xs">
                Our Story
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-gray-900 font-display leading-[1.05] mb-8 tracking-tight">
              Turning complex <br/>
              <span className="text-teal-600 font-normal italic">visions</span> into <br/>
              reality.
            </h1>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-lg">
              Contract Management Advisory Services Limited (CMAS Ltd.) is devoted to the construction industry, driven exclusively by our commitment to service excellence and strategic planning.
            </p>
            
            <a href="#mission" className="inline-flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-white border border-teal-100 shadow-sm flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
                <ArrowDownRight className="w-5 h-5" />
              </div>
              <span className="font-bold text-sm uppercase tracking-widest text-gray-900 group-hover:text-teal-600 transition-colors">Read Our Mission</span>
            </a>
          </div>

          {/* Right Image with Floating Badge */}
          <div className="lg:col-span-7 relative mt-10 lg:mt-0">
            <div className="absolute -top-10 right-0 w-[90%] h-[90%] bg-gradient-to-br from-[#E2ECEB] to-transparent rounded-[3rem] -z-10 blur-xl"></div>
            
            <div className="relative h-[450px] md:h-[650px] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-teal-900/10 border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop" 
                alt="Modern Architecture" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent"></div>
            </div>

            {/* Floating Authority Badge */}
            <div className="absolute -bottom-6 -left-6 md:bottom-10 md:-left-12 bg-white rounded-3xl p-6 shadow-xl border border-gray-50 flex items-center gap-5 z-20 hover:-translate-y-2 transition-transform duration-500">
              <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center">
                <span className="text-2xl font-bold text-teal-600 font-display">15+</span>
              </div>
              <div className="pr-4">
                <p className="text-gray-900 font-bold text-lg leading-tight">Years of</p>
                <p className="text-gray-500 text-sm">Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === 2. THE MISSION: Gradient Quote Card === */}
      <section id="mission" className="py-16">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-br from-white to-[#F8FAFA] rounded-[3rem] p-10 md:p-16 border border-teal-100 shadow-xl shadow-teal-900/5 relative overflow-hidden flex flex-col md:flex-row gap-12 items-center">
            
            {/* Left: Heading & Icon */}
            <div className="md:w-1/3 shrink-0 relative z-10 flex flex-col items-start">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-600 text-white mb-6 shadow-lg shadow-teal-600/30">
                <Quote className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-display mb-4">Our Mission</h2>
              <div className="w-12 h-1.5 bg-teal-500 rounded-full"></div>
            </div>

            {/* Right: The Statement */}
            <div className="md:w-2/3 relative z-10 md:border-l-2 md:border-[#E2ECEB] md:pl-10">
              <p className="text-2xl md:text-3xl font-display text-gray-800 leading-relaxed italic">
                "To protect our Clients interest in construction projects by being ever vigilant in meeting the needs of those who entrust us with their Quantity Surveying, Project Management and Contract Administration & Management processes."
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* === 3. HISTORY & REACH: Photographic Bento Box === */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="mb-16 max-w-2xl">
            <h2 className="text-4xl font-bold text-gray-900 font-display mb-4">An efficacious company.</h2>
            <p className="text-gray-500 text-lg">A track record of managing the most complex construction projects.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Box 1: History */}
            <div className="md:col-span-2 bg-white rounded-3xl p-10 border border-teal-100/50 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group">
              <div className="mb-8 flex justify-between items-start">
                <span className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-teal-100 to-[#E2ECEB] font-display group-hover:from-teal-200 group-hover:to-teal-100 transition-all">2007</span>
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-teal-600">
                  <Building className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Incorporation & Growth</h3>
                <p className="text-gray-600 leading-relaxed max-w-xl">
                  Since 2007, CMAS Ltd. has developed an excellent track record spanning infrastructure and civil works (mines, mega bridges, airports, dams) to modern buildings (commercial developments, shopping malls, diplomatic offices, and residential complexes).
                </p>
              </div>
            </div>

            {/* Box 2: Photographic Reach */}
            <div className="rounded-3xl p-10 flex flex-col justify-between text-white relative overflow-hidden group shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
              {/* Image Background */}
              <img 
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop" 
                alt="Architecture Map" 
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              {/* Teal Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-teal-950 via-teal-900/90 to-teal-900/60 mix-blend-multiply"></div>
              
              <div className="relative z-10 mb-8">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <Globe2 className="w-5 h-5 text-teal-300" />
                </div>
              </div>
              <div className="relative z-10 mt-auto">
                <h3 className="text-2xl font-bold mb-3 text-white">Pan-African Reach</h3>
                <p className="text-teal-100/80 leading-relaxed text-sm">
                  Successfully implementing large-scale projects across East, Central, and West Africa.
                </p>
              </div>
            </div>

            {/* Box 3: Methodology */}
            <div className="md:col-span-3 bg-gray-900 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between text-white border border-gray-800 shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden">
               {/* Abstract texture */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px] pointer-events-none"></div>

              <div className="md:w-1/2 mb-8 md:mb-0 relative z-10">
                <h3 className="text-2xl font-bold mb-3">Systematic Execution</h3>
                <p className="text-gray-400 leading-relaxed">
                  We adopt a plan of work aligned with the RIBA (Royal Institute of British Architects) Plan of Work 2020, ensuring the systematic firming up of all issues at every stage.
                </p>
              </div>
              <div className="md:w-auto relative z-10">
                
                {/* SYSTEM UPDATE: Outer container converted to primary anchor tag block */}
                <a 
                  href="/Files/2020RIBAOVERVIEW.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-5 bg-white/5 hover:bg-white/10 backdrop-blur-md px-8 py-5 rounded-2xl border border-white/10 cursor-pointer group/link transition-all duration-300"
                >
                  <div className="p-3 bg-teal-500/20 rounded-xl text-teal-400 group-hover/link:bg-teal-500 group-hover/link:text-white transition-colors duration-300">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] text-teal-400 uppercase tracking-widest font-bold mb-1">Methodology</p>
                    <p className="text-xl font-display font-bold group-hover/link:text-teal-300 transition-colors">
                      RIBA Framework
                    </p>
                  </div>
                </a>
                {/* END SYSTEM UPDATE */}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* === 4. VALUE ADDITION: "The Process Line" Layout === */}
      <section className="py-24 bg-white border-y border-teal-100/50 relative">
        <div className="container mx-auto px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left: Sticky Header */}
            <div className="lg:col-span-4 relative">
              <div className="lg:sticky lg:top-32">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-display mb-6">
                  Our <span className="text-teal-600">Value Add</span> Services.
                </h2>
                <p className="text-gray-500 text-lg leading-relaxed mb-8">
                  Apart from normal Quantity Surveying Services, CMAS QS puts in place the required tools and systems to ensure Time, Cost, and Quality are controlled efficiently.
                </p>
              </div>
            </div>

            {/* Right: Connected Process List */}
            <div className="lg:col-span-8 relative">
              {/* The vertical connecting dashed line */}
              <div className="absolute top-8 bottom-8 left-[2.25rem] w-px border-l-2 border-dashed border-teal-100 hidden md:block z-0"></div>

              <div className="flex flex-col gap-10 relative z-10">
                {valueAdds.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col md:flex-row gap-6 md:gap-10 items-start group"
                  >
                    {/* The Number Node */}
                    <div className="shrink-0 relative bg-white md:py-2">
                      <div className="w-16 h-16 rounded-2xl bg-[#F0F5F4] border border-teal-100 flex items-center justify-center group-hover:bg-teal-600 group-hover:border-teal-600 transition-colors duration-300 shadow-sm">
                        <span className="text-xl font-display font-bold text-teal-700 group-hover:text-white transition-colors">
                          {item.id}
                        </span>
                      </div>
                    </div>
                    
                    {/* The Content Card */}
                    <div className="bg-[#F0F5F4] p-8 md:p-10 rounded-[2rem] border border-transparent flex-grow hover:bg-white hover:shadow-xl hover:border-teal-100 transition-all duration-300">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-2.5 rounded-xl bg-teal-100 text-teal-700">
                          {item.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed text-lg">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default About;