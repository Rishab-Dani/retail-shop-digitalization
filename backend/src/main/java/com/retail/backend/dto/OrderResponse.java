package com.retail.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;


public record OrderResponse(
        UUID orderId,
        LocalDateTime createdAt,
        BigDecimal totalAmount,
        String status,
        UUID addressId
) {}

