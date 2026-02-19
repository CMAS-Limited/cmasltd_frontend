// src/User/Components/Sections/Contact.jsx
import React from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react';

const Contact = () => {
  return (
    // Dark Brand Background
    <section id="contact" className="relative py-24 bg-[#0F5156] overflow-hidden">
      
      {/* Background Decor (Subtle Grid & Glow) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-teal-400/10 blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* === LEFT SIDE: Contact Information === */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            <div className="inline-flex items-center gap-2 mb-4">
               <div className="h-px w-8 bg-teal-400"></div>
               <span className="text-teal-400 font-bold tracking-widest uppercase text-xs">
                 Get in Touch
               </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white font-display mb-6 leading-tight">
              Let's build something <br />
              <span className="text-teal-400">great together.</span>
            </h2>
            
            <p className="text-teal-100/70 text-base leading-relaxed mb-10 max-w-md">
              Whether you need expert project management, quantity surveying, or dispute resolution, our team is ready to assist you. Reach out today to discuss your next project.
            </p>

            {/* Contact Details List */}
            <div className="space-y-8">
              
              {/* Address */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Our Office</h4>
                  <p className="text-teal-100/60 text-sm leading-relaxed">
                    Nairobi Expressway Plaza, <br />
                    Westlands, Nairobi, Kenya
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Call Us</h4>
                  <p className="text-teal-100/60 text-sm">
                    +254 700 000 000 <br />
                    +254 711 111 111
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Email Us</h4>
                  <p className="text-teal-100/60 text-sm">
                    info@cmas.co.ke <br />
                    projects@cmas.co.ke
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* === RIGHT SIDE: The Contact Form === */}
          <div className="lg:col-span-6 lg:col-start-7">
            
            <div className="bg-gray-900/60 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
              
              {/* Subtle top border highlight */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent"></div>

              <div className="flex items-center gap-3 mb-8">
                 <MessageSquare className="w-6 h-6 text-teal-400" />
                 <h3 className="text-2xl font-bold text-white font-display">Send us a message</h3>
              </div>

              <form className="space-y-6">
                
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all"
                    />
                  </div>
                </div>

                {/* Subject Row */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Subject</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-300 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all appearance-none cursor-pointer">
                    <option value="" disabled selected className="text-gray-900">Select a topic...</option>
                    <option value="pm" className="text-gray-900">Project Management</option>
                    <option value="qs" className="text-gray-900">Quantity Surveying</option>
                    <option value="adr" className="text-gray-900">Alternative Dispute Resolution</option>
                    <option value="other" className="text-gray-900">Other Inquiry</option>
                  </select>
                </div>

                {/* Message Box */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Message</label>
                  <textarea 
                    rows="4" 
                    placeholder="Tell us about your project or inquiry..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button 
                  type="button"
                  className="w-full group flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-gray-900 font-bold text-sm uppercase tracking-widest py-4 rounded-xl transition-all duration-300"
                >
                  Send Message
                  <Send className="w-4 h-4 transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                </button>

              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;