import { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const backgroundImages = [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070&auto=format&fit=crop" 
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    // CHANGE 1: "min-h-screen" ensures it fills the screen, but "pb-20" adds extra cushion at the bottom
    <section id="home" className="relative min-h-screen w-full overflow-hidden flex items-center justify-center pb-20">
      
      {/* Background Slideshow */}
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-900/90" />
        </div>
      ))}

      {/* Content Container */}
      {/* CHANGE 2: Added "pt-32" to push content down from the top navbar, and "pb-12" for internal spacing */}
      <div className="relative z-10 container mx-auto px-6 text-center pt-32 pb-12 flex flex-col items-center justify-center h-full">
        
        {/* Top Badge */}
        <div className="inline-block mb-6 px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
          <span className="text-xs md:text-sm font-semibold text-gray-200 tracking-widest uppercase">
            Premier Construction Consultancy
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight drop-shadow-lg">
          Building Success <br />
          From <span className="text-teal-500">The Ground Up</span>
        </h1>

        {/* Description Box */}
        <div className="max-w-3xl mx-auto bg-gray-900/40 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-lg mb-12">
          <p className="text-gray-200 text-lg md:text-xl leading-relaxed">
            CMAS is devoted to the construction industry with our consultancy working exclusively for those who execute construction projects. We help our Clients manage the many risks associated with construction projects, with our consultancy service reflecting a solid understanding of what it takes to build a successful project.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-5 justify-center items-center w-full">
  
  {/* Scrolls down to the Services section we built earlier */}
  <a 
    href="#expertise" 
    className="w-full md:w-auto px-10 py-4 bg-teal-600 hover:bg-teal-500 text-white rounded font-semibold transition-all transform hover:scale-105 shadow-lg shadow-teal-900/20 text-lg text-center"
  >
    Our Expertise
  </a>
  
  {/* Navigates to the Portfolio page (change the href if your route is different) */}
  <a 
    href="#portfolio" 
    className="w-full md:w-auto px-10 py-4 border border-white/30 text-white rounded font-semibold hover:bg-white/10 transition-all backdrop-blur-sm text-lg text-center"
  >
    View Portfolio
  </a>

</div>
      </div>

      {/* Scroll Indicator - Positioned absolutely at the bottom to fill the empty space */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-white/50 w-10 h-10" />
      </div>

    </section>
  );
};

export default Hero;