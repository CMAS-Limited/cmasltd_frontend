// src/User/Components/Sections/Team.jsx
import React from 'react';
import TeamCard from '../../Components/UI/MemberCard';
import { ArrowRight, Users } from 'lucide-react';

const Team = () => {
  const team = [
    {
      name: "QS. Robert Mathenge",
      role: "Managing Partner",
      qualifications: "MAAK (QS), CIArb",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop", 
      bio: "A leading expert in construction arbitration and dispute resolution with over 20 years of experience managing high-value infrastructure projects across East Africa.",
      linkedin: "#",
      email: "mailto:robert@cmas.co.ke"
    },
    {
      name: "Sarah Kamau",
      role: "Senior Project Manager",
      qualifications: "PMP, B.Arch",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
      bio: "Specializes in large-scale commercial developments, ensuring seamless integration between design teams and onsite execution.",
      linkedin: "#",
      email: "#"
    },
    {
      name: "Eng. David Omondi",
      role: "Lead Structural Engineer",
      qualifications: "EBK, IEK",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
      bio: "Expert in structural integrity and civil engineering, overseeing the technical compliance of all our infrastructure portfolios.",
      linkedin: "#",
      email: "#"
    },
    {
      name: "Michelle Wanjiku",
      role: "Head of Contract Admin",
      qualifications: "LLB, MCIArb",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
      bio: "A legal specialist in construction contracts, safeguarding client interests through rigorous risk analysis and claims management.",
      linkedin: "#",
      email: "#"
    }
  ];

  return (
    <section id="team" className="py-24 bg-gray-50 overflow-hidden relative">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-50 rounded-full blur-3xl opacity-60 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gray-200 rounded-full blur-3xl opacity-60 -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* === HEADER SECTION === */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          
          {/* LEFT: Title (With your specified Left Padding) */}
          <div className="lg:col-span-5 md:pl-12 lg:pl-16">
             <div className="inline-flex items-center gap-2 mb-3">
                <div className="h-px w-8 bg-teal-600"></div>
                <span className="text-teal-700 font-bold tracking-widest uppercase text-xs">
                  Our Leadership
                </span>
             </div>
             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-display leading-[1.1]">
               Meet the <br /> <span className="text-teal-600">Experts</span>
             </h2>
          </div>

          {/* RIGHT: Description + Button */}
          <div className="lg:col-span-7 lg:col-start-6 flex flex-col items-start pt-4">
            <p className="text-gray-500 text-sm md:text-lg leading-relaxed mb-8 w-full">
              Our team combines decades of experience in quantity surveying, engineering, and dispute resolution to deliver world-class project management. We are dedicated to precision, integrity, and results.
            </p>
            
            <a href="#" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-200 text-gray-800 text-xs font-bold uppercase tracking-wider shadow-sm hover:border-teal-600 hover:text-teal-600 transition-all duration-300 group">
              <Users className="w-3.5 h-3.5 text-gray-400 group-hover:text-teal-600" />
              Meet the Full Team
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

        </div>

        {/* === CARDS (Now using the interactive component) === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <TeamCard key={index} member={member} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Team;