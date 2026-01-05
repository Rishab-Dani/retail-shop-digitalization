package com.retail.backend.dto;

import java.math.BigDecimal;
import java.util.List;

public class OrderRequest {

    private List<OrderItemRequest> items;

    public List<OrderItemRequest> getItems() {
        return items;
    }

    public void setItems(List<OrderItemRequest> items) {
        this.items = items;
    }
}


