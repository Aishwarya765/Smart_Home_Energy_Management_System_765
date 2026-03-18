package com.smartenergy.system.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartenergy.system.dto.OtpRequestDto;
import com.smartenergy.system.dto.OtpVerificationDto;
import com.smartenergy.system.service.OtpService;

@RestController
@RequestMapping("/api/smart-energy/auth")
@CrossOrigin(origins = "*") // Allow frontend to call these APIs
public class AuthController {

    @Autowired
    private OtpService otpService;
    
    // Welcome message to confirm API is working
    @GetMapping("/hello")
    public String hello() {
        return "Welcome to Smart Home Energy Management System OTP Service!";
    }
    
    // Endpoint 1: Send OTP for New User Registration
    @PostMapping("/send-registration-otp")
    public ResponseEntity<?> sendRegistrationOtp(@RequestBody OtpRequestDto request) {
        try {
            String email = request.getEmail();
            
            // Here you would check if email is already registered in your database
            // if (userService.isEmailRegistered(email)) {
            //     return ResponseEntity.badRequest().body("Email already registered!");
            // }
            
            otpService.generateAndSendOtp(email, "REGISTRATION");
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "OTP sent successfully to " + email);
            response.put("email", email);
            response.put("purpose", "REGISTRATION");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to send OTP: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    // Endpoint 2: Verify OTP for Registration
    @PostMapping("/verify-registration-otp")
    public ResponseEntity<?> verifyRegistrationOtp(@RequestBody OtpVerificationDto request) {
        boolean isValid = otpService.verifyOtp(
            request.getEmail(), 
            request.getOtp(), 
            "REGISTRATION"
        );
        
        if (isValid) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "OTP verified successfully! You can now complete registration.");
            response.put("email", request.getEmail());
            response.put("verified", true);
            return ResponseEntity.ok(response);
        } else {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "Invalid or expired OTP. Please try again.");
            error.put("verified", false);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }
    
    // Endpoint 3: Send OTP for Password Reset
    @PostMapping("/send-password-reset-otp")
    public ResponseEntity<?> sendPasswordResetOtp(@RequestBody OtpRequestDto request) {
        try {
            String email = request.getEmail();
            
            // Here you would check if email exists in your database
            // if (!userService.isEmailRegistered(email)) {
            //     return ResponseEntity.badRequest().body("Email not found!");
            // }
            
            otpService.generateAndSendOtp(email, "PASSWORD_RESET");
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Password reset OTP sent to " + email);
            response.put("email", email);
            response.put("purpose", "PASSWORD_RESET");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to send OTP: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    // Endpoint 4: Verify OTP for Password Reset
    @PostMapping("/verify-password-reset-otp")
    public ResponseEntity<?> verifyPasswordResetOtp(@RequestBody OtpVerificationDto request) {
        boolean isValid = otpService.verifyOtp(
            request.getEmail(), 
            request.getOtp(), 
            "PASSWORD_RESET"
        );
        
        if (isValid) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "OTP verified. You can now reset your password.");
            response.put("email", request.getEmail());
            response.put("verified", true);
            response.put("resetToken", generateTempToken()); // Optional: generate temporary token
            return ResponseEntity.ok(response);
        } else {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "Invalid or expired OTP. Please request a new one.");
            error.put("verified", false);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }
    
    // Endpoint 5: Resend OTP
    @PostMapping("/resend-otp")
    public ResponseEntity<?> resendOtp(@RequestBody OtpRequestDto request) {
        boolean resent = otpService.resendOtp(request.getEmail(), request.getPurpose());
        
        if (resent) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "OTP resent successfully");
            return ResponseEntity.ok(response);
        } else {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", "No active OTP found. Please request a new one.");
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    // Helper method - in real app, you'd use JWT or similar
    private String generateTempToken() {
        return "temp-token-" + System.currentTimeMillis();
    }
}