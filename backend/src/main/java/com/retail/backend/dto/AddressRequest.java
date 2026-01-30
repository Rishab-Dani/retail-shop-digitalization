package com.retail.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AddressRequest(
        @NotNull
        String type,

        @NotBlank(message = "Address cannot be empty")
        @Size(min = 10, message = "Address must be at least 10 characters")
        String address,

        boolean isDefault
) {}
