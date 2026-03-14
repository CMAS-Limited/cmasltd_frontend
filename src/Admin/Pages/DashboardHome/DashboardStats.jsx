import React from 'react';
import { Users, Briefcase, Layers, MessageSquare } from 'lucide-react';

const DashboardStats = ({ inquiryCount, projectCount, serviceCount, teamCount, isLoading }) => {
  const stats = [
    { label: 'Total Projects', value: isLoading ? '...' : projectCount, icon: <Briefcase className="w-5 h-5 text-blue-600" />, bg: 'bg-blue-50' },
    { label: 'Active Services', value: isLoading ? '...' : serviceCount, icon: <Layers className="w-5 h-5 text-purple-600" />, bg: 'bg-purple-50' },
    { label: 'Team Members', value: isLoading ? '...' : teamCount, icon: <Users className="w-5 h-5 text-orange-600" />, bg: 'bg-orange-50' },
    { label: 'Total Inquiries', value: isLoading ? '...' : inquiryCount, icon: <MessageSquare className="w-5 h-5 text-teal-600" />, bg: 'bg-teal-50' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${stat.bg}`}>
            {stat.icon}
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;