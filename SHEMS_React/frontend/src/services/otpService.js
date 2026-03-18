import axios from 'axios';

const API_BASE_URL = 'http://localhost:9090/api/smart-energy/auth';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const otpService = {
  // Send registration OTP
  sendRegistrationOtp: (email) => {
    return api.post('/send-registration-otp', { email });
  },

  // Verify registration OTP
  verifyRegistrationOtp: (email, otp) => {
    return api.post('/verify-registration-otp', { email, otp });
  },

  // Send password reset OTP
  sendPasswordResetOtp: (email) => {
    return api.post('/send-password-reset-otp', { email });
  },

  // Verify password reset OTP
  verifyPasswordResetOtp: (email, otp) => {
    return api.post('/verify-password-reset-otp', { email, otp });
  },

  // Resend OTP
  resendOtp: (email, purpose) => {
    return api.post('/resend-otp', { email, purpose });
  }
};

export default otpService;