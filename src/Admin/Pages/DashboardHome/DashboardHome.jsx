import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';

// Import sub-components
import DashboardStats from './DashboardStats';
import RecentInquiriesPanel from './RecentInquiriesPanel';
import QuickActionsPanel from './QuickActionsPanel';

const DashboardHome = () => {
  // State for all numerical statistics
  const [inquiryCount, setInquiryCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [serviceCount, setServiceCount] = useState(0);
  const [teamCount, setTeamCount] = useState(0);
  
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // Execute all count queries concurrently for maximum performance
      const [
        { count: inquiries },
        { count: projects },
        { count: services },
        { count: team }
      ] = await Promise.all([
        supabase.from('contact_inquiries').select('*', { count: 'exact', head: true }),
        supabase.from('portfolio_projects').select('*', { count: 'exact', head: true }),
        supabase.from('services').select('*', { count: 'exact', head: true }),
        supabase.from('team_members').select('*', { count: 'exact', head: true })
      ]);

      setInquiryCount(inquiries || 0);
      setProjectCount(projects || 0);
      setServiceCount(services || 0);
      setTeamCount(team || 0);

      // Fetch the 3 most recent inquiries for the feed
      const { data: recent, error: recentError } = await supabase
        .from('contact_inquiries')
        .select('id, full_name, company_subject, created_at')
        .order('created_at', { ascending: false })
        .limit(3);

      if (recentError) throw recentError;
      setRecentInquiries(recent || []);

    } catch (error) {
      console.error("Data Extraction Error:", error.message);
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

      {/* Stats Grid Module with live data injection */}
      <DashboardStats 
        inquiryCount={inquiryCount} 
        projectCount={projectCount}
        serviceCount={serviceCount}
        teamCount={teamCount}
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