import React, { useState } from 'react';
import DirectorySidebar from './DirectorySidebar';
import MemberSpotlight from './MemberSpotlight';
import TeamCTA from './TeamCTA';

/**
 * Team Page Component
 * Acts as the "Smart Container" for the interactive Team Directory.
 * It holds the core data, manages the active state, and passes information 
 * down to its child components via props.
 */
const Team = () => {
  // === 1. CORE DATA ===
  // Static placeholder data for the team. 
  // TODO: Eventually, you will replace this with a useEffect hook that fetches from your API.
  const teamData = [
    {
      id: "david-ochieng",
      category: "Board of Directors",
      name: "David M. Ochieng",
      role: "Managing Director & Principal QS",
      accreditation: "BSc (QS), MAAK (QS), IQSK, CIArb",
      focus: ["Strategic Leadership", "Dispute Resolution", "Contract Law"],
      bio: "With over 25 years of experience across East Africa, David has spearheaded CMAS's growth from a boutique firm to a continental powerhouse. He specializes in providing absolute legal clarity in contract administration and acts as the ultimate shield for our clients' financial interests.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2000&auto=format&fit=crop",
      email: "david@cmas.com",
    },
    {
      id: "sarah-njoroge",
      category: "Board of Directors",
      name: "Sarah K. Njoroge",
      role: "Director of Project Management",
      accreditation: "BSc (Hons), PMP, MRICS",
      focus: ["RIBA Frameworks", "Timeline Management", "Risk Mitigation"],
      bio: "Sarah brings unparalleled expertise in the RIBA Plan of Work framework. She ensures rigorous timeline management and seamless execution for multi-million dollar infrastructure and commercial projects, establishing robust communication protocols between all stakeholders.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2000&auto=format&fit=crop",
      email: "sarah@cmas.com",
    },
    {
      id: "michael-mutua",
      category: "Senior Management",
      name: "Michael Mutua",
      role: "Senior Quantity Surveyor",
      accreditation: "BSc (QS), IQSK",
      focus: ["Cost Planning", "Value Engineering", "Procurement"],
      bio: "Michael is the engine behind our rigorous cost management systems. He ensures that from inception to final account, every dollar is tracked, justified, and optimized for the client's benefit.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1500&auto=format&fit=crop",
      email: "michael@cmas.com",
    },
    {
      id: "grace-wanjiku",
      category: "Senior Management",
      name: "Grace Wanjiku",
      role: "Lead Contract Administrator",
      accreditation: "LLB, MCIArb",
      focus: ["Contract Drafting", "Claim Assessment", "Fidic Forms"],
      bio: "Grace bridges the gap between construction and law. She is responsible for drafting bulletproof contractual documentation and navigating complex claims to protect the project from litigation.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1500&auto=format&fit=crop",
      email: "grace@cmas.com",
    }
  ];

  // === 2. STATE MANAGEMENT ===
  // Tracks which team member is currently selected. Initializes with the first person in the array.
  const [activeMember, setActiveMember] = useState(teamData[0]);
  
  // === 3. DERIVED DATA ===
  // This automatically extracts unique categories from the teamData array.
  // By mapping the categories and passing them into a `new Set()`, it instantly removes duplicates,
  // leaving us with an array like: ["Board of Directors", "Senior Management"]
  const categories = [...new Set(teamData.map(item => item.category))];

  return (
    <div className="relative bg-[#F0F5F4] pt-24 min-h-screen overflow-hidden">
      
      {/* === 4. BACKGROUND TEXTURES === */}
      {/* Grid pattern, blueprint watermark, and ambient teal glow to add depth to the page */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute top-0 right-0 w-[80%] h-full opacity-[0.02] pointer-events-none z-0 bg-no-repeat bg-right-top bg-contain mix-blend-multiply" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop)' }}></div>
      <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* === 5. HEADER === */}
      <section className="container mx-auto px-6 pt-12 pb-10 relative z-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-teal-500"></div>
            <span className="text-teal-700 font-bold tracking-widest uppercase text-xs">The Directory</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 font-display leading-[1.05] tracking-tight">
            Our <span className="text-teal-600 italic font-normal">Collective.</span>
          </h1>
        </div>
      </section>

      {/* === 6. MAIN DASHBOARD LAYOUT === */}
      <section className="container mx-auto px-6 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column (4/12 width on desktop): Navigation Sidebar */}
          <div className="lg:col-span-4 relative">
            <DirectorySidebar 
              categories={categories} 
              teamData={teamData} 
              activeMember={activeMember} 
              setActiveMember={setActiveMember} // Passes down the ability to change state
            />
          </div>
          
          {/* Right Column (8/12 width on desktop): Selected Member Details */}
          <div className="lg:col-span-8">
            <MemberSpotlight activeMember={activeMember} />
          </div>
          
        </div>
      </section>

      {/* === 7. CTA FOOTER === */}
      {/* Static banner driving users to the contact section */}
      <TeamCTA />

    </div>
  );
};

export default Team;