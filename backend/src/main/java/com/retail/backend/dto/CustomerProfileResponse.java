package com.retail.backend.dto;


public class CustomerProfileResponse {

    private String name;
    private String email;
    private String role;
    private boolean enabled;

    public CustomerProfileResponse(
            String name,
            String email,
            String role,
            boolean enabled
    ) {
        this.name = name;
        this.email = email;
        this.role = role;
        this.enabled = enabled;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public boolean isEnabled() {
        return enabled;
    }
}
