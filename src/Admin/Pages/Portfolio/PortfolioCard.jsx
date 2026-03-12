import React from 'react';
import { Edit3, Trash2, Image as ImageIcon, MapPin, Calendar } from 'lucide-react';

const PortfolioCard = ({ project, onEdit, onDelete }) => {
  const coverImage = project.images && project.images.length > 0 ? project.images[0] : null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm group hover:shadow-md transition-all flex flex-col">
      <div className="h-48 bg-gray-100 relative overflow-hidden flex items-center justify-center shrink-0">
        {coverImage ? (
          <img src={coverImage} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <ImageIcon className="w-8 h-8 text-gray-300" />
        )}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-gray-900">
          {project.category}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">{project.title}</h3>
        
        <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {project.location || 'N/A'}</span>
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {project.project_year || 'N/A'}</span>
        </div>
        
        <p className="text-xs font-bold text-teal-600 uppercase tracking-widest mb-4 truncate">Role: {project.cmas_role}</p>
        <p className="text-sm text-gray-600 line-clamp-2 mb-6 flex-1">{project.description}</p>
        
        <div className="flex items-center gap-3 pt-4 border-t border-gray-50 mt-auto">
          <button onClick={() => onEdit(project)} className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-50 text-gray-700 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-teal-50 hover:text-teal-700 transition-colors">
            <Edit3 className="w-3.5 h-3.5" /> Edit
          </button>
          <button onClick={() => onDelete(project.id)} className="p-2 text-gray-400 bg-gray-50 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;