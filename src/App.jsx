// src/App.jsx
import Navbar from './User/Components/Layout/NavBar';
import Hero from './User/Pages/Home/HeroSection'; 
import Stats from './User/Pages/Home/StatsBar';
import Services from './User/Pages/Home/ServicesSection';
import FeaturedProjects from './User/Pages/Home/FeautredProjects';
import Team from './User/Pages/Home/TeamMembers';
import Contact from './User/Pages/Home/ContactsUs';
import Footer from './User/Components/Layout/Footer';

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
      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default App;