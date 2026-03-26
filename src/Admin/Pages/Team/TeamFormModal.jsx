import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';
import { Loader2, X, Upload } from 'lucide-react';
import FormError from '../../Components/Shared/FormError';

// --- ERROR TRANSLATOR ---
const translateError = (errorMsg) => {
  const msg = errorMsg.toLowerCase();
  if (msg.includes('malformed array literal')) return "There was a formatting issue with your comma-separated lists. Please check your entries.";
  if (msg.includes('not-null constraint') || msg.includes('null value in column')) {
    if (msg.includes('image_url')) return "A profile image is strictly required to save this record.";
    return "The database rejected the save because a required piece of information is missing.";
  }
  if (msg.includes('bucket not found')) return "System configuration error: The image storage folder is missing on the server.";
  return "An unexpected server error occurred while saving. Please try again.";
};

const TeamFormModal = ({ isOpen, onClose, initialData, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null); 
  const [selectedFile, setSelectedFile] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '', role: '', category: '', accreditation: '', bio: '', linkin: '', focus_areas: '', is_active: true
  });

  useEffect(() => {
    if (isOpen) {
      setErrorMessage(null); 
      if (initialData) {
        setExistingImage(initialData.image_url);
        setFormData({
          name: initialData.name || '',
          role: initialData.role || '',
          category: initialData.category || '',
          accreditation: Array.isArray(initialData.accreditation) ? initialData.accreditation.join(', ') : (initialData.accreditation || ''),
          bio: initialData.bio || '',
          linkin: initialData.linkin || '',
          focus_areas: Array.isArray(initialData.focus_areas) ? initialData.focus_areas.join(', ') : (initialData.focus_areas || ''),
          is_active: initialData.is_active !== false 
        });
      } else {
        setExistingImage(null);
        setSelectedFile(null);
        setFormData({ name: '', role: '', category: '', accreditation: '', bio: '', linkin: '', focus_areas: '', is_active: true });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setErrorMessage(null); 
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleFileChange = (e) => {
    setErrorMessage(null);
    if (e.target.files && e.target.files.length > 0) setSelectedFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!selectedFile) return ''; 
    const fileExt = selectedFile.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    
    const { error } = await supabase.storage.from('team-images').upload(fileName, selectedFile);
    if (error) throw error;
    
    const { data: publicUrlData } = supabase.storage.from('team-images').getPublicUrl(fileName);
    return publicUrlData.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    // 1. ABSOLUTE STRICT VALIDATION MATRIX (Every field is mandatory)
    if (
      !formData.name.trim() || 
      !formData.role.trim() || 
      !formData.category.trim() || 
      !formData.accreditation.trim() || 
      !formData.linkin.trim() || 
      !formData.bio.trim() || 
      !formData.focus_areas.trim()
    ) {
      setErrorMessage("Validation Failed: Every text field is mandatory and must be filled out.");
      return; 
    }

    // 2. IMAGE VALIDATION
    if (!existingImage && !selectedFile) {
      setErrorMessage("Validation Failed: A profile image is required to save this personnel record.");
      return;
    }

    setIsSubmitting(true);

    try {
      let finalImageUrl = existingImage || ''; 
      if (selectedFile) finalImageUrl = await uploadImage();

      // Safe Payload Generation: Fallback to empty strings to prevent JS `.trim()` crashes
      const payload = { 
        name: (formData.name || '').trim(),
        role: (formData.role || '').trim(),
        category: (formData.category || '').trim(),
        accreditation: formData.accreditation ? formData.accreditation.split(',').map(s => s.trim()).filter(Boolean) : [],
        bio: (formData.bio || '').trim(),
        linkin: (formData.linkin || '').trim(),
        focus_areas: formData.focus_areas ? formData.focus_areas.split(',').map(s => s.trim()).filter(Boolean) : [],
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
      console.error("Backend Error Log:", error.message);
      setErrorMessage(translateError(error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
          <h3 className="text-lg font-bold text-gray-900 uppercase tracking-widest">
            {initialData ? 'Modify Personnel Data' : 'Initialize New Personnel'}
          </h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 bg-white rounded-lg transition-colors border border-gray-200">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto flex flex-col gap-6">
          
          <FormError message={errorMessage} clearError={() => setErrorMessage(null)} />

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
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category *</label>
                <input type="text" name="category" value={formData.category} onChange={handleInputChange} required className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-teal-600 transition-colors" placeholder="e.g. Leadership, Engineering" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Accreditation (Comma Separated) *</label>
                <input type="text" name="accreditation" value={formData.accreditation} onChange={handleInputChange} required className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-teal-600 transition-colors" placeholder="e.g. PhD, PE, AIA" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">LinkedIn URL *</label>
              <input type="text" name="linkin" value={formData.linkin} onChange={handleInputChange} required className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-teal-600 transition-colors" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Biography *</label>
              <textarea name="bio" value={formData.bio} onChange={handleInputChange} required rows="3" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-teal-600 transition-colors resize-none"></textarea>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Focus Areas (Comma Separated) *</label>
              <textarea name="focus_areas" value={formData.focus_areas} onChange={handleInputChange} required rows="2" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-teal-600 transition-colors resize-none" placeholder="e.g. Structural Design, Urban Planning"></textarea>
            </div>

            <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl bg-gray-50">
              <input type="checkbox" id="is_active" name="is_active" checked={formData.is_active} onChange={handleInputChange} className="w-4 h-4 text-teal-600 bg-white border-gray-300 rounded focus:ring-teal-500" />
              <label htmlFor="is_active" className="text-sm font-bold text-gray-700 uppercase tracking-widest">Active Status (Visible on Site)</label>
            </div>

            <div className="flex flex-col gap-4 p-4 border border-dashed border-gray-300 rounded-xl bg-gray-50/50">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Upload className="w-3 h-3" /> Profile Image *
              </label>
              <div className="flex items-center gap-4">
                {(selectedFile || existingImage) && (
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-teal-500 shrink-0">
                    <img src={selectedFile ? URL.createObjectURL(selectedFile) : existingImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-widest file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 transition-colors cursor-pointer" />
              </div>
            </div>
          </form>
        </div>

        <div className="px-8 py-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0">
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