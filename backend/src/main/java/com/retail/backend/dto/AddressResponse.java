package com.retail.backend.dto;

import java.util.UUID;

public record AddressResponse(
        UUID id,
        String type,
        String address,
        boolean isDefault
) {}
