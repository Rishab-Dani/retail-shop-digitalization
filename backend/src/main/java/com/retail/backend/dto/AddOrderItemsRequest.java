package com.retail.backend.dto;

import java.util.List;

public class AddOrderItemsRequest {
    private List<AddOrderItemRequest> items;

    public List<AddOrderItemRequest> getItems() {
        return items;
    }

    public void setItems(List<AddOrderItemRequest> items) {
        this.items = items;
    }
}
