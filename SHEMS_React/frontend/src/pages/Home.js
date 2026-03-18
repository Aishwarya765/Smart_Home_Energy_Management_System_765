import React from "react";
import { Link } from "react-router-dom";
import { FaLightbulb, FaFan, FaShieldAlt, FaChartLine, FaChevronDown } from "react-icons/fa";

function Home() {
  return (
    <div className="home-wrapper">
      <section className="hero-section">
        <div className="badge">Next-Gen Living</div>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
          Smart Home Management <br /> <span style={{ color: '#00e5ff' }}>System</span>
        </h1>
        <p style={{ maxWidth: '600px', color: '#9ba3af', marginBottom: '40px' }}>
          A centralized digital platform to monitor, control, and manage all your household devices through one powerful interface.
        </p>
        
        <div className="stats-row" style={{ display: 'flex', gap: '50px', marginBottom: '50px' }}>
          <div><h3>50+</h3><p>Devices</p></div>
          <div><h3>Real-Time</h3><p>Monitoring</p></div>
          <div><h3>100%</h3><p>Secure</p></div>
        </div>

        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {['Lighting', 'Climate', 'Security'].map(item => (
            <div className="glass-card" style={{ width: '150px' }}>
               <FaLightbulb size={24} color="#00e5ff"/>
               <p style={{ marginTop: '10px' }}>{item}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
export default Home;