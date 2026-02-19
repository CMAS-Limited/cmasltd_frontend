// src/App.jsx
import Navbar from './User/Components/Layout/NavBar';
import Hero from './User/Pages/Home/HeroSection'; 
import Stats from './User/Pages/Home/StatsBar';
import Services from './User/Pages/Home/ServicesSection';
import FeaturedProjects from './User/Pages/Home/FeautredProjects';
import Team from './User/Pages/Home/TeamMembers';

function App() {
  return (
    <div className="min-h-screen font-sans text-gray-900 bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      {/* Stats Bar */}
      <Stats />
      {/* Services Section */}
      <Services />
      {/* Featured Projects Section */}
      <FeaturedProjects />
      {/* Team Section */}
      <Team />

      {/* Temporary spacer to allow scrolling */}
      <div className="h-[500px] flex items-center justify-center">
        <p className="text-gray-400">Next Sections Go Here...</p>
      </div>
    </div>
  );
}

export default App;