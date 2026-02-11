package com.retail.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Schema(description = "Detailed order response including shipping address")
public record OrderDetailsResponse(

        @Schema(description = "Unique order identifier")
        UUID orderId,

        @Schema(description = "Order creation timestamp")
        LocalDateTime createdAt,

        @Schema(description = "Current order status")
        String status,

        @Schema(description = "Total order amount")
        BigDecimal totalAmount,

        @Schema(description = "List of ordered items")
        List<OrderItemResponse> items,

        @Schema(description = "Shipping address snapshot at order time")
        OrderShippingAddressResponse shippingAddress
) {}


