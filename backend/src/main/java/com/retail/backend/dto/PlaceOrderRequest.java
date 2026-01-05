package com.retail.backend.dto;

import java.math.BigDecimal;

public class PlaceOrderRequest {
    private BigDecimal totalAmount;

    // getter & setter

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }
}
