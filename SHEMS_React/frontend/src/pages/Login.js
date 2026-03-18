import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import "../styles/Form.css";
import loginBg from "../assets/login-bg.jpg";
import otpService from "../services/otpService";

function Login() {
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetOtp, setResetOtp] = useState("");
  const [resetStep, setResetStep] = useState(1); // 1: email, 2: otp
  const [loading, setLoading] = useState(false);

  // Normal login submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      setError("No registered user found. Please sign up first.");
      return;
    }

    if (
      (input === storedUser.email || input === storedUser.phone) &&
      password === storedUser.password
    ) {
      // Clear any previous user data first
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('activeUser');
      
      // Set new user data
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("activeUser", storedUser.fname);
      // Make sure full user data is stored
      localStorage.setItem("user", JSON.stringify(storedUser));
      
      toast.success('Login successful!');
      
      // Force a small delay to ensure localStorage is updated
      setTimeout(() => {
        navigate("/dashboard");
        window.location.reload(); // Force reload to update navbar with new user
      }, 100);
    } else {
      setError("Invalid email/phone or password.");
    }
  };

  // Forgot Password - Send OTP
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Check if email exists in localStorage
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser || storedUser.email !== resetEmail) {
        toast.error('Email not found');
        setLoading(false);
        return;
      }
      
      await otpService.sendPasswordResetOtp(resetEmail);
      toast.success('Password reset OTP sent to your email!');
      setResetStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Email not found');
    } finally {
      setLoading(false);
    }
  };

  // Forgot Password - Verify OTP
  const handleVerifyResetOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await otpService.verifyPasswordResetOtp(resetEmail, resetOtp);
      toast.success('OTP verified! Please reset your password.');
      
      // Here you would redirect to password reset page
      // For now, just close the forgot password modal
      setTimeout(() => {
        setShowForgotPassword(false);
        setResetStep(1);
        setResetEmail("");
        setResetOtp("");
        
        // Pre-fill the email in login form
        setInput(resetEmail);
      }, 2000);
      
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
      await otpService.resendOtp(resetEmail, 'PASSWORD_RESET');
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
        style={{ backgroundImage: `url(${loginBg})` }}
      ></div>

      {/* Overlay */}
      <div className="overlay"></div>

      {/* Glass Card */}
      <div className="main-card">
        <h1>Smart Home Energy</h1>
        
        {!showForgotPassword ? (
          <>
            <h2>Login to Continue</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Email or Phone"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  required
                />
              </div>

              <div className="input-group" style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    fontSize: "13px",
                    color: "#00E5FF"
                  }}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>

              {error && <p className="error">{error}</p>}

              <button type="submit">Login</button>

              <div style={{ marginTop: "10px", textAlign: "right" }}>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#00E5FF",
                    cursor: "pointer",
                    textDecoration: "underline",
                    fontSize: "14px"
                  }}
                >
                  Forgot Password?
                </button>
              </div>

              <p style={{ marginTop: "15px" }}>
                New user? <Link to="/signup">Sign up here</Link>
              </p>
            </form>
          </>
        ) : (
          <>
            <h2>Reset Password</h2>
            
            {resetStep === 1 ? (
              <form onSubmit={handleForgotPassword}>
                <div className="input-group">
                  <input
                    type="email"
                    placeholder="Enter your registered email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                  />
                </div>
                
                <button type="submit" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Reset OTP'}
                </button>
                
                <p style={{ marginTop: "15px" }}>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(false);
                      setResetStep(1);
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#00E5FF",
                      cursor: "pointer"
                    }}
                  >
                    ← Back to login
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={handleVerifyResetOtp}>
                <p style={{ color: '#fff', marginBottom: '15px' }}>
                  OTP sent to: <strong>{resetEmail}</strong>
                </p>
                
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={resetOtp}
                    onChange={(e) => setResetOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
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
                    onClick={() => setResetStep(1)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#00E5FF",
                      cursor: "pointer"
                    }}
                  >
                    ← Back
                  </button>
                </p>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Login;