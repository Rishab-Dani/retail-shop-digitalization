package com.retail.backend.dto;

import java.math.BigDecimal;

public class DashboardSummary {

    private long totalProducts;
    private long totalOrders;
    private BigDecimal totalRevenue;


    // analytics
    public DashboardSummary(long totalProducts, long totalOrders, BigDecimal totalRevenue) {
        this.totalProducts = totalProducts;
        this.totalOrders = totalOrders;
        this.totalRevenue = totalRevenue;
    }

    // getters
    public long getTotalProducts() {
        return totalProducts;
    }

    public long getTotalOrders() {
        return totalOrders;
    }

    public BigDecimal getTotalRevenue() {
        return totalRevenue;
    }


}
