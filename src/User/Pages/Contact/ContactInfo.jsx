import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

/**
 * ContactInfo Component
 * Displays the static contact details (Address, Phone, Email) for CMAS.
 * Designed to sit on the left side of the dark-mode contact section.
 */
const ContactInfo = () => {
  return (
    <div className="flex flex-col justify-center">
      
      {/* Section Title */}
      <h2 className="text-3xl md:text-5xl font-bold font-display mb-12 text-white">
        Direct <span className="text-teal-400">Channels.</span>
      </h2>

      {/* Grid of Contact Cards */}
      <div className="flex flex-col gap-6">
        
        {/* Physical Address Card */}
        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm flex items-start gap-6 group hover:bg-white/10 transition-colors duration-300">
          <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 group-hover:bg-teal-500 group-hover:text-white transition-colors">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-teal-400">Headquarters</span>
            <p className="text-gray-300 font-medium leading-relaxed">
              Gate 7, House 5<br/>
              Diani Close off Ole Dume Road.<br/>
              Nairobi, Kenya
            </p>
          </div>
        </div>

        {/* Telephone Card */}
        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm flex items-start gap-6 group hover:bg-white/10 transition-colors duration-300">
          <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 group-hover:bg-teal-500 group-hover:text-white transition-colors">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-teal-400">Direct Lines</span>
            <p className="text-gray-300 font-medium tracking-wide">T: (254 020) 203 4568</p>
            <p className="text-gray-300 font-medium tracking-wide">F: (254 020) 209 1729</p>
          </div>
        </div>

        {/* Email Card */}
        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm flex items-start gap-6 group hover:bg-white/10 transition-colors duration-300">
          <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 group-hover:bg-teal-500 group-hover:text-white transition-colors">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-[10px] uppercase tracking-widest font-bold mb-2 text-teal-400">Digital Desk</span>
            <a href="mailto:info@cmasltd.com" className="text-gray-300 font-medium hover:text-white transition-colors">info@cmasltd.com</a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactInfo;