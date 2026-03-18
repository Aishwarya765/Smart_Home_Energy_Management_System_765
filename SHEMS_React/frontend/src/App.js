import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Testimonials from "./pages/Testimonials";  // ✅ NEW PAGE
import FAQ from "./pages/FAQ";  // ✅ NEW PAGE

import "./styles/Navbar.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* NEW PAGES - Testimonials & FAQ */}
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/faq" element={<FAQ />} />
        
        {/* Protected Page */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Fallback Route */}
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;