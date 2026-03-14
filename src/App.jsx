// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

// Public Layout Components
import Navbar from './User/Components/Layout/NavBar';
import Footer from './User/Components/Layout/Footer';

// Admin Layout Component
import AdminLayout from './Admin/Components/Layout/AdminLayout';

// Public Pages
import Home from './User/Pages/Home/Home';
import About from './User/Pages/About';
import Portfolio from './User/Pages/Portfolio/Portfolio';
import Team from './User/Pages/Team/Team';
import Contact from './User/Pages/Contact/Contact';

// Admin Pages
import AdminLogin from './Admin/Pages/Login/AdminLogin';
import DashboardHome from './Admin/Pages/DashboardHome/DashboardHome';
import InquiriesList from './Admin/Pages/Inquiries/InquiriesList';
import ManagePortfolio from './Admin/Pages/Portfolio/ManagePortfolio';
import ManageTeam from './Admin/Pages/Team/ManageTeam';
import ManageServices from './Admin/Pages/Service/ManageServices';

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
        
        {/* INGRESS: Admin Authentication (Standalone, no layout) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* SECURE ZONE: Admin Dashboard & Management (Wrapped in AdminLayout) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="inquiries" element={<InquiriesList />} />
          <Route path="portfolio" element={<ManagePortfolio />} />
          <Route path="team" element={<ManageTeam />} />
          <Route path="services" element={<ManageServices />} />
        </Route>

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