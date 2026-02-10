package com.retail.backend.dto;

public class OrderShippingAddressResponse {

    private String type;
    private String address;

    public OrderShippingAddressResponse(String type, String address) {
        this.type = type;
        this.address = address;
    }

    public String getType() {
        return type;
    }

    public String getAddress() {
        return address;
    }
}
