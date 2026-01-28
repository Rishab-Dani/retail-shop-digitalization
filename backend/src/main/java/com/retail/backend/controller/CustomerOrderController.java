package com.retail.backend.controller;

import com.retail.backend.dto.AddOrderItemsRequest;
import com.retail.backend.dto.PlaceOrderRequest;
import com.retail.backend.entity.Order;
import com.retail.backend.entity.OrderStatus;
import com.retail.backend.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/customer/orders")
@PreAuthorize("hasRole('CUSTOMER')")
public class CustomerOrderController {

    private final OrderService orderService;

    public CustomerOrderController(OrderService orderService) {
        this.orderService = orderService;
    }
    @PostMapping("/{orderId}/items")
    public ResponseEntity<String> addItems(
            @PathVariable UUID orderId,
            @RequestBody AddOrderItemsRequest request,
            Authentication authentication
    ) {
        orderService.addItemsToOrder(orderId, request);
        return ResponseEntity.ok("Order items added successfully");
    }

    // ✅ PLACE ORDER (CUSTOMER)
    @PostMapping
    public Order placeOrder(
            @Valid @RequestBody PlaceOrderRequest request,
            Authentication authentication
    ) {
        return orderService.placeOrder(
                authentication.getName(),
                request.getTotalAmount()
        );
    }

    // ✅ GET CUSTOMER ORDERS (pagination + sorting + filtering)
    @GetMapping
    public Page<Order> getCustomerOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam(required = false) OrderStatus status,
            Authentication authentication
    ) {
        return orderService.getCustomerOrders(
                authentication.getName(),
                status,
                page,
                size,
                sortBy,
                sortDir
        );
    }

    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<String> cancelOrder(
            @PathVariable UUID orderId,
            Authentication authentication
    ) {
        orderService.cancelOrder(orderId);
        return ResponseEntity.ok("Order cancelled successfully");
    }

}
