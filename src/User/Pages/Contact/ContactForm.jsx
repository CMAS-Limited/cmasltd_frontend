import React, { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '../../../supabaseClient'; 

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  // UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // 1. Send data to Supabase
      const { error } = await supabase
        .from('contact_inquiries')
        .insert([
          { 
            full_name: formData.name, 
            email: formData.email, 
            company_subject: formData.company, 
            project_brief: formData.message 
          }
        ]);

      // 2. Handle potential errors
      if (error) throw error;

      // 3. Success protocol
      setSubmitStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' }); // Clear form

      // Hide success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);

    } catch (error) {
      console.error("Error submitting inquiry:", error.message);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#132A2F] border border-white/10 p-10 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

      <h3 className="text-2xl md:text-3xl font-bold font-display mb-10 text-white relative z-10">
        Project Inquiry Brief
      </h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-3">
            <label htmlFor="name" className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Full Name</label>
            <input 
              type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-teal-400 focus:bg-white/10 transition-all duration-300"
              placeholder="e.g. Jane Doe"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="flex flex-col gap-3">
            <label htmlFor="email" className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Email Address</label>
            <input 
              type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-teal-400 focus:bg-white/10 transition-all duration-300"
              placeholder="jane@company.com"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="company" className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Company / Project Subject</label>
          <input 
            type="text" id="company" name="company" value={formData.company} onChange={handleChange} required
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-teal-400 focus:bg-white/10 transition-all duration-300"
            placeholder="e.g. Commercial Plaza Development"
            disabled={isSubmitting}
          />
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="message" className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Project Details</label>
          <textarea 
            id="message" name="message" value={formData.message} onChange={handleChange} required rows="4"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-teal-400 focus:bg-white/10 transition-all duration-300 resize-none"
            placeholder="Provide a brief overview of your requirements..."
            disabled={isSubmitting}
          ></textarea>
        </div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="bg-teal-500/10 border border-teal-500/50 text-teal-400 px-4 py-3 rounded-xl text-sm font-medium">
            Inquiry transmitted successfully. Our leadership team will review it shortly.
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl text-sm font-medium">
            Transmission failed. Please check your connection and try again.
          </div>
        )}

        <div className="pt-4 flex justify-end">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="inline-flex items-center gap-3 bg-teal-600 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-teal-500 transition-colors duration-300 shadow-lg shadow-teal-900/50 group disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>Transmitting... <Loader2 className="w-4 h-4 animate-spin" /></>
            ) : (
              <>Submit Brief <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" /></>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;