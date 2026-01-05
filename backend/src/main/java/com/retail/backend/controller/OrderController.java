package com.retail.backend.controller;

import com.retail.backend.dto.OrderRequest;
import com.retail.backend.dto.PlaceOrderRequest;
import com.retail.backend.entity.Order;
import com.retail.backend.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<?> placeOrder(
            @RequestBody PlaceOrderRequest request,
            Authentication authentication
    ) {
        String email = authentication.getName();

        Order order = orderService.placeOrder(
                email,
                request.getTotalAmount()
        );

        return ResponseEntity.ok(order);
    }
}
