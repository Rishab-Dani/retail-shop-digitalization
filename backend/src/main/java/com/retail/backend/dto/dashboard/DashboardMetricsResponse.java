package com.retail.backend.dto.dashboard;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public class DashboardMetricsResponse {

    // existing / base metrics
    private long totalOrders;
    private long totalCustomers;
    private BigDecimal totalRevenue;

    // advanced metrics
    private Map<String, BigDecimal> revenueByStatus;
    private List<DailyMetric> dailyOrders;
    private List<DailyMetric> dailyRevenue;
    private List<TopProductMetric> topProducts;

    // getters & setters
    public long getTotalOrders() {
        return totalOrders;
    }

    public void setTotalOrders(long totalOrders) {
        this.totalOrders = totalOrders;
    }

    public long getTotalCustomers() {
        return totalCustomers;
    }

    public void setTotalCustomers(long totalCustomers) {
        this.totalCustomers = totalCustomers;
    }

    public BigDecimal getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(BigDecimal totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public Map<String, BigDecimal> getRevenueByStatus() {
        return revenueByStatus;
    }

    public void setRevenueByStatus(Map<String, BigDecimal> revenueByStatus) {
        this.revenueByStatus = revenueByStatus;
    }

    public List<DailyMetric> getDailyOrders() {
        return dailyOrders;
    }

    public void setDailyOrders(List<DailyMetric> dailyOrders) {
        this.dailyOrders = dailyOrders;
    }

    public List<DailyMetric> getDailyRevenue() {
        return dailyRevenue;
    }

    public void setDailyRevenue(List<DailyMetric> dailyRevenue) {
        this.dailyRevenue = dailyRevenue;
    }

    public List<TopProductMetric> getTopProducts() {
        return topProducts;
    }

    public void setTopProducts(List<TopProductMetric> topProducts) {
        this.topProducts = topProducts;
    }
}
