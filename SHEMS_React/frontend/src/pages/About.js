import React from "react";
import { FaShieldAlt, FaMicrochip, FaChartLine, FaCloudUploadAlt } from "react-icons/fa";

function About() {
  return (
    <div className="main-content">
      <section className="hero-section">
        <div className="badge">Our Mission</div>
        <h1>Elevating Home Intelligence</h1>
        <p style={{ maxWidth: '800px', margin: '0 auto 40px', color: '#9BA3AF' }}>
          EnergySmart is a next-generation platform designed to help homeowners monitor, control, and optimize 
          their energy consumption through real-time data analytics and seamless automation.
        </p>

        <div className="glass-card" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'left' }}>
           <h3 style={{ color: '#00e5ff', marginBottom: '15px' }}>Our Vision</h3>
           <p style={{ lineHeight: '1.8' }}>
             To create energy-aware households that actively reduce electricity waste and contribute 
             to a greener future through integrated smart technology and intuitive user interfaces.
           </p>
        </div>
      </section>

      <h2 style={{ textAlign: 'center', marginTop: '80px', marginBottom: '40px' }}>The Core Architecture</h2>
      <div className="analytics-grid" style={{ padding: '0 20px' }}>
        <div className="glass-card">
          <FaShieldAlt size={35} color="#00e5ff" style={{ marginBottom: '15px' }} />
          <h4>Authentication</h4>
          <p style={{ fontSize: '14px', color: '#9ba3af' }}>Secure multi-factor accounts with protected routes ensure safe dashboard access.</p>
        </div>
        <div className="glass-card">
          <FaMicrochip size={35} color="#00e5ff" style={{ marginBottom: '15px' }} />
          <h4>Integration</h4>
          <p style={{ fontSize: '14px', color: '#9ba3af' }}>Hardware-agnostic connection to smart lights, HVAC systems, and sensors.</p>
        </div>
        <div className="glass-card">
          <FaChartLine size={35} color="#00e5ff" style={{ marginBottom: '15px' }} />
          <h4>Monitoring</h4>
          <p style={{ fontSize: '14px', color: '#9ba3af' }}>High-fidelity tracking of energy peaks and historical usage trends.</p>
        </div>
        <div className="glass-card">
          <FaCloudUploadAlt size={35} color="#00e5ff" style={{ marginBottom: '15px' }} />
          <h4>Cloud Control</h4>
          <p style={{ fontSize: '14px', color: '#9ba3af' }}>Global remote access via encrypted cloud nodes for real-time device toggling.</p>
        </div>
      </div>
    </div>
  );
}

export default About;