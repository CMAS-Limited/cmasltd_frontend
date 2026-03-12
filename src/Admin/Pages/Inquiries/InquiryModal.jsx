import React from 'react';
import { X } from 'lucide-react';

const InquiryModal = ({ brief, onClose }) => {
  if (!brief) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-start bg-gray-50">
          <div>
            <p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest mb-1">Project Brief</p>
            <h3 className="text-xl font-bold text-gray-900 font-display">{brief.company_subject}</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto flex flex-col gap-8">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Originator</p>
              <p className="text-sm font-bold text-gray-900">{brief.full_name}</p>
              <a href={`mailto:${brief.email}`} className="text-sm text-teal-600 hover:underline">{brief.email}</a>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Transmission Date</p>
              <p className="text-sm font-medium text-gray-900">
                {new Date(brief.created_at).toLocaleString('en-US', {
                  dateStyle: 'medium', timeStyle: 'short'
                })}
              </p>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 border-b border-gray-100 pb-2">Message Payload</p>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                {brief.project_brief}
              </p>
            </div>
          </div>
        </div>

        <div className="px-8 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <a 
            href={`mailto:${brief.email}?subject=RE: ${brief.company_subject}`}
            className="px-6 py-2.5 bg-teal-600 text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-teal-700 transition-colors"
          >
            Reply via Email
          </a>
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default InquiryModal;