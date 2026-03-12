import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Loader2, MessageSquare } from 'lucide-react';

const RecentInquiriesPanel = ({ recentInquiries, isLoading }) => {
  return (
    <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
      <div className="p-6 border-b border-gray-50 flex items-center justify-between">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2">
          <Clock className="w-4 h-4 text-teal-600" />
          Recent Inquiries
        </h2>
        <Link to="/admin/inquiries" className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 uppercase tracking-wider transition-colors">
          View All <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      
      <div className="flex-1 p-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-3 py-10">
            <Loader2 className="w-6 h-6 animate-spin text-teal-600" />
            <p className="text-xs uppercase tracking-widest">Fetching Data...</p>
          </div>
        ) : recentInquiries.length > 0 ? (
          <div className="flex flex-col gap-4">
            {recentInquiries.map((inquiry) => (
              <div key={inquiry.id} className="flex items-start justify-between p-4 rounded-xl border border-gray-50 hover:border-teal-100 hover:bg-teal-50/30 transition-colors group">
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{inquiry.full_name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{inquiry.company_subject}</p>
                </div>
                <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                  {new Date(inquiry.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 py-10">
            <MessageSquare className="w-8 h-8 mb-3 text-gray-200" />
            <p className="text-xs uppercase tracking-widest">No recent inquiries.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentInquiriesPanel;