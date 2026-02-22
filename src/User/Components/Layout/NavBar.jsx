import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Navigation Data based on your design
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Expertise', path: '/#expertise' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Team', path: '/team' }
  ];

  // Change background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle smooth scrolling for hash links
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  // Check if we are on the homepage
  const isHomePage = location.pathname === '/';
  
  // Dynamic Background
  const navBackground = (scrolled || !isHomePage) 
    ? 'bg-[#111827]/95 backdrop-blur-sm py-4 shadow-md' 
    : 'bg-transparent py-6';

  // === THE FIX: Smarter Active State Logic ===
  const isActive = (path) => {
    // 1. If it's a hash link (e.g., '/#expertise'), check if the current hash matches
    if (path.includes('#')) {
      return location.hash === path.substring(1); 
    }
    // 2. If it's the Home link, ensure we are strictly on '/' with NO hash active
    if (path === '/') {
      return location.pathname === '/' && location.hash === '';
    }
    // 3. If it's a standard page link (e.g., '/about'), match the pathname
    return location.pathname === path;
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navBackground}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO SECTION */}
        <Link to="/" className="flex items-center gap-0.5 select-none">
          <span 
            className="text-4xl text-white tracking-tight leading-none" 
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
          CMAS
          </span>
          <img 
            src="/image/cmasLogo.png" 
            alt="" 
            className="h-8 w-auto object-contain mt-1" 
            onError={(e) => { e.target.style.display = 'none'; }}
          />    
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              className={`text-sm font-medium hover:text-white transition-colors uppercase tracking-wider ${
                isActive(item.path) ? 'text-teal-400' : 'text-gray-300'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link to="/#contact">
            <button className="bg-teal-600 hover:bg-teal-500 text-white px-5 py-2 rounded-md font-medium text-sm transition-colors cursor-pointer">
              REACH US
            </button>
          </Link>
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
        <div className="md:hidden absolute top-full left-0 w-full bg-[#111827] border-t border-gray-800 shadow-xl">
          <div className="flex flex-col p-6 space-y-4">
            {navLinks.map((item) => (
              <Link 
                key={item.name} 
                to={item.path} 
                className={`text-lg font-medium hover:text-white transition-colors ${
                  isActive(item.path) ? 'text-teal-400' : 'text-gray-300'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link to="/#contact" onClick={() => setIsOpen(false)}>
              <button className="bg-teal-600 hover:bg-teal-500 transition-colors text-white py-3 rounded-md font-medium w-full mt-2">
                REACH US
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;