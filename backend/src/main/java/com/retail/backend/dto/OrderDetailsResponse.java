package com.retail.backend.dto;

import com.retail.backend.dto.OrderItemResponse;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record OrderDetailsResponse(
        UUID orderId,
        LocalDateTime createdAt,
        BigDecimal totalAmount,
        String status,
        List<OrderItemResponse> items
) {}
