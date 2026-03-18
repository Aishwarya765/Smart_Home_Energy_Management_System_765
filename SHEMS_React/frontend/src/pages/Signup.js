import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import "../styles/Form.css";
import signupBg from "../assets/signup-bg.jpg";
import otpService from "../services/otpService";

function Signup() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: form, 2: otp verification
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    address: "",
    interest: "",
    password: "",
    confirmPassword: ""
  });

  const [otp, setOtp] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Step 1: Validate and send OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Validate address
    const words = formData.address.trim().split(" ").filter(word => word !== "");
    if (words.length < 2) {
      setErrorMsg("Address must contain at least two words.");
      return;
    }

    // Validate password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,20}$/;
    if (!passwordRegex.test(formData.password)) {
      setErrorMsg(
        "Password must be 8-20 characters with uppercase, lowercase, number & special character."
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    // Send OTP to email
    setLoading(true);
    try {
      await otpService.sendRegistrationOtp(formData.email);
      toast.success('OTP sent to your email!');
      setStep(2); // Move to OTP verification step
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP and complete registration
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      toast.error('Please enter 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      await otpService.verifyRegistrationOtp(formData.email, otp);
      
      // OTP verified - save user data
      localStorage.setItem("user", JSON.stringify(formData));
      toast.success('Registration Successful!');
      
      // Redirect to login after short delay
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setLoading(true);
    try {
      await otpService.resendOtp(formData.email, 'REGISTRATION');
      toast.success('OTP resent successfully!');
    } catch (error) {
      toast.error('Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Toaster position="top-center" />
      
      {/* Background */}
      <div
        className="page-background"
        style={{ backgroundImage: `url(${signupBg})` }}
      ></div>

      {/* Dark Overlay */}
      <div className="overlay"></div>

      {/* Glass Card */}
      <div className="main-card">
        <h1>Smart Home Energy</h1>
        
        {step === 1 ? (
          <>
            <h2>Create Your Account</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  name="fname"
                  placeholder="First Name"
                  value={formData.fname}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <input
                  name="lname"
                  placeholder="Last Name"
                  value={formData.lname}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <input
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <textarea
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <select name="interest" value={formData.interest} onChange={handleChange} required>
                  <option value="">Select Primary Interest</option>
                  <option>Energy Consumption Monitoring</option>
                  <option>Cost Optimization</option>
                  <option>Automation & Smart Control</option>
                  <option>Renewable Energy Integration</option>
                  <option>Sustainability & Environmental Impact</option>
                </select>
              </div>

              <div className="input-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              {errorMsg && <p className="error">{errorMsg}</p>}

              <button type="submit" disabled={loading}>
                {loading ? 'Sending OTP...' : 'Sign Up'}
              </button>

              <p style={{ marginTop: "15px" }}>
                Already registered? <Link to="/login">Login here</Link>
              </p>
            </form>
          </>
        ) : (
          <>
            <h2>Verify Your Email</h2>
            <p style={{ color: '#fff', marginBottom: '20px' }}>
              OTP sent to: <strong>{formData.email}</strong>
            </p>
            
            <form onSubmit={handleVerifyOtp}>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  maxLength="6"
                  required
                />
              </div>

              <button type="submit" disabled={loading}>
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>

              <div style={{ marginTop: '15px', textAlign: 'center' }}>
                <button 
                  type="button"
                  onClick={handleResendOtp}
                  disabled={loading}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#00E5FF',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Resend OTP
                </button>
              </div>

              <p style={{ marginTop: "15px" }}>
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#00E5FF',
                    cursor: 'pointer'
                  }}
                >
                  ← Back to registration
                </button>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Signup;