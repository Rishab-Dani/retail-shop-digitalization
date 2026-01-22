package com.retail.backend.dto;

import jakarta.validation.constraints.NotBlank;

public class UpdateCustomerProfileRequest {

    @NotBlank(message = "Name cannot be empty")
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
