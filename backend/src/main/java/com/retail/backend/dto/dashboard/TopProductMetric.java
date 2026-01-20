package com.retail.backend.dto.dashboard;

public class TopProductMetric {

    private String productName;
    private long quantitySold;

    public TopProductMetric(String productName, long quantitySold) {
        this.productName = productName;
        this.quantitySold = quantitySold;
    }

    public String getProductName() {
        return productName;
    }

    public long getQuantitySold() {
        return quantitySold;
    }
}
