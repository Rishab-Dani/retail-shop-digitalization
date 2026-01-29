package com.retail.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record OrderDetailsResponse(
        UUID orderId,
        LocalDateTime createdAt,
        String status,
        BigDecimal totalAmount,
        List<OrderItemResponse> items
) {}
