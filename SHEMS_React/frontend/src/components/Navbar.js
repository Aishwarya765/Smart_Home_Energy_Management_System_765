import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaUser, 
  FaSignOutAlt, 
  FaCog, 
  FaBell, 
  FaHome, 
  FaInfoCircle, 
  FaWrench, 
  FaEnvelope, 
  FaChartLine,
  FaStar,
  FaQuestionCircle
} from "react-icons/fa";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState({ fname: "", lname: "", email: "" });

  useEffect(() => {
    // Load user data from localStorage
    const loadUserData = () => {
      const storedUser = localStorage.getItem('user');
      const activeUser = localStorage.getItem('activeUser');
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      
      if (storedUser && isLoggedIn) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser({
            fname: parsedUser.fname || activeUser || "User",
            lname: parsedUser.lname || "",
            email: parsedUser.email || ""
          });
        } catch (e) {
          setUser({ fname: activeUser || "User", lname: "", email: "" });
        }
      } else if (activeUser && isLoggedIn) {
        setUser({ fname: activeUser, lname: "", email: "" });
      } else {
        setUser({ fname: "", lname: "", email: "" });
      }
    };

    loadUserData();

    // Add event listener for storage changes (in case user logs in/out in another tab)
    window.addEventListener('storage', loadUserData);
    
    return () => {
      window.removeEventListener('storage', loadUserData);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('activeUser');
    // Don't remove user data immediately to allow for re-login
    setShowDropdown(false);
    navigate('/login');
    window.location.reload(); // Force reload to update navbar
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo-text">
          SMART HOME ENERGY
        </Link>
      </div>

      <div className="nav-center">
        <Link to="/" className="nav-item">
          <FaHome className="nav-icon" /> Home
        </Link>
        <Link to="/about" className="nav-item">
          <FaInfoCircle className="nav-icon" /> About
        </Link>
        <Link to="/services" className="nav-item">
          <FaWrench className="nav-icon" /> Services
        </Link>
        <Link to="/testimonials" className="nav-item">
          <FaStar className="nav-icon" /> Testimonials
        </Link>
        <Link to="/faq" className="nav-item">
          <FaQuestionCircle className="nav-icon" /> FAQ
        </Link>
        <Link to="/contact" className="nav-item">
          <FaEnvelope className="nav-icon" /> Contact
        </Link>
        <Link to="/dashboard" className="nav-item">
          <FaChartLine className="nav-icon" /> Dashboard
        </Link>
      </div>

      <div className="nav-right">
        <div className="profile-container">
          <button 
            className="profile-button"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {/* Only show avatar icon, no name */}
            <div className="avatar">
              <FaUser />
            </div>
          </button>

          {showDropdown && (
            <>
              <div className="dropdown-overlay" onClick={() => setShowDropdown(false)}></div>
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <div className="dropdown-avatar">
                    <FaUser />
                  </div>
                  <div className="dropdown-user-info">
                    <h4>{user.fname} {user.lname}</h4>
                    <p>{user.email || user.fname}</p>
                  </div>
                </div>
                
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                    <FaUser /> My Profile
                  </Link>
                  <Link to="/settings" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                    <FaCog /> Settings
                  </Link>
                  <Link to="/notifications" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                    <FaBell /> Notifications
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button onClick={handleLogout} className="dropdown-item logout">
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;