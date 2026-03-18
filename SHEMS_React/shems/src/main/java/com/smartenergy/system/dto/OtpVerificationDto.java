package com.smartenergy.system.dto;

public class OtpVerificationDto {
     private String email;
    private String otp;
    private String purpose; // To know if it's for registration or password reset
    
    public OtpVerificationDto() {
    }
    
    public OtpVerificationDto(String email, String otp, String purpose) {
        this.email = email;
        this.otp = otp;
        this.purpose = purpose;
    }
    
    // Getters and Setters
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getOtp() {
        return otp;
    }
    
    public void setOtp(String otp) {
        this.otp = otp;
    }
    
    public String getPurpose() {
        return purpose;
    }
    
    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

}
