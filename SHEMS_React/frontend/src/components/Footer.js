import React from "react";
import { Link } from "react-router-dom";
import { FaYoutube, FaInstagram, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer-pro">
      <div className="footer-container" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '40px' }}>
        <div>
          <h2 style={{ color: '#00e5ff' }}>EnergySmart</h2>
          <p>Revolutionizing potential energy consumption with AI-driven insights and real-time monitoring. Live smart, save more.</p>
          <div className="social-links" style={{ marginTop: '20px' }}>
            <a href="https://github.com"><FaGithub /></a>
            <a href="https://linkedin.com"><FaLinkedin /></a>
            <a href="https://instagram.com"><FaInstagram /></a>
            <a href="https://youtube.com"><FaYoutube /></a>
          </div>
        </div>
        
        <div>
          <h4>Quick Links</h4>
          <Link to="/">Home</Link><br/>
          <Link to="/about">About Us</Link><br/>
          <Link to="/services">Features</Link>
        </div>

        <div>
          <h4>Support</h4>
          <Link to="/faq">FAQs</Link><br/>
          <Link to="/contact">Help Center</Link><br/>
          <Link to="/privacy">Privacy Policy</Link>
        </div>

        <div>
          <h4>Contact Us</h4>
          <p>123 Innovation Drive, Tech City</p>
          <p>+1 (555) 123-4567</p>
          <p>support@energysmart.com</p>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '40px', paddingWeight: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        © 2026 EnergySmart Systems. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;