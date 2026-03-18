package com.smartenergy.system.dto;

public class OtpRequestDto {
    private String email;
    private String purpose; // Optional: "REGISTRATION" or "PASSWORD_RESET"
    
    public OtpRequestDto() {
    }
    
    public OtpRequestDto(String email) {
        this.email = email;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPurpose() {
        return purpose;
    }
    
    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

}
