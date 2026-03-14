import React from 'react';
import { Edit3, Trash2, User, Linkedin, Award, Tag } from 'lucide-react';

const TeamCard = ({ member, onEdit, onDelete }) => {
  return (
    <div className={`bg-white rounded-2xl border ${member.is_active ? 'border-gray-100' : 'border-red-200 opacity-70'} overflow-hidden shadow-sm group hover:shadow-md transition-all flex flex-col relative`}>
      
      {!member.is_active && (
        <div className="absolute top-3 left-3 bg-red-100 text-red-700 text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded z-10">
          Inactive
        </div>
      )}

      <div className="h-64 bg-gray-100 relative overflow-hidden flex items-center justify-center shrink-0">
        {member.image_url ? (
          <img src={member.image_url} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <User className="w-12 h-12 text-gray-300" />
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base font-bold text-gray-900 mb-1 truncate flex items-center gap-2">
          {member.name}
        </h3>
        <p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest mb-2 truncate">{member.role}</p>
        
        <div className="flex flex-col gap-1 mb-3">
          {member.category && <span className="text-[10px] text-gray-500 flex items-center gap-1 truncate"><Tag className="w-3 h-3" /> {member.category}</span>}
          {member.accreditation && <span className="text-[10px] text-gray-500 flex items-center gap-1 truncate"><Award className="w-3 h-3" /> {member.accreditation}</span>}
        </div>

        <p className="text-xs text-gray-500 line-clamp-3 mb-4 flex-1">{member.bio}</p>
        
        <div className="flex items-center gap-3 mb-4">
          {member.linkin && <a href={member.linkin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-teal-600"><Linkedin className="w-4 h-4" /></a>}
        </div>
        
        <div className="flex items-center gap-2 pt-4 border-t border-gray-50 mt-auto">
          <button onClick={() => onEdit(member)} className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-50 text-gray-700 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-teal-50 hover:text-teal-700 transition-colors">
            <Edit3 className="w-3.5 h-3.5" /> Edit
          </button>
          <button onClick={() => onDelete(member.id)} className="p-2 text-gray-400 bg-gray-50 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;