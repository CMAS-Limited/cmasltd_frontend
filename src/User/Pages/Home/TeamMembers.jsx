import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient'; 
import TeamCard from '../../Components/UI/MemberCard';
import { ArrowRight, Users, Loader2 } from 'lucide-react';

const Team = () => {
  const [team, setTeam] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchActiveTeam();
  }, []);

  const fetchActiveTeam = async () => {
    try {
      // Fetch only active members, ordered by creation date (or you can add a 'sort_order' column later)
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Map the backend database columns to the prop names your TeamCard expects
      const formattedTeam = data.map(member => ({
        id: member.id,
        name: member.name,
        role: member.role,
        // Safely format the accreditation array into a comma-separated string for the UI
        qualifications: Array.isArray(member.accreditation) ? member.accreditation.join(', ') : (member.accreditation || ''),
        image: member.image_url || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop', // Fallback image
        bio: member.bio,
        linkedin: member.linkin,
        email: "#" // Placeholder since email wasn't in the original backend schema
      }));

      setTeam(formattedTeam || []);
    } catch (error) {
      console.error("Error fetching team:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Graceful loading state
  if (isLoading) {
    return (
      <section id="team" className="py-24 bg-gray-50 flex justify-center items-center min-h-[500px]">
        <div className="flex flex-col items-center gap-3 text-teal-600">
          <Loader2 className="w-8 h-8 animate-spin" />
          <p className="text-xs font-bold uppercase tracking-widest">Loading Personnel...</p>
        </div>
      </section>
    );
  }

  // Graceful empty state (hides section if no active members exist)
  if (!team || team.length === 0) {
    return null;
  }

  return (
    <section id="team" className="py-24 bg-gray-50 overflow-hidden relative">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-50 rounded-full blur-3xl opacity-60 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gray-200 rounded-full blur-3xl opacity-60 -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* === HEADER SECTION === */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          
          {/* LEFT: Title */}
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

        {/* === CARDS === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Team;