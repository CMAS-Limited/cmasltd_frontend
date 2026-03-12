import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';
import { Loader2, X, Upload } from 'lucide-react';

const PortfolioFormModal = ({ isOpen, onClose, initialData, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  
  const [formData, setFormData] = useState({
    title: '', category: 'Commercial', location: '', cmas_role: '', project_year: '', description: '', mainfeatures: ''
  });

  // Sync incoming data to local state upon modal instantiation
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setExistingImages(initialData.images || []);
        setFormData({
          title: initialData.title || '',
          category: initialData.category || '',
          location: initialData.location || '',
          cmas_role: initialData.cmas_role || '',
          project_year: initialData.project_year || '',
          description: initialData.description || '',
          mainfeatures: initialData.mainfeatures ? initialData.mainfeatures.join(', ') : '',
        });
      } else {
        setExistingImages([]);
        setSelectedFiles([]);
        setFormData({ title: '', category: 'Commercial', location: '', cmas_role: '', project_year: '', description: '', mainfeatures: '' });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
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
    setIsSubmitting(true);

    try {
      let newImageUrls = selectedFiles.length > 0 ? await uploadImages() : [];
      const finalImagesArray = [...existingImages, ...newImageUrls];

      const payload = {
        title: formData.title,
        category: formData.category,
        location: formData.location,
        cmas_role: formData.cmas_role,
        project_year: formData.project_year,
        description: formData.description,
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
      
      onSuccess(); // Trigger parent re-fetch
      onClose();   // Terminate modal
    } catch (error) {
      console.error("Commit Error:", error.message);
      alert("System Failure: Check console for data rejection details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="text-lg font-bold text-gray-900 uppercase tracking-widest">
            {initialData ? 'Modify Project Data' : 'Initialize New Project'}
          </h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 bg-white rounded-lg transition-colors border border-gray-200">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto">
          <form id="portfolio-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Project Title *</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-teal-600 transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</label>
                <input type="text" name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-teal-600 transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</label>
                <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-teal-600 transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Project Year</label>
                <input type="text" name="project_year" value={formData.project_year} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-teal-600 transition-colors" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">CMAS Role</label>
              <input type="text" name="cmas_role" value={formData.cmas_role} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-teal-600 transition-colors" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Description *</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} required rows="3" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-teal-600 transition-colors resize-none"></textarea>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Main Features (Comma Separated)</label>
              <textarea name="mainfeatures" value={formData.mainfeatures} onChange={handleInputChange} rows="2" className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-teal-600 transition-colors resize-none"></textarea>
            </div>

            <div className="flex flex-col gap-4 p-4 border border-dashed border-gray-300 rounded-xl bg-gray-50/50">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2"><Upload className="w-3 h-3" /> Image Infrastructure</label>
              
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

        <div className="px-8 py-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
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