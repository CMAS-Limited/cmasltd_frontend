// src/components/layout/Navbar.jsx
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Optional: Add a background color when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#111827]/90 backdrop-blur-sm py-4 shadow-md' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO SECTION: Text + Icon (Static, close together, same height) */}
        <a href="#home" className="flex items-center gap-0.5 select-none">
          <span 
            className="text-4xl text-white tracking-tight leading-none" 
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            CMAS
          </span>
          <img 
            src="public/image/cmasLogo.png" 
            alt="CMAS Logo" 
            className="h-8 w-auto object-contain mt-1" 
          />
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {['Home', 'About', 'Expertise', 'Portfolio', 'Team'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors uppercase tracking-wider"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <button className="bg-teal-600 hover:bg-teal-500 text-white px-5 py-2 rounded-md font-medium text-sm transition-colors cursor-pointer">
            REACH US
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#111827] border-t border-gray-800">
          <div className="flex flex-col p-6 space-y-4">
            {['Home', 'About', 'Expertise', 'Portfolio', 'Team'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-gray-300 hover:text-white text-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
            <button className="bg-teal-600 text-white py-3 rounded-md font-medium w-full">
              REACH US
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;