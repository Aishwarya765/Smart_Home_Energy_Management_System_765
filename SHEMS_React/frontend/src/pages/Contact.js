import React from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

function Contact() {
  return (
    <div className="home-container" style={{ display: 'flex', gap: '40px', justifyContent: 'center', alignItems: 'flex-start' }}>
      {/* Left Info Card */}
      <div className="glass-card" style={{ flex: 1, maxWidth: '400px' }}>
        <h2 style={{ color: '#00e5ff', marginBottom: '30px' }}>Contact Information</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '12px' }}>
            <FaMapMarkerAlt color="#00e5ff" />
            <p>123 Smart Street, Tech City, TC 12345</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '12px' }}>
            <FaPhone color="#00e5ff" />
            <p>+1 (555) 123-4567</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '12px' }}>
            <FaEnvelope color="#00e5ff" />
            <p>info@smarthome.com</p>
          </div>
        </div>
      </div>

      {/* Right Form Card */}
      <div className="glass-card" style={{ flex: 1, maxWidth: '500px' }}>
        <h2 style={{ color: '#00e5ff', marginBottom: '30px', textAlign: 'center' }}>Send Message</h2>
        <form className="contact-form">
          <input type="text" placeholder="Enter your full name" style={{ width: '100%', padding: '15px', borderRadius: '10px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', marginBottom: '15px' }} />
          <input type="email" placeholder="Enter your email" style={{ width: '100%', padding: '15px', borderRadius: '10px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', marginBottom: '15px' }} />
          <textarea placeholder="Your Message" rows="5" style={{ width: '100%', padding: '15px', borderRadius: '10px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', marginBottom: '20px' }}></textarea>
          <button style={{ background: 'linear-gradient(90deg, #00c853, #64dd17)', color: '#000', fontWeight: 'bold' }}>Send Message</button>
        </form>
      </div>
    </div>
  );
}
export default Contact;