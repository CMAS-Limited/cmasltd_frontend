import React from 'react';
import { Edit3, Trash2, Layers, CheckCircle } from 'lucide-react';

const ServiceCard = ({ service, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm group hover:shadow-md transition-all flex flex-col relative">

      <div className="h-48 bg-gray-100 relative overflow-hidden flex items-center justify-center shrink-0">
        {service.image_url ? (
          <img src={service.image_url} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <Layers className="w-12 h-12 text-gray-300" />
        )}
        {service.short_title && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-gray-900">
            {service.short_title}
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">
          {service.title}
        </h3>
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {service.description}
        </p>

        {service.features && service.features.length > 0 && (
          <div className="flex flex-col gap-1 mb-4 flex-1">
            {service.features.slice(0, 3).map((feature, idx) => (
              <span key={idx} className="text-[10px] text-gray-500 flex items-center gap-1 truncate">
                <CheckCircle className="w-3 h-3 text-teal-500" /> {feature}
              </span>
            ))}
            {service.features.length > 3 && (
              <span className="text-[10px] text-gray-400 italic">+{service.features.length - 3} more...</span>
            )}
          </div>
        )}
        
        <div className="flex items-center gap-2 pt-4 border-t border-gray-50 mt-auto">
          <button onClick={() => onEdit(service)} className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-50 text-gray-700 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-teal-50 hover:text-teal-700 transition-colors">
            <Edit3 className="w-3.5 h-3.5" /> Edit
          </button>
          <button onClick={() => onDelete(service.id)} className="p-2 text-gray-400 bg-gray-50 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;