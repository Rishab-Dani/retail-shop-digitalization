package com.retail.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public record OrderSummaryResponse(
        UUID orderId,
        LocalDateTime createdAt,
        String status,
        BigDecimal totalAmount,
        long itemCount
) {}

