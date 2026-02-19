import React from 'react';
import { Linkedin, Twitter, Facebook, Instagram, ArrowRight, Lock } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#' },
    { name: 'About Us', href: '#' },
    { name: 'Our Expertise', href: '#expertise' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Our Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ];

  const services = [
    { name: 'Project Management', href: '#' },
    { name: 'Programme Management', href: '#' },
    { name: 'Contract Administration', href: '#' },
    { name: 'Quantity Surveying', href: '#' },
    { name: 'Alternative Dispute Resolution', href: '#' },
  ];

  return (
    <footer className="bg-gray-950 text-white pt-20 pb-8 border-t border-white/5 relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-1/4 w-1/2 h-32 bg-teal-500/10 blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* === TOP SECTION: 4-Column Grid === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-3xl font-bold font-display tracking-tight">
                CMAS<span className="text-teal-500">.</span>
              </h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
              Delivering world-class project management, quantity surveying, and dispute resolution services across East Africa. We turn complex visions into reality.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-teal-500 hover:text-gray-900 hover:border-teal-500 transition-all duration-300">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-teal-500 hover:text-gray-900 hover:border-teal-500 transition-all duration-300">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-teal-500 hover:text-gray-900 hover:border-teal-500 transition-all duration-300">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-teal-500 hover:text-gray-900 hover:border-teal-500 transition-all duration-300">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-white font-bold tracking-widest uppercase text-xs mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="group flex items-center text-sm text-gray-400 hover:text-teal-400 transition-colors">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-teal-500" />
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold tracking-widest uppercase text-xs mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a href={service.href} className="group flex items-center text-sm text-gray-400 hover:text-teal-400 transition-colors">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-teal-500" />
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">{service.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Lowkey Staff Portal */}
          <div className="lg:col-span-2">
            {/* Notice the text colors are muted (gray-600) compared to the columns above */}
            <h4 className="text-gray-600 font-bold tracking-widest uppercase text-[10px] mb-6">Corporate</h4>
            <p className="text-gray-600 text-xs leading-relaxed mb-4">
              Secure access portal for authorized CMAS personnel and site administration.
            </p>
            
            <a 
              href="/admin/login" 
              className="group inline-flex items-center gap-2 text-gray-500 hover:text-teal-500 text-xs font-medium transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Login</span>
              <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </a>
          </div>

        </div>

        {/* === BOTTOM BAR: Copyright & Legal === */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            &copy; {currentYear} Construction Management Advisory Services (CMAS). All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-500 hover:text-white text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white text-xs transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;