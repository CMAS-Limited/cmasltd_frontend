import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * ContactForm Component
 * A dark-themed, glassmorphism form for client inquiries.
 * Manages its own local state for the input fields.
 */
const ContactForm = () => {
  // Local state to track user input
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  // Dynamically updates state when the user types in any field
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handles form submission (to be connected to an API later)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Message sent successfully. Our team will be in touch.");
    
    // Optional: Clear form after successful submit
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  return (
    <div className="bg-[#132A2F] border border-white/10 p-10 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden">
      
      {/* Decorative ambient glow inside the form container */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

      <h3 className="text-2xl md:text-3xl font-bold font-display mb-10 text-white relative z-10">
        Project Inquiry Brief
      </h3>

      {/* The actual form element */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 relative z-10">
        
        {/* Row 1: Split Name and Email on larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="flex flex-col gap-3">
            <label htmlFor="name" className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Full Name</label>
            <input 
              type="text" 
              id="name" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-teal-400 focus:bg-white/10 transition-all duration-300"
              placeholder="e.g. Jane Doe"
            />
          </div>
          
          <div className="flex flex-col gap-3">
            <label htmlFor="email" className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-teal-400 focus:bg-white/10 transition-all duration-300"
              placeholder="jane@company.com"
            />
          </div>

        </div>

        {/* Row 2: Company / Subject */}
        <div className="flex flex-col gap-3">
          <label htmlFor="company" className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Company / Project Subject</label>
          <input 
            type="text" 
            id="company" 
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-teal-400 focus:bg-white/10 transition-all duration-300"
            placeholder="e.g. Commercial Plaza Development"
          />
        </div>

        {/* Row 3: Message Textarea */}
        <div className="flex flex-col gap-3">
          <label htmlFor="message" className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Project Details</label>
          <textarea 
            id="message" 
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-teal-400 focus:bg-white/10 transition-all duration-300 resize-none"
            placeholder="Provide a brief overview of your requirements..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex justify-end">
          <button type="submit" className="inline-flex items-center gap-3 bg-teal-600 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-teal-500 transition-colors duration-300 shadow-lg shadow-teal-900/50 group">
            Submit Brief 
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </form>
    </div>
  );
};

export default ContactForm;