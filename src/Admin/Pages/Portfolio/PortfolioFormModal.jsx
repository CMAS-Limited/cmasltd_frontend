import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';
import { Loader2, X, Upload } from 'lucide-react';
import FormError from '../../Components/Shared/FormError'; 

const translateError = (errorMsg) => {
  const msg = errorMsg.toLowerCase();
  if (msg.includes('malformed array literal')) return "There was a formatting issue with your comma-separated lists. Please check the features section.";
  if (msg.includes('not-null constraint') || msg.includes('null value in column')) {
    if (msg.includes('images')) return "A cover image is strictly required to save this project.";
    if (msg.includes('mainfeatures')) return "You must provide at least one main feature for this project.";
    if (msg.includes('category')) return "Please select a category for this project.";
    return "The database rejected the save because a required piece of information is missing.";
  }
  if (msg.includes('invalid input syntax for type integer')) return "Please ensure numeric fields (like Project Year) contain only numbers, with no text or symbols.";
  if (msg.includes('bucket not found')) return "System configuration error: The image storage folder is missing on the server.";
  return "An unexpected server error occurred while saving. Please try again.";
};

const PortfolioFormModal = ({ isOpen, onClose, initialData, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null); 
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  
  const [formData, setFormData] = useState({
    title: '', category: 'Commercial', location: '', cmas_role: '', project_year: '', description: '', mainfeatures: ''
  });

  useEffect(() => {
    if (isOpen) {
      setErrorMessage(null); 
      if (initialData) {
        const parsedImages = Array.isArray(initialData.images) 
          ? initialData.images 
          : (initialData.images ? initialData.images.split(',').map(img => img.trim()).filter(Boolean) : []);
          
        setExistingImages(parsedImages);
        setFormData({
          title: initialData.title || '',
          category: initialData.category || '',
          location: initialData.location || '',
          cmas_role: initialData.cmas_role || '',
          project_year: initialData.project_year || '',
          description: initialData.description || '',
          mainfeatures: Array.isArray(initialData.mainfeatures) ? initialData.mainfeatures.join(', ') : (initialData.mainfeatures || ''), 
        });
      } else {
        setExistingImages([]);
        setSelectedFiles([]);
        setFormData({ title: '', category: 'Commercial', location: '', cmas_role: '', project_year: '', description: '', mainfeatures: '' });
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
    const incomingFiles = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...incomingFiles]);
    e.target.value = '';
  };

  const removeSelectedFile = (indexToRemove) => setSelectedFiles(selectedFiles.filter((_, i) => i !== indexToRemove));
  const removeExistingImage = (indexToRemove) => setExistingImages(existingImages.filter((_, i) => i !== indexToRemove));

  const uploadImages = async () => {
    const uploadedUrls = [];
    for (const file of selectedFiles) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const { error } = await supabase.storage.from('portfolio-images').upload(fileName, file);
      if (error) throw error;
      const { data: publicUrlData } = supabase.storage.from('portfolio-images').getPublicUrl(fileName);
      uploadedUrls.push(publicUrlData.publicUrl);
    }
    return uploadedUrls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    // 1. ABSOLUTE STRICT VALIDATION MATRIX
    // Check every single text field to ensure none are empty
    if (
      !formData.title.trim() || 
      !formData.category.trim() || 
      !formData.location.trim() || 
      !formData.cmas_role.trim() || 
      !formData.project_year.trim() || 
      !formData.description.trim() || 
      !formData.mainfeatures.trim()
    ) {
      setErrorMessage("Validation Failed: Every field is mandatory. Please fill out all details before saving.");
      return;
    }
    
    // Check if there are no images
    if (existingImages.length === 0 && selectedFiles.length === 0) {
      setErrorMessage("Validation Failed: Please upload at least one image for this project.");
      return;
    }

    setIsSubmitting(true);

    try {
      let newImageUrls = selectedFiles.length > 0 ? await uploadImages() : [];
      const finalImagesArray = [...existingImages, ...newImageUrls];

      const payload = {
        title: formData.title.trim(),
        category: formData.category.trim(),
        location: formData.location.trim(),
        cmas_role: formData.cmas_role.trim(),
        project_year: formData.project_year.trim(),
        description: formData.description.trim(),
        mainfeatures: formData.mainfeatures.split(',').map(s => s.trim()).filter(Boolean),
        images: finalImagesArray 
      };

      if (initialData?.id) {
        const { error } = await supabase.from('portfolio_projects').update(payload).eq('id', initialData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('portfolio_projects').insert([payload]);
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
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
          <h3 className="text-lg font-bold text-gray-900 uppercase tracking-widest">
            {initialData ? 'Modify Project Data' : 'Initialize New Project'}
          </h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 bg-white rounded-lg transition-colors border border-gray-200">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto flex flex-col gap-6">
          
          <FormError message={errorMessage} clearError={() => setErrorMessage(null)} />

          <form id="portfolio-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Project Title *</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-teal-600 transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category *</label>
                <input type="text" name="category" value={formData.category} onChange={handleInputChange} required className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-teal-600 transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location *</label>
                <input type="text" name="location" value={formData.location} onChange={handleInputChange} required className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-teal-600 transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Project Year *</label>
                <input type="text" name="project_year" value={formData.project_year} onChange={handleInputChange} required className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-teal-600 transition-colors" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">CMAS Role *</label>
              <input type="text" name="cmas_role" value={formData.cmas_role} onChange={handleInputChange} required className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-teal-600 transition-colors" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Description *</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} required rows="3" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-teal-600 transition-colors resize-none"></textarea>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Main Features (Comma Separated) *</label>
              <textarea name="mainfeatures" value={formData.mainfeatures} onChange={handleInputChange} required rows="2" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-teal-600 transition-colors resize-none" placeholder="e.g. 500 Capacity, Smart Lighting, Eco-friendly"></textarea>
            </div>

            <div className="flex flex-col gap-4 p-4 border border-dashed border-gray-300 rounded-xl bg-gray-50/50">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2"><Upload className="w-3 h-3" /> Image Infrastructure *</label>
              
              {existingImages.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 border-b border-gray-200 pb-1">Stored Files:</p>
                  <div className="flex flex-wrap gap-2">
                    {existingImages.map((url, index) => (
                      <div key={index} className="relative w-16 h-16 rounded overflow-hidden group">
                        <img src={url} alt="Stored" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <button type="button" onClick={() => removeExistingImage(index)} className="text-white hover:text-red-400"><X className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedFiles.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest mb-2 border-b border-gray-200 pb-1">Upload Queue:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="relative w-16 h-16 rounded overflow-hidden group border border-teal-500">
                        <img src={URL.createObjectURL(file)} alt="Pending" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <button type="button" onClick={() => removeSelectedFile(index)} className="text-white hover:text-red-400"><X className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <input type="file" multiple accept="image/*" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-widest file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 transition-colors cursor-pointer" />
            </div>
          </form>
        </div>

        <div className="px-8 py-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0">
          <button onClick={onClose} type="button" className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors">Abort</button>
          <button form="portfolio-form" type="submit" disabled={isSubmitting} className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-70 min-w-[140px]">
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Execute Commit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioFormModal;