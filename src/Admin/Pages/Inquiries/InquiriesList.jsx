import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';
import { Loader2, Mail } from 'lucide-react';
import InquiryRow from './InquiryRow';
import InquiryModal from './InquiryModal';

const InquiriesList = () => {
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBrief, setSelectedBrief] = useState(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('contact_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInquiries(data || []);
    } catch (error) {
      console.error("Error fetching inquiries:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Confirm deletion of this inquiry. Data cannot be recovered.")) return;

    try {
      const { error } = await supabase.from('contact_inquiries').delete().eq('id', id);
      if (error) throw error;
      
      setInquiries(inquiries.filter(inquiry => inquiry.id !== id));
      if (selectedBrief?.id === id) setSelectedBrief(null);
      
    } catch (error) {
      console.error("Deletion Error:", error.message);
      alert("System Failure: Unable to delete inquiry.");
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto relative">
      
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-wide mb-1 font-display uppercase">Client Inquiries</h1>
        <p className="text-sm text-gray-500">Review and manage incoming project briefs and contact requests.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        
        <div className="hidden md:grid grid-cols-12 gap-4 p-6 bg-gray-50 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <div className="col-span-3">Client Name</div>
          <div className="col-span-4">Subject / Company</div>
          <div className="col-span-3">Date Received</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        <div className="flex flex-col divide-y divide-gray-50">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
              <p className="text-xs uppercase tracking-widest font-bold">Retrieving Records...</p>
            </div>
          ) : inquiries.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
              <Mail className="w-12 h-12 text-gray-200 mb-2" />
              <p className="text-xs uppercase tracking-widest font-bold">No Records Found</p>
            </div>
          ) : (
            inquiries.map((inquiry) => (
              <InquiryRow 
                key={inquiry.id} 
                inquiry={inquiry} 
                onRead={setSelectedBrief} 
                onDelete={handleDelete} 
              />
            ))
          )}
        </div>
      </div>

      <InquiryModal 
        brief={selectedBrief} 
        onClose={() => setSelectedBrief(null)} 
      />

    </div>
  );
};

export default InquiriesList;