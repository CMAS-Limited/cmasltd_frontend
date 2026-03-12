import React from 'react';
import { Building, Calendar, Eye, Trash2 } from 'lucide-react';

const InquiryRow = ({ inquiry, onRead, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6 items-center hover:bg-gray-50/50 transition-colors">
      
      <div className="col-span-3 flex flex-col gap-1">
        <span className="md:hidden text-[10px] font-bold text-gray-400 uppercase tracking-widest">Client Name</span>
        <p className="text-sm font-bold text-gray-900">{inquiry.full_name}</p>
        <a href={`mailto:${inquiry.email}`} className="text-xs text-teal-600 hover:text-teal-700 truncate">
          {inquiry.email}
        </a>
      </div>

      <div className="col-span-4 flex flex-col gap-1">
        <span className="md:hidden text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Subject</span>
        <p className="text-sm text-gray-700 font-medium truncate flex items-center gap-2">
          <Building className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          {inquiry.company_subject}
        </p>
      </div>

      <div className="col-span-3 flex flex-col gap-1">
        <span className="md:hidden text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Date Received</span>
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          {new Date(inquiry.created_at).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
          })}
        </p>
      </div>

      <div className="col-span-2 flex items-center justify-end gap-3 mt-4 md:mt-0 border-t border-gray-100 md:border-0 pt-4 md:pt-0">
        <button 
          onClick={() => onRead(inquiry)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
        >
          <Eye className="w-3.5 h-3.5" /> Read
        </button>
        <button 
          onClick={() => onDelete(inquiry.id)}
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Delete Inquiry"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};

export default InquiryRow;