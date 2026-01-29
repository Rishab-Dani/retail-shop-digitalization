package com.retail.backend.dto;

import java.math.BigDecimal;
import java.util.UUID;

public record OrderItemResponse(
        UUID itemId,
        Long productId,
        String productName,
        int quantity,
        BigDecimal price
) {}
