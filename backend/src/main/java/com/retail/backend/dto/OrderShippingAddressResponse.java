package com.retail.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Shipping address snapshot stored with order")
public class OrderShippingAddressResponse {

    @Schema(description = "Address type (HOME / WORK)")
     private String type;

    @Schema(description = "Full address text")
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
