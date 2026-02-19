// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './User/Components/Layout/NavBar';
import Footer from './User/Components/Layout/Footer';

// Pages
import Home from './User/Pages/Home/Home';
import About from './User/Pages/About';

function App() {
  return (
    <Router>
      {/* SOLUTION: Added overflow-x-hidden right here */}
      <div className="flex flex-col min-h-screen font-sans text-gray-900 bg-gray-50 ">
        
        {/* Navbar stays at the top of every page */}
        <Navbar />
        
        {/* Routes determine which page content to load in the middle */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            {/* You can add more pages here later, e.g., <Route path="/portfolio" element={<Portfolio />} /> */}
          </Routes>
        </div>

        {/* Footer stays at the bottom of every page */}
        <Footer />

      </div>
    </Router>
  );
}

export default App;