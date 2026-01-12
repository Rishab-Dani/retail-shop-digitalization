package com.retail.backend.dto;

public class DashboardSummary {

    private long totalProducts;
    private long totalOrders;
    private double totalRevenue;

    public DashboardSummary(long totalProducts,
                            long totalOrders,
                            double totalRevenue) {
        this.totalProducts = totalProducts;
        this.totalOrders = totalOrders;
        this.totalRevenue = totalRevenue;
    }

    public long getTotalProducts() {
        return totalProducts;
    }

    public long getTotalOrders() {
        return totalOrders;
    }

    public double getTotalRevenue() {
        return totalRevenue;
    }
}
