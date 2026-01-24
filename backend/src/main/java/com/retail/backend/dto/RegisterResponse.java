package com.retail.backend.dto;

public class RegisterResponse {

    private Long customerId;
    private String message;

    public RegisterResponse(Long customerId, String message) {
        this.customerId = customerId;
        this.message = message;
    }

    // getters & setters


    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
