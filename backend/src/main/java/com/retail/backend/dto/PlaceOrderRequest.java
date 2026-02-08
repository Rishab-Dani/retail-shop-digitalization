package com.retail.backend.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.util.UUID;

public class PlaceOrderRequest {
    @NotNull(message = "Total amount is required")
    @Positive(message = "Amount must be positive")
    private BigDecimal totalAmount;

    @NotNull
    private UUID addressId;

    // getter & setter

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public UUID getAddressId() {
        return addressId;
    }

}
