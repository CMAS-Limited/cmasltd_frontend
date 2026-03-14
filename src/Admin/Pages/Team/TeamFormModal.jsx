import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';
import { Loader2, X, Upload } from 'lucide-react';

const TeamFormModal = ({ isOpen, onClose, initialData, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '', 
    role: '', 
    category: '', 
    accreditation: '', 
    bio: '', 
    linkin: '',
    focus_areas: '',
    is_active: true
  });

  // Sync incoming data to local state
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setExistingImage(initialData.image_url);
        setFormData({
          name: initialData.name || '',
          role: initialData.role || '',
          category: initialData.category || '',
          accreditation: initialData.accreditation || '',
          bio: initialData.bio || '',
          linkin: initialData.linkin || '',
          focus_areas: initialData.focus_areas ? initialData.focus_areas.join(', ') : '',
          is_active: initialData.is_active !== false // Defaults to true unless strictly false
        });
      } else {
        setExistingImage(null);
        setSelectedFile(null);
        setFormData({ 
          name: '', role: '', category: '', accreditation: '', bio: '', linkin: '', focus_areas: '', is_active: true 
        });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const uploadImage = async () => {
    if (!selectedFile) return null;

    const fileExt = selectedFile.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    
    const { error } = await supabase.storage.from('team-images').upload(fileName, selectedFile);
    if (error) throw error;
    
    const { data: publicUrlData } = supabase.storage.from('team-images').getPublicUrl(fileName);
    return publicUrlData.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let finalImageUrl = existingImage;
      if (selectedFile) {
        finalImageUrl = await uploadImage();
      }

      // Format payload to exactly match Supabase schema
      const payload = { 
        name: formData.name,
        role: formData.role,
        category: formData.category,
        accreditation: formData.accreditation,
        bio: formData.bio,
        linkin: formData.linkin,
        focus_areas: formData.focus_areas.split(',').map(s => s.trim()).filter(Boolean),
        is_active: formData.is_active,
        image_url: finalImageUrl
      };

      if (initialData?.id) {
        const { error } = await supabase.from('team_members').update(payload).eq('id', initialData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('team_members').insert([payload]);
        if (error) throw error;
      }
      
      onSuccess(); 
      onClose();   
    } catch (error) {
      console.error("Commit Error:", error.message);
      alert("System Failure: Check console for data rejection details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="text-lg font-bold text-gray-900 uppercase tracking-widest">
            {initialData ? 'Modify Personnel Data' : 'Initialize New Personnel'}
          </h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 bg-white rounded-lg transition-colors border border-gray-200">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto">
          <form id="team-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-teal-600 transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Role *</label>
                <input type="text" name="role" value={formData.role} onChange={handleInputChange} required className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-teal-600 transition-colors" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</label>
                <input type="text" name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-teal-600 transition-colors" placeholder="e.g. Leadership, Engineering" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Accreditation</label>
                <input type="text" name="accreditation" value={formData.accreditation} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-teal-600 transition-colors" placeholder="e.g. PhD, PE, AIA" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">LinkedIn URL</label>
              <input type="text" name="linkin" value={formData.linkin} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-teal-600 transition-colors" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Biography</label>
              <textarea name="bio" value={formData.bio} onChange={handleInputChange} rows="3" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-teal-600 transition-colors resize-none"></textarea>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Focus Areas (Comma Separated)</label>
              <textarea name="focus_areas" value={formData.focus_areas} onChange={handleInputChange} rows="2" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-teal-600 transition-colors resize-none" placeholder="e.g. Structural Design, Urban Planning"></textarea>
            </div>

            <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl bg-gray-50">
              <input 
                type="checkbox" 
                id="is_active" 
                name="is_active" 
                checked={formData.is_active} 
                onChange={handleInputChange}
                className="w-4 h-4 text-teal-600 bg-white border-gray-300 rounded focus:ring-teal-500"
              />
              <label htmlFor="is_active" className="text-sm font-bold text-gray-700 uppercase tracking-widest">Active Status (Visible on Site)</label>
            </div>

            <div className="flex flex-col gap-4 p-4 border border-dashed border-gray-300 rounded-xl bg-gray-50/50">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Upload className="w-3 h-3" /> Profile Image
              </label>
              <div className="flex items-center gap-4">
                {(selectedFile || existingImage) && (
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-teal-500 shrink-0">
                    <img 
                      src={selectedFile ? URL.createObjectURL(selectedFile) : existingImage} 
                      alt="Preview" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                )}
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange} 
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-widest file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 transition-colors cursor-pointer" 
                />
              </div>
            </div>

          </form>
        </div>

        <div className="px-8 py-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button onClick={onClose} type="button" className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors">Abort</button>
          <button form="team-form" type="submit" disabled={isSubmitting} className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-70 min-w-[140px]">
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Execute Commit'}
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default TeamFormModal;