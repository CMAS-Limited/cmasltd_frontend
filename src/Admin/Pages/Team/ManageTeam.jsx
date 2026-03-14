import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';
import { Loader2, Plus, User } from 'lucide-react';
import TeamCard from './TeamCard';
import TeamFormModal from './TeamFormModal';

const ManageTeam = () => {
  const [team, setTeam] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // High-level UI State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setTeam(data || []);
    } catch (error) {
      console.error("Fetch Error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (member = null) => {
    setEditingMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMember(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Confirm deletion of personnel record. Data cannot be recovered.")) return;
    try {
      const { error } = await supabase.from('team_members').delete().eq('id', id);
      if (error) throw error;
      setTeam(team.filter(m => m.id !== id));
    } catch (error) {
      console.error("Deletion Error:", error.message);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto relative">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-wide mb-1 font-display uppercase">Personnel Directory</h1>
          <p className="text-sm text-gray-500">Manage organizational chart and staff profiles.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200 w-fit"
        >
          <Plus className="w-4 h-4" /> Add Personnel
        </button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
          <p className="text-xs uppercase tracking-widest font-bold">Retrieving Records...</p>
        </div>
      ) : team.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-20 flex flex-col items-center justify-center text-center">
          <User className="w-12 h-12 text-gray-200 mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">No Personnel Found</h3>
          <p className="text-sm text-gray-500 max-w-sm mb-6">Database array is empty. Initialize personnel to populate.</p>
          <button onClick={() => handleOpenModal()} className="text-teal-600 font-bold text-xs uppercase tracking-widest hover:text-teal-700">
            + Initialize First Record
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <TeamCard 
              key={member.id} 
              member={member} 
              onEdit={handleOpenModal} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}

      <TeamFormModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        initialData={editingMember} 
        onSuccess={fetchTeam} 
      />

    </div>
  );
};

export default ManageTeam;