import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../supabaseClient';
import { LogOut, User, Menu } from 'lucide-react'; // Added Menu icon

const AdminTopbar = ({ setIsSidebarOpen }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <header className="h-20 bg-white/90 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
      
      <div className="flex items-center gap-4">
        {/* Hamburger Menu (Hidden on Desktop) */}
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg md:hidden transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        {/* Title (Hidden on very tiny screens to save space) */}
        <h1 className="text-base md:text-lg font-bold text-gray-900 tracking-wide hidden sm:block">
          Admin Workspace
        </h1>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        {/* User Profile Tag (Hidden on mobile to keep header clean) */}
        <div className="hidden md:flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
          <User className="w-4 h-4 text-teal-600" />
          <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Authorized User</span>
        </div>

        {/* Egress Button */}
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors duration-200 text-xs font-bold uppercase tracking-widest bg-gray-50 md:bg-transparent p-2 md:p-0 rounded-lg"
        >
          <LogOut className="w-5 h-5 md:w-4 md:h-4" />
          <span className="hidden md:inline">Terminate Session</span>
        </button>
      </div>
    </header>
  );
};

export default AdminTopbar;