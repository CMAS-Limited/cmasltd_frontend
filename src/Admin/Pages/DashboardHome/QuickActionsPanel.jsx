import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Users } from 'lucide-react';

const QuickActionsPanel = () => {
  return (
    <div className="bg-[#0A191C] rounded-2xl border border-gray-800 shadow-lg p-6 text-white flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
      
      <h2 className="text-sm font-bold uppercase tracking-widest mb-6 relative z-10 text-gray-300">Quick Actions</h2>
      
      <div className="flex flex-col gap-3 relative z-10">
        <Link 
          to="/admin/portfolio" 
          className="flex items-center justify-between w-full p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
        >
          <span className="text-xs font-bold tracking-wider uppercase">Manage Projects</span>
          <Briefcase className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
        </Link>
        <Link 
          to="/admin/team" 
          className="flex items-center justify-between w-full p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
        >
          <span className="text-xs font-bold tracking-wider uppercase">Manage Team</span>
          <Users className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default QuickActionsPanel;