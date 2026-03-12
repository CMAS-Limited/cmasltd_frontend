import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, Briefcase, Users, Layers, X } from 'lucide-react';

const AdminSidebar = ({ isOpen, setIsOpen }) => {
  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Inquiries', path: '/admin/inquiries', icon: <MessageSquare className="w-5 h-5" /> },
    { name: 'Portfolio', path: '/admin/portfolio', icon: <Briefcase className="w-5 h-5" /> },
    { name: 'Team', path: '/admin/team', icon: <Users className="w-5 h-5" /> },
    { name: 'Services', path: '/admin/services', icon: <Layers className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Mobile Dark Overlay - clicking this closes the sidebar */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-30 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`w-64 bg-white border-r border-gray-100 h-screen flex flex-col fixed left-0 top-0 z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 shadow-2xl md:shadow-none`}>
        
        {/* Brand Header */}
        <div className="h-20 flex items-center justify-between px-6 md:px-8 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-widest uppercase text-gray-900 font-display">
              CMAS
            </h2>
            <img 
              src="/image/cmasLogo.png" 
              alt="CMAS Logo Mark" 
              className="h-8 w-8 object-contain" 
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>

          {/* Mobile Close Button */}
          <button 
            onClick={() => setIsOpen(false)}
            className="md:hidden p-2 -mr-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-8 flex flex-col gap-2 overflow-y-auto">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-2">Menu</p>
          
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)} // Auto-close menu on mobile when clicking a link
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 text-sm font-medium ${
                  isActive 
                    ? 'bg-teal-50 text-teal-700' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

      </aside>
    </>
  );
};

export default AdminSidebar;