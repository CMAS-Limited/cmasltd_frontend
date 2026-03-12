import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';
import { Loader2, Plus, Briefcase } from 'lucide-react';
import PortfolioCard from './PortfolioCard';
import PortfolioFormModal from './PortfolioFormModal';

const ManagePortfolio = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // High-level UI State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error("Fetch Error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (project = null) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Confirm deletion. Data cannot be recovered.")) return;
    try {
      const { error } = await supabase.from('portfolio_projects').delete().eq('id', id);
      if (error) throw error;
      setProjects(projects.filter(p => p.id !== id));
    } catch (error) {
      console.error("Deletion Error:", error.message);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto relative">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-wide mb-1 font-display uppercase">Portfolio Roster</h1>
          <p className="text-sm text-gray-500">Manage case studies and project records.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200 w-fit"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
          <p className="text-xs uppercase tracking-widest font-bold">Retrieving Architecture...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-20 flex flex-col items-center justify-center text-center">
          <Briefcase className="w-12 h-12 text-gray-200 mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">No Projects Found</h3>
          <p className="text-sm text-gray-500 max-w-sm mb-6">Database array is empty. Initialize project to populate.</p>
          <button onClick={() => handleOpenModal()} className="text-teal-600 font-bold text-xs uppercase tracking-widest hover:text-teal-700">
            + Initialize First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <PortfolioCard 
              key={project.id} 
              project={project} 
              onEdit={handleOpenModal} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}

      <PortfolioFormModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        initialData={editingProject} 
        onSuccess={fetchProjects} 
      />

    </div>
  );
};

export default ManagePortfolio;