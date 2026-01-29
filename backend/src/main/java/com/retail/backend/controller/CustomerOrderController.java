package com.retail.backend.controller;

import com.retail.backend.dto.AddOrderItemsRequest;
import com.retail.backend.dto.OrderResponse;
import com.retail.backend.dto.PlaceOrderRequest;
import com.retail.backend.entity.Order;
import com.retail.backend.entity.OrderStatus;
import com.retail.backend.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/customer/orders")
@RequiredArgsConstructor
@PreAuthorize("hasRole('CUSTOMER')")
public class CustomerOrderController {

    private final OrderService orderService;


    //  PLACE ORDER (CUSTOMER)
    @PostMapping
    public ResponseEntity<OrderResponse> placeOrder(
           @Valid @RequestBody PlaceOrderRequest request
    ) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        OrderResponse response =
                orderService.placeOrder(email, request.getTotalAmount());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


    @PostMapping("/{orderId}/items")
    public ResponseEntity<String> addItems(
            @PathVariable UUID orderId,
            @RequestBody AddOrderItemsRequest request
    ) {
        orderService.addItemsToOrder(orderId, request);
        return ResponseEntity.ok("Order items added successfully");
    }


    //  GET CUSTOMER ORDERS (pagination + sorting + filtering)
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
