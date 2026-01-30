package com.retail.backend.dto;

import java.time.LocalDateTime;

public class CustomerProfileResponse {

    private String name;
    private String email;
    private String phone;
    private String avatarUrl;
    private String role;
    private boolean enabled;
    private LocalDateTime createdAt;

    public CustomerProfileResponse(
            String name,
            String email,
            String phone,
            String avatarUrl,
            String role,
            boolean enabled,
            LocalDateTime createdAt
    ) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.avatarUrl = avatarUrl;
        this.role = role;
        this.enabled = enabled;
        this.createdAt = createdAt;
    }

    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public String getAvatarUrl() { return avatarUrl; }
    public String getRole() { return role; }
    public boolean isEnabled() { return enabled; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
