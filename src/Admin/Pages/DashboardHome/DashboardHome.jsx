import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';

// Import sub-components
import DashboardStats from './DashboardStats';
import RecentInquiriesPanel from './RecentInquiriesPanel';
import QuickActionsPanel from './QuickActionsPanel';
const DashboardHome = () => {
  const [inquiryCount, setInquiryCount] = useState(0);
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // 1. Get total count of inquiries
      const { count, error: countError } = await supabase
        .from('contact_inquiries')
        .select('*', { count: 'exact', head: true });
      
      if (countError) throw countError;
      setInquiryCount(count || 0);

      // 2. Get the 3 most recent inquiries
      const { data: recent, error: recentError } = await supabase
        .from('contact_inquiries')
        .select('id, full_name, company_subject, created_at')
        .order('created_at', { ascending: false })
        .limit(3);

      if (recentError) throw recentError;
      setRecentInquiries(recent || []);

    } catch (error) {
      console.error("Error fetching dashboard data:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-wide mb-1 font-display uppercase">Overview</h1>
        <p className="text-sm text-gray-500">Welcome to the CMAS administrative workspace.</p>
      </div>

      {/* Stats Grid Module */}
      <DashboardStats 
        inquiryCount={inquiryCount} 
        isLoading={isLoading} 
      />

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Inquiries Module */}
        <RecentInquiriesPanel 
          recentInquiries={recentInquiries} 
          isLoading={isLoading} 
        />

        {/* Quick Actions Module */}
        <QuickActionsPanel />

      </div>
    </div>
  );
};

export default DashboardHome;