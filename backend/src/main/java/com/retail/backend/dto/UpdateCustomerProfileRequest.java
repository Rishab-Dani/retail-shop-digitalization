package com.retail.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class UpdateCustomerProfileRequest {

    @NotBlank(message = "Name cannot be empty")
    private String name;

    @Pattern(
            regexp = "^[6-9]\\d{9}$",
            message = "Invalid phone number"
    )
    private String phone;

    private String avatarUrl;

    public String getName() { return name; }
    public String getPhone() { return phone; }
    public String getAvatarUrl() { return avatarUrl; }

    public void setName(String name) { this.name = name; }
    public void setPhone(String phone) { this.phone = phone; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
}
