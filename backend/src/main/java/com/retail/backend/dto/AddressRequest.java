package com.retail.backend.dto;

public record AddressRequest(
        String type,
        String address,
        boolean isDefault
) {}
