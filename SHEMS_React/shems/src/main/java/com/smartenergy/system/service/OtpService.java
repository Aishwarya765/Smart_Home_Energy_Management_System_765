package com.smartenergy.system.service;

import java.security.SecureRandom;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class OtpService {

    @Autowired
    private JavaMailSender mailSender;
    
    // Store OTPs with email as key
    private final ConcurrentHashMap<String, OtpData> otpStorage = new ConcurrentHashMap<>();
    private final SecureRandom random = new SecureRandom();
    
    // OTP expiry time in milliseconds (5 minutes)
    private static final long OTP_EXPIRY_MS = 5 * 60 * 1000;
    
    // Inner class to store OTP with timestamp
    private static class OtpData {
        String otp;
        long creationTime;
        String purpose;
        
        OtpData(String otp, String purpose) {
            this.otp = otp;
            this.creationTime = System.currentTimeMillis();
            this.purpose = purpose;
        }
        
        // Check if OTP is expired
        boolean isExpired() {
            return System.currentTimeMillis() - creationTime > OTP_EXPIRY_MS;
        }
    }
    
    // Generate 6-digit OTP
    private String generateOtp() {
        return String.valueOf(100000 + random.nextInt(900000));
    }
    
    // Send OTP email with Smart Home Energy Management branding
    public void sendOtpEmail(String toEmail, String otp, String purpose) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("🔐 Smart Home Energy - " + getPurposeDisplayName(purpose) + " OTP");
            
            String emailBody = String.format(
                "Hello,\n\n" +
                "Your OTP for %s is: %s\n\n" +
                "This code will expire in 5 minutes.\n\n" +
                "If you didn't request this, please ignore this email.\n\n" +
                "Thank you,\n" +
                "Smart Home Energy Management System",
                getPurposeDisplayName(purpose), otp
            );
            
            message.setText(emailBody);
            mailSender.send(message);
            System.out.println("✅ Email sent successfully to: " + toEmail);
            
        } catch (Exception e) {
            System.out.println("❌ Failed to send email to: " + toEmail);
            System.out.println("Error: " + e.getMessage());
            throw new RuntimeException("Failed to send email: " + e.getMessage());
        }
    }
    
    private String getPurposeDisplayName(String purpose) {
        if ("REGISTRATION".equals(purpose)) {
            return "Registration";
        } else if ("PASSWORD_RESET".equals(purpose)) {
            return "Password Reset";
        }
        return purpose;
    }
    
    // Generate and send OTP
    public String generateAndSendOtp(String email, String purpose) {
        // Clean up any expired OTPs for this email first
        cleanupExpiredOtps(email);
        
        // Check if OTP already exists and is still valid (less than 5 minutes old)
        OtpData existing = otpStorage.get(email);
        if (existing != null && !existing.isExpired()) {
            // Resend existing OTP instead of generating new one
            System.out.println("📧 Resending existing OTP to " + email + " for " + purpose);
            sendOtpEmail(email, existing.otp, purpose);
            return existing.otp;
        }
        
        // Generate new OTP
        String otp = generateOtp();
        otpStorage.put(email, new OtpData(otp, purpose));
        sendOtpEmail(email, otp, purpose);
        
        // For debugging
        System.out.println("📧 New OTP generated for " + email + " (" + purpose + "): " + otp);
        
        return otp;
    }
    
    // Verify OTP
    public boolean verifyOtp(String email, String enteredOtp, String purpose) {
        OtpData stored = otpStorage.get(email);
        
        if (stored == null) {
            System.out.println("❌ No OTP found for " + email);
            return false;
        }
        
        // Check if OTP has expired
        if (stored.isExpired()) {
            System.out.println("❌ OTP expired for " + email);
            otpStorage.remove(email);
            return false;
        }
        
        // Check if purpose matches
        if (!stored.purpose.equals(purpose)) {
            System.out.println("❌ Purpose mismatch for " + email + 
                             ". Expected: " + purpose + ", Found: " + stored.purpose);
            return false;
        }
        
        // Verify OTP
        if (stored.otp.equals(enteredOtp)) {
            otpStorage.remove(email); // Remove after successful verification
            System.out.println("✅ OTP verified successfully for " + email);
            return true;
        }
        
        System.out.println("❌ Invalid OTP for " + email + ". Expected: " + stored.otp + ", Received: " + enteredOtp);
        return false;
    }
    
    // Resend OTP - IMPROVED VERSION
    public boolean resendOtp(String email, String purpose) {
        System.out.println("🔄 Resend requested for: " + email + " with purpose: " + purpose);
        
        OtpData existing = otpStorage.get(email);
        
        if (existing == null) {
            System.out.println("❌ No OTP found in storage for: " + email);
            return false;
        }
        
        System.out.println("Found OTP: " + existing.otp + ", Purpose: " + existing.purpose + 
                          ", Age: " + (System.currentTimeMillis() - existing.creationTime)/1000 + " seconds");
        
        // Check if purpose matches
        if (!existing.purpose.equals(purpose)) {
            System.out.println("❌ Purpose mismatch. Requested: " + purpose + ", Stored: " + existing.purpose);
            return false;
        }
        
        // Check if OTP is expired
        if (existing.isExpired()) {
            System.out.println("❌ OTP expired for: " + email);
            otpStorage.remove(email);
            return false;
        }
        
        // Resend the same OTP
        try {
            sendOtpEmail(email, existing.otp, purpose);
            System.out.println("✅ OTP resent successfully to " + email);
            return true;
        } catch (Exception e) {
            System.out.println("❌ Failed to resend OTP: " + e.getMessage());
            return false;
        }
    }
    
    // Helper method to clean up expired OTPs
    private void cleanupExpiredOtps(String email) {
        OtpData existing = otpStorage.get(email);
        if (existing != null && existing.isExpired()) {
            System.out.println("🧹 Removing expired OTP for: " + email);
            otpStorage.remove(email);
        }
    }
    
    // Get remaining validity time in seconds (useful for debugging)
    public long getRemainingTime(String email) {
        OtpData existing = otpStorage.get(email);
        if (existing == null) return 0;
        long remainingMs = OTP_EXPIRY_MS - (System.currentTimeMillis() - existing.creationTime);
        return remainingMs > 0 ? remainingMs / 1000 : 0;
    }
    
    // Check if OTP exists and is valid (useful for debugging)
    public boolean hasValidOtp(String email, String purpose) {
        OtpData existing = otpStorage.get(email);
        return existing != null && 
               existing.purpose.equals(purpose) && 
               !existing.isExpired();
    }
}