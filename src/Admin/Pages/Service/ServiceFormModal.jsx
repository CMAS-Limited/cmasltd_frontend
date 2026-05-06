import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';
import { Loader2, X, Upload } from 'lucide-react';
import FormError from '../../Components/Shared/FormError'; 

const translateError = (errorMsg) => {
  const msg = errorMsg.toLowerCase();
  if (msg.includes('malformed array literal')) return "There was a formatting issue with your list. Please check the features section.";
  if (msg.includes('not-null constraint') || msg.includes('null value in column')) {
    if (msg.includes('image_url')) return "A background cover image is strictly required to save this service.";
    if (msg.includes('features')) return "You must provide at least one key feature.";
    return "The database rejected the save because a required piece of information is missing.";
  }
  if (msg.includes('bucket not found')) return "System configuration error: The image storage folder is missing on the server.";
  return "An unexpected server error occurred while saving. Please try again.";
};

const ServiceFormModal = ({ isOpen, onClose, initialData, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null); 
  const [selectedFile, setSelectedFile] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '', short_title: '', icon_name: '', description: '', long_description: '', features: ''
  });

  useEffect(() => {
    if (isOpen) {
      setErrorMessage(null); 
      if (initialData) {
        setExistingImage(initialData.image_url);
        setFormData({
          title: initialData.title || '',
          short_title: initialData.short_title || '',
          icon_name: initialData.icon_name || '',
          description: initialData.description || '',
          long_description: initialData.long_description || '',
          // THE FIX: Join array items with a newline character instead of a comma
          features: Array.isArray(initialData.features) ? initialData.features.join('\n') : (initialData.features || '')
        });
      } else {
        setExistingImage(null);
        setSelectedFile(null);
        setFormData({ title: '', short_title: '', icon_name: '', description: '', long_description: '', features: '' });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setErrorMessage(null); 
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setErrorMessage(null);
    if (e.target.files && e.target.files.length > 0) setSelectedFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!selectedFile) return ''; 
    const fileExt = selectedFile.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    
    const { error } = await supabase.storage.from('service-images').upload(fileName, selectedFile);
    if (error) throw error;
    
    const { data } = supabase.storage.from('service-images').getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    // 1. ABSOLUTE STRICT VALIDATION MATRIX
    if (
      !formData.title.trim() || 
      !formData.short_title.trim() || 
      !formData.icon_name.trim() || 
      !formData.description.trim() || 
      !formData.long_description.trim() || 
      !formData.features.trim()
    ) {
      setErrorMessage("Validation Failed: Every text field, including the icon name, is mandatory and must be filled out.");
      return; 
    }

    // 2. IMAGE VALIDATION
    if (!existingImage && !selectedFile) {
      setErrorMessage("Validation Failed: A background cover image is required to save this service.");
      return;
    }

    setIsSubmitting(true);

    try {
      let finalImageUrl = existingImage || ''; 
      if (selectedFile) finalImageUrl = await uploadImage();

      const payload = { 
        title: formData.title.trim(),
        short_title: formData.short_title.trim(),
        icon_name: formData.icon_name.trim(),
        description: formData.description.trim(),
        long_description: formData.long_description.trim(),
        // THE FIX: Split by newline (\n), trim extra spaces, and remove any empty lines
        features: formData.features ? formData.features.split('\n').map(s => s.trim()).filter(Boolean) : [], 
        image_url: finalImageUrl
      };

      if (initialData?.id) {
        const { error } = await supabase.from('services').update(payload).eq('id', initialData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('services').insert([payload]);
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
            {initialData ? 'Modify Service Data' : 'Initialize New Service'}
          </h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 bg-white rounded-lg transition-colors border border-gray-200">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto flex flex-col gap-6">
          
          <FormError message={errorMessage} clearError={() => setErrorMessage(null)} />

          <form id="service-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Service Title *</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-teal-600 transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Short Title *</label>
                <input type="text" name="short_title" value={formData.short_title} onChange={handleInputChange} required className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-teal-600 transition-colors" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Icon Name *</label>
              <input 
                type="text" 
                name="icon_name" 
                value={formData.icon_name} 
                onChange={handleInputChange} 
                required 
                className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-teal-600 transition-colors" 
                placeholder="e.g., 'Compass' or 'lucide-gavel'" 
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Primary Description *</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} required rows="3" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-teal-600 transition-colors resize-none"></textarea>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Long Description *</label>
              <textarea name="long_description" value={formData.long_description} onChange={handleInputChange} required rows="4" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-teal-600 transition-colors resize-none"></textarea>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Key Features (One per line) *</label>
              <textarea 
                name="features" 
                value={formData.features} 
                onChange={handleInputChange} 
                required 
                rows="8" 
                className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-teal-600 transition-colors resize-y"
                placeholder="Preparation of the project execution plan.&#10;Tendering management and tender negotiations.&#10;Management of the initial mobilization stages..."
              ></textarea>
            </div>

            <div className="flex flex-col gap-4 p-4 border border-dashed border-gray-300 rounded-xl bg-gray-50/50">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Upload className="w-3 h-3" /> Background Cover Image *
                </label>
                <span className="text-[10px] text-gray-500">This image will be used as the visual background for the service card.</span>
              </div>
              <div className="flex items-center gap-4">
                {(selectedFile || existingImage) && (
                  <div className="w-16 h-16 rounded overflow-hidden border-2 border-teal-500 shrink-0">
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
          <button form="service-form" type="submit" disabled={isSubmitting} className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-70 min-w-[140px]">
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Execute Commit'}
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default ServiceFormModal;