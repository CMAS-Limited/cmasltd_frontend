import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';
import { Loader2, Plus, Layers } from 'lucide-react';
import ServiceCard from './ServiceCard';
import ServiceFormModal from './ServiceFormModal';

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error("Fetch Error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (service = null) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Confirm deletion of service record. Data cannot be recovered.")) return;
    try {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) throw error;
      setServices(services.filter(s => s.id !== id));
    } catch (error) {
      console.error("Deletion Error:", error.message);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto relative">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-wide mb-1 font-display uppercase">Services Master List</h1>
          <p className="text-sm text-gray-500">Manage company offerings, capabilities, and feature sets.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200 w-fit"
        >
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
          <p className="text-xs uppercase tracking-widest font-bold">Retrieving Architecture...</p>
        </div>
      ) : services.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-20 flex flex-col items-center justify-center text-center">
          <Layers className="w-12 h-12 text-gray-200 mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">No Services Found</h3>
          <p className="text-sm text-gray-500 max-w-sm mb-6">Database array is empty. Initialize an offering to populate.</p>
          <button onClick={() => handleOpenModal()} className="text-teal-600 font-bold text-xs uppercase tracking-widest hover:text-teal-700">
            + Initialize First Service
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              onEdit={handleOpenModal} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}

      <ServiceFormModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        initialData={editingService} 
        onSuccess={fetchServices} 
      />

    </div>
  );
};

export default ManageServices;