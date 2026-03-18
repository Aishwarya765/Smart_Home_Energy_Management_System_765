import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FaBolt, FaRupeeSign, FaLightbulb, FaWind, FaVideo, FaSnowflake, FaTv, FaPlug, FaExclamationTriangle, FaCheckCircle, FaWrench } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

// Power consumption in kWh per hour for each device
const DEVICE_POWER = {
  "Living Room Lights": 0.06,
  "Smart AC": 1.5,
  "Ceiling Fan": 0.075,
  "Outdoor Camera": 0.01,
  "Smart TV": 0.12,
  "Water Heater": 3.0,
  "Refrigerator": 0.2,
  "Study Lamp": 0.02,
  "Air Purifier": 0.05,
  "Garage Door": 0.1
};

// Category mapping for load distribution
const DEVICE_CATEGORY = {
  "Living Room Lights": "Lighting",
  "Smart AC": "Climate",
  "Ceiling Fan": "Climate",
  "Outdoor Camera": "Appliances",
  "Smart TV": "Appliances",
  "Water Heater": "Appliances",
  "Refrigerator": "Appliances",
  "Study Lamp": "Lighting",
  "Air Purifier": "Climate",
  "Garage Door": "Appliances"
};

function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Daily');
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [resolutionMessage, setResolutionMessage] = useState('');
  const [isResolved, setIsResolved] = useState(false);
  
  // Get user data from localStorage (kept for reference but not displayed)
  const [userData] = useState(() => {
    const storedUser = localStorage.getItem('user');
    const activeUser = localStorage.getItem('activeUser');
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    return {
      fname: activeUser || 'User',
      lname: '',
      email: 'user@example.com',
      phone: 'Not provided',
      address: 'Not provided',
      interest: 'Not specified'
    };
  });

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  // Load devices from localStorage or use default
  const [devices, setDevices] = useState(() => {
    const savedDevices = localStorage.getItem('dashboardDevices');
    if (savedDevices) {
      return JSON.parse(savedDevices);
    }
    return [
      { id: 1, name: "Living Room Lights", room: "Living Room", icon: "FaLightbulb", active: true, category: "Lighting", power: 0.06 },
      { id: 2, name: "Smart AC", room: "Bedroom", icon: "FaSnowflake", active: false, category: "Climate", power: 1.5 },
      { id: 3, name: "Ceiling Fan", room: "Kitchen", icon: "FaWind", active: true, category: "Climate", power: 0.075 },
      { id: 4, name: "Outdoor Camera", room: "Entrance", icon: "FaVideo", active: true, category: "Appliances", power: 0.01 },
      { id: 5, name: "Smart TV", room: "Living Room", icon: "FaTv", active: false, category: "Appliances", power: 0.12 },
      { id: 6, name: "Water Heater", room: "Bathroom", icon: "FaPlug", active: false, category: "Appliances", power: 3.0 },
      { id: 7, name: "Refrigerator", room: "Kitchen", icon: "FaPlug", active: true, category: "Appliances", power: 0.2 },
      { id: 8, name: "Study Lamp", room: "Office", icon: "FaLightbulb", active: false, category: "Lighting", power: 0.02 },
      { id: 9, name: "Air Purifier", room: "Bedroom", icon: "FaWind", active: false, category: "Climate", power: 0.05 },
      { id: 10, name: "Garage Door", room: "Garage", icon: "FaVideo", active: false, category: "Appliances", power: 0.1 },
    ];
  });

  // Calculate dynamic stats
  const activeCount = devices.filter(d => d.active).length;
  
  // Calculate total hourly consumption (kWh)
  const totalHourlyConsumption = devices
    .filter(d => d.active)
    .reduce((sum, d) => sum + d.power, 0);
  
  // Daily consumption (assuming 24 hours with usage patterns)
  const dailyConsumption = totalHourlyConsumption * 12;
  const monthlyConsumption = dailyConsumption * 30;
  
  // Calculate monthly bill (₹8 per unit/kWh)
  const electricityRate = 8;
  const monthlyBill = Math.round(monthlyConsumption * electricityRate);
  
  // Calculate load distribution based on active devices
  const calculateLoadDistribution = () => {
    const categories = {
      Appliances: { value: 0, color: '#00e5ff' },
      Lighting: { value: 0, color: '#00c853' },
      Climate: { value: 0, color: '#ffab00' }
    };
    
    devices.filter(d => d.active).forEach(device => {
      if (device.category === "Appliances") categories.Appliances.value += device.power;
      else if (device.category === "Lighting") categories.Lighting.value += device.power;
      else if (device.category === "Climate") categories.Climate.value += device.power;
    });
    
    const total = categories.Appliances.value + categories.Lighting.value + categories.Climate.value;
    
    if (total === 0) {
      return [
        { name: 'Appliances', value: 33, color: '#00e5ff' },
        { name: 'Lighting', value: 33, color: '#00c853' },
        { name: 'Climate', value: 34, color: '#ffab00' }
      ];
    }
    
    return [
      { name: 'Appliances', value: Math.round((categories.Appliances.value / total) * 100), color: '#00e5ff' },
      { name: 'Lighting', value: Math.round((categories.Lighting.value / total) * 100), color: '#00c853' },
      { name: 'Climate', value: Math.round((categories.Climate.value / total) * 100), color: '#ffab00' }
    ];
  };
  
  const [loadData, setLoadData] = useState(calculateLoadDistribution());

  // Check if refrigerator has high leakage (simulated)
  const hasHighLeakage = devices.find(d => d.name === "Refrigerator")?.active && !isResolved;

  // Generate power analysis data
  const generatePowerData = (period) => {
    const baseLoad = totalHourlyConsumption;
    
    if (period === 'Daily') {
      return [
        { time: '00:00', usage: +(baseLoad * 0.2).toFixed(1) },
        { time: '04:00', usage: +(baseLoad * 0.1).toFixed(1) },
        { time: '08:00', usage: +(baseLoad * 0.6).toFixed(1) },
        { time: '12:00', usage: +(baseLoad * 0.9).toFixed(1) },
        { time: '16:00', usage: +(baseLoad * 1.1).toFixed(1) },
        { time: '20:00', usage: +(baseLoad * 1.3).toFixed(1) },
        { time: '23:59', usage: +(baseLoad * 0.5).toFixed(1) },
      ];
    } else if (period === 'Weekly') {
      return [
        { time: 'Mon', usage: +(baseLoad * 8).toFixed(1) },
        { time: 'Tue', usage: +(baseLoad * 8.5).toFixed(1) },
        { time: 'Wed', usage: +(baseLoad * 7.8).toFixed(1) },
        { time: 'Thu', usage: +(baseLoad * 9.2).toFixed(1) },
        { time: 'Fri', usage: +(baseLoad * 10.1).toFixed(1) },
        { time: 'Sat', usage: +(baseLoad * 12.5).toFixed(1) },
        { time: 'Sun', usage: +(baseLoad * 11.3).toFixed(1) },
      ];
    } else {
      return [
        { time: 'Week 1', usage: +(baseLoad * 70).toFixed(1) },
        { time: 'Week 2', usage: +(baseLoad * 75).toFixed(1) },
        { time: 'Week 3', usage: +(baseLoad * 82).toFixed(1) },
        { time: 'Week 4', usage: +(baseLoad * 68).toFixed(1) },
      ];
    }
  };
  
  const [powerData, setPowerData] = useState(generatePowerData('Daily'));

  // Update data when devices change or tab changes
  useEffect(() => {
    localStorage.setItem('dashboardDevices', JSON.stringify(devices));
    setLoadData(calculateLoadDistribution());
    setPowerData(generatePowerData(activeTab));
  }, [devices, activeTab]);

  // Toggle device function
  const toggleDevice = (id) => {
    setDevices(devices.map(d => 
      d.id === id ? { ...d, active: !d.active } : d
    ));
  };

  // Handle Resolve Now button click
  const handleResolveNow = () => {
    setShowResolveModal(true);
  };

  // Apply fix for high leakage
  const applyFix = (fixType) => {
    if (fixType === 'optimize') {
      setResolutionMessage('Refrigerator efficiency optimized! Temperature set to recommended level.');
    } else if (fixType === 'schedule') {
      setResolutionMessage('Maintenance scheduled for tomorrow between 10 AM - 12 PM.');
    } else if (fixType === 'ignore') {
      setResolutionMessage('Alert dismissed. We\'ll monitor the consumption.');
    }
    
    setIsResolved(true);
    
    setTimeout(() => {
      setShowResolveModal(false);
      setResolutionMessage('');
    }, 3000);
  };

  // Reset the alert (for testing)
  const resetAlert = () => {
    setIsResolved(false);
  };

  // Map icon string to component
  const getIcon = (iconName) => {
    switch(iconName) {
      case 'FaLightbulb': return <FaLightbulb />;
      case 'FaSnowflake': return <FaSnowflake />;
      case 'FaWind': return <FaWind />;
      case 'FaVideo': return <FaVideo />;
      case 'FaTv': return <FaTv />;
      case 'FaPlug': return <FaPlug />;
      default: return <FaPlug />;
    }
  };

  return (
    <div className="dashboard-wrapper">
      {/* Leakage Alert System */}
      {hasHighLeakage && (
        <div className="alert-banner">
          <FaExclamationTriangle color="#ff5252" />
          <span>
            <strong>High Leakage Detected:</strong> Your Refrigerator unit is 
            consuming 15% more power than average.
          </span>
          <button className="resolve-btn" onClick={handleResolveNow}>
            Resolve Now
          </button>
        </div>
      )}

      {/* Resolution Modal */}
      {showResolveModal && (
        <div className="modal-overlay">
          <div className="resolution-modal">
            <h3>🔧 Resolve High Leakage</h3>
            
            {resolutionMessage ? (
              <div className="resolution-success">
                <FaCheckCircle color="#00c853" size={40} />
                <p>{resolutionMessage}</p>
              </div>
            ) : (
              <>
                <p className="modal-desc">
                  Your refrigerator is consuming more power than usual. 
                  Choose an option below:
                </p>
                
                <div className="resolution-options">
                  <button 
                    className="resolve-option optimize"
                    onClick={() => applyFix('optimize')}
                  >
                    <FaWrench />
                    Optimize Settings
                    <small>Auto-adjust temperature</small>
                  </button>
                  
                  <button 
                    className="resolve-option schedule"
                    onClick={() => applyFix('schedule')}
                  >
                    <FaVideo />
                    Schedule Maintenance
                    <small>Book technician visit</small>
                  </button>
                  
                  <button 
                    className="resolve-option ignore"
                    onClick={() => applyFix('ignore')}
                  >
                    <FaCheckCircle />
                    Ignore for now
                    <small>Remind me later</small>
                  </button>
                </div>
                
                <button 
                  className="modal-close"
                  onClick={() => setShowResolveModal(false)}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}

            {/* Resolution Modal */}
      {showResolveModal && (
        <div className="modal-overlay">
          <div className="resolution-modal">
            <h3>🔧 Resolve High Leakage</h3>
            
            {resolutionMessage ? (
              <div className="resolution-success">
                <FaCheckCircle color="#00c853" size={40} />
                <p>{resolutionMessage}</p>
              </div>
            ) : (
              <>
                <p className="modal-desc">
                  Your refrigerator is consuming more power than usual. 
                  Choose an option below:
                </p>
                
                <div className="resolution-options">
                  <button 
                    className="resolve-option optimize"
                    onClick={() => applyFix('optimize')}
                  >
                    <FaWrench />
                    Optimize Settings
                    <small>Auto-adjust temperature</small>
                  </button>
                  
                  <button 
                    className="resolve-option schedule"
                    onClick={() => applyFix('schedule')}
                  >
                    <FaVideo />
                    Schedule Maintenance
                    <small>Book technician visit</small>
                  </button>
                  
                  <button 
                    className="resolve-option ignore"
                    onClick={() => applyFix('ignore')}
                  >
                    <FaCheckCircle />
                    Ignore for now
                    <small>Remind me later</small>
                  </button>
                </div>
                
                <button 
                  className="modal-close"
                  onClick={() => setShowResolveModal(false)}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Test Alert Reset Button - Appears when alert is resolved */}
      {!hasHighLeakage && isResolved && (
        <div className="test-reset-container">
          <button onClick={resetAlert} className="test-reset-btn">
            🔄 Test Alert Again
          </button>
        </div>
      )}

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="glass-card stat-item">
          <div className="stat-icon blue"><FaBolt /></div>
          <div>
            <p className="label">Total Consumption</p>
            <h3>{dailyConsumption.toFixed(1)} kWh</h3>
            <small className="sub-text">Today</small>
          </div>
        </div>
        <div className="glass-card stat-item">
          <div className="stat-icon purple"><FaPlug /></div>
          <div>
            <p className="label">Active Devices</p>
            <h3>{activeCount} / {devices.length}</h3>
            <small className="sub-text">{((activeCount/devices.length)*100).toFixed(0)}% active</small>
          </div>
        </div>
        <div className="glass-card stat-item">
          <div className="stat-icon green"><FaRupeeSign /></div>
          <div>
            <p className="label">Est. Monthly Bill</p>
            <h3>₹ {monthlyBill.toLocaleString()}</h3>
            <small className="sub-text">Based on current usage</small>
          </div>
        </div>
      </div>

      {/* Analysis Section */}
      <div className="analysis-section">
        <div className="glass-card chart-main">
          <div className="chart-header">
            <h4>Power Analysis - {activeTab} View</h4>
            <div className="toggle-group">
              {['Daily', 'Weekly', 'Monthly'].map(tab => (
                <button 
                  key={tab} 
                  className={activeTab === tab ? 'active' : ''} 
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <AreaChart data={powerData}>
                <defs>
                  <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00e5ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00e5ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  stroke="#94a3b8" 
                  fontSize={12} 
                />
                <YAxis 
                  stroke="#94a3b8" 
                  fontSize={12}
                  label={{ 
                    value: 'kWh', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { fill: '#94a3b8' }
                  }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a202c', border: 'none' }} 
                  formatter={(value) => [`${value} kWh`, 'Consumption']}
                  labelFormatter={(label) => `${activeTab}: ${label}`}
                />
                <Area 
                  type="monotone" 
                  dataKey="usage" 
                  stroke="#00e5ff" 
                  fill="url(#colorUsage)" 
                  strokeWidth={3} 
                  name="Consumption"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-footer">
            <small className="chart-note">
              {activeTab === 'Daily' && 'Hourly consumption pattern based on active devices'}
              {activeTab === 'Weekly' && 'Daily average consumption for the week'}
              {activeTab === 'Monthly' && 'Weekly consumption trend'}
            </small>
          </div>
        </div>

        <div className="glass-card load-dist">
          <h4>Load Distribution</h4>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie 
                  data={loadData} 
                  innerRadius={60} 
                  outerRadius={80} 
                  paddingAngle={5} 
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {loadData.map((entry, index) => 
                    <Cell key={index} fill={entry.color} />
                  )}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a202c', border: 'none' }}
                  formatter={(value) => [`${value}%`, 'Share']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="legend">
            {loadData.map(item => (
              <div key={item.name} className="legend-item">
                <span className="dot" style={{ backgroundColor: item.color }}></span>
                <span className="name">{item.name}</span>
                <span className="val">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Control Section */}
      <h4 className="section-title">Quick Control</h4>
      <div className="control-grid">
        {devices.map(device => (
          <div key={device.id} className={`glass-card control-item ${device.active ? 'active' : ''}`}>
            <div className="control-header">
              <div className="icon-circle">{getIcon(device.icon)}</div>
              <div className={`status-pill ${device.active ? 'on' : 'off'}`}>
                {device.active ? 'ON' : 'OFF'}
              </div>
            </div>
            <h5>{device.name}</h5>
            <p className="room-label">{device.room}</p>
            <p className="power-label">{device.power} kW</p>
            <button 
              className={`toggle-action ${device.active ? 'btn-off' : 'btn-on'}`} 
              onClick={() => toggleDevice(device.id)}
            >
              {device.active ? 'Switch Off' : 'Switch On'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;