import React, { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

const FormError = ({ message, clearError }) => {
  // Auto-dismiss the toast after 5 seconds to keep the UI clean
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        if (clearError) clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, clearError]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] max-w-sm bg-white border-l-4 border-red-500 shadow-2xl rounded-xl p-4 flex items-start gap-3 animate-in slide-in-from-bottom-8 fade-in duration-300">
      <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
      
      <div className="flex-1">
        <h4 className="text-sm font-bold text-gray-900 mb-1 tracking-wide">Action Required</h4>
        <p className="text-xs text-gray-600 leading-relaxed">{message}</p>
      </div>

      <button 
        onClick={clearError} 
        className="text-gray-400 hover:text-gray-900 transition-colors shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default FormError;