// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

// Public Layout Components
import Navbar from './User/Components/Layout/NavBar';
import Footer from './User/Components/Layout/Footer';

// Public Pages
import Home from './User/Pages/Home/Home';
import About from './User/Pages/About';
import Portfolio from './User/Pages/Portfolio/Portfolio';
import Team from './User/Pages/Team/Team';
import Contact from './User/Pages/Contact/Contact';

// Admin Pages
import AdminLogin from './Admin/Pages/Login/AdminLogin';

// ==========================================
// LAYOUT CONTROLLERS
// ==========================================

// PublicLayout wraps the standard website pages with the Navbar and Footer
const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-900 bg-gray-50 overflow-x-hidden">
      <Navbar />
      <div className="flex-grow">
        <Outlet /> {/* This injects the specific page content (Home, About, etc.) */}
      </div>
      <Footer />
    </div>
  );
};

// ==========================================
// MAIN APP ROUTER
// ==========================================

function App() {
  return (
    <Router>
      <Routes>
        
        {/* INGRESS: Admin Routes (Isolated from Public Layout) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* EGRESS: Public Website Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;