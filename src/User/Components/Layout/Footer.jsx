import React from 'react';
import { Link } from 'react-router-dom'; // Imported Link for SPA routing
import { Linkedin, Twitter, Facebook, Instagram, ArrowRight, Lock } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Updated hrefs to match your actual React Router paths
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Our Expertise', path: '/#expertise' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Our Team', path: '/team' },
    { name: 'Contact', path: '/contact' },
  ];

  // Pointing these to the expertise section for now
  const services = [
    { name: 'Project Management', path: '/#expertise' },
    { name: 'Programme Management', path: '/#expertise' },
    { name: 'Contract Administration', path: '/#expertise' },
    { name: 'Quantity Surveying', path: '/#expertise' },
    { name: 'Alternative Dispute Resolution', path: '/#expertise' },
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
            <div className="mb-6">
              <Link to="/" className="flex items-center gap-1 text-3xl font-bold font-display tracking-tight hover:opacity-80 transition-opacity">
                CMAS
                <img 
                  src="/image/cmasLogo.png" 
                  alt="CMAS Logo" 
                  className="h-8 w-auto object-contain" 
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </Link>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
              Delivering world-class project management, quantity surveying, and dispute resolution services across East Africa. We turn complex visions into reality.
            </p>
            
            {/* Social Icons (External links, keep as standard <a> tags) */}
            <div className="flex gap-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-teal-500 hover:text-gray-900 hover:border-teal-500 transition-all duration-300">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-teal-500 hover:text-gray-900 hover:border-teal-500 transition-all duration-300">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-teal-500 hover:text-gray-900 hover:border-teal-500 transition-all duration-300">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-teal-500 hover:text-gray-900 hover:border-teal-500 transition-all duration-300">
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
                  {/* Changed to React Router <Link> */}
                  <Link to={link.path} className="group flex items-center text-sm text-gray-400 hover:text-teal-400 transition-colors">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-teal-500" />
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </Link>
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
                  {/* Changed to React Router <Link> */}
                  <Link to={service.path} className="group flex items-center text-sm text-gray-400 hover:text-teal-400 transition-colors">
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-teal-500" />
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">{service.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Lowkey Staff Portal */}
          <div className="lg:col-span-2">
            <h4 className="text-gray-600 font-bold tracking-widest uppercase text-[10px] mb-6">Corporate</h4>
            <p className="text-gray-600 text-xs leading-relaxed mb-4">
              Secure access portal for authorized CMAS personnel and site administration.
            </p>
            
            {/* Changed to React Router <Link> */}
            <Link 
              to="/admin/login" 
              className="group inline-flex items-center gap-2 text-gray-500 hover:text-teal-500 text-xs font-medium transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Login</span>
              <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </Link>
          </div>

        </div>

        {/* === BOTTOM BAR: Copyright & Legal === */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            &copy; {currentYear} Construction Management Advisory Services (CMAS). All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {/* Standard links for legal pages if they exist later */}
            <Link to="/privacy" className="text-gray-500 hover:text-white text-xs transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-500 hover:text-white text-xs transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;