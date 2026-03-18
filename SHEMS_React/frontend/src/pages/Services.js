import React from "react";
import { FaChartBar, FaMobileAlt, FaBell, FaClock, FaUserLock, FaLeaf } from "react-icons/fa";

function Services() {
  const serviceItems = [
    { title: "Real-Time Monitoring", desc: "Monitor current electricity usage with millisecond precision.", icon: <FaChartBar /> },
    { title: "Energy Analytics", desc: "Visual daily and monthly reports powered by advanced data modeling.", icon: <FaMobileAlt /> },
    { title: "Remote Control", desc: "Full command over your household appliances from any device, anywhere.", icon: <FaClock /> },
    { title: "Smart Alerts", desc: "Instant push notifications when consumption patterns deviate from the norm.", icon: <FaBell /> },
    { title: "Secure Management", desc: "Enterprise-grade encryption protecting your home usage data.", icon: <FaUserLock /> },
    { title: "Eco Insights", desc: "Personalized AI recommendations to reduce carbon footprint and costs.", icon: <FaLeaf /> }
  ];

  return (
    <div className="main-content">
      <div className="dash-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
        <div className="badge">Platform Features</div>
        <h1 style={{ color: '#00e5ff', fontSize: '36px' }}>Premium Intelligence Services</h1>
        <p style={{ color: '#9BA3AF' }}>A complete ecosystem of smart tools for total energy sovereignty.</p>
      </div>

      <div className="device-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px' }}>
        {serviceItems.map((item, index) => (
          <div className="glass-card" key={index} style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
            <div style={{ fontSize: '38px', color: '#00e5ff', display: 'flex', alignItems: 'center' }}>{item.icon}</div>
            <div>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{item.title}</h4>
              <p style={{ fontSize: '14px', color: '#9ba3af', margin: 0, lineHeight: '1.5' }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modern Call to Action */}
      <div className="glass-card" style={{ 
        marginTop: '80px', 
        textAlign: 'center', 
        background: 'linear-gradient(135deg, rgba(0,229,255,0.1) 0%, rgba(0,200,83,0.05) 100%)',
        padding: '50px'
      }}>
        <h2 style={{ marginBottom: '15px' }}>Ready to optimize your home?</h2>
        <p style={{ color: '#9BA3AF', marginBottom: '30px' }}>Join 5,000+ households saving an average of 15% on monthly bills.</p>
        <button className="on-btn" style={{ maxWidth: '250px' }}>Upgrade to Pro</button>
      </div>
    </div>
  );
}

export default Services;