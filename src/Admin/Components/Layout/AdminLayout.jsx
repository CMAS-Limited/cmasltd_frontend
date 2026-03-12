import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';

const AdminLayout = () => {
  // State to track if the mobile sidebar is open or closed
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-gray-900">
      
      {/* Pass the state to the Sidebar so it knows when to slide in */}
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Area: md:ml-64 ensures it only pushes right on desktop */}
      <div className="flex-1 flex flex-col md:ml-64 min-w-0 transition-all duration-300">
        
        {/* Pass the state to the Topbar so it can trigger the menu */}
        <AdminTopbar setIsSidebarOpen={setIsSidebarOpen} />

        <main className="flex-1 p-4 md:p-8 overflow-x-hidden w-full">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;