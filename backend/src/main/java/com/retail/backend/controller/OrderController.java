package com.retail.backend.controller;

import com.retail.backend.dto.AddOrderItemsRequest;
import com.retail.backend.dto.OrderDetailsResponse;
import com.retail.backend.dto.OrderResponse;
import com.retail.backend.dto.PlaceOrderRequest;
import com.retail.backend.entity.Order;
import com.retail.backend.entity.OrderStatus;
import com.retail.backend.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }


    // ✅ FIXED ENDPOINT
    @PostMapping("/{orderId}/items")
    public ResponseEntity<String> addItems(
            @PathVariable UUID orderId,
            @RequestBody AddOrderItemsRequest request
    ) {
        orderService.addItemsToOrder(orderId, request);
        return ResponseEntity.ok("Order items added successfully");
    }

    // GET /api/orders?page=0&size=5
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','CUSTOMER')")
    public ResponseEntity<Page<Order>> getOrders(
            Authentication authentication,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "createdAt,desc") String sort
    ) {
        boolean isAdmin = authentication.getAuthorities()
                .stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(sort.split(",")[0]).descending()
        );

        return ResponseEntity.ok(
                orderService.getOrderHistory(
                        authentication.getName(),
                        isAdmin,
                        pageable
                )
        );
    }


    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDetailsResponse> getOrder(
            @PathVariable UUID orderId,
            Authentication authentication
    ) {
        return ResponseEntity.ok(
                orderService.getOrderById(
                        orderId,
                        authentication.getName()
                )
        );
    }



    @PreAuthorize("hasAnyRole('ADMIN','CUSTOMER')")
    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<String> cancelOrder(
            @PathVariable UUID orderId,
            Authentication authentication
    ) {
        orderService.cancelOrder(orderId);
        return ResponseEntity.ok("Order cancelled successfully");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{orderId}/status")
    public ResponseEntity<String> updateOrderStatus(
            @PathVariable UUID orderId,
            @RequestParam OrderStatus status
    ) {
        orderService.updateOrderStatus(orderId, status);
        return ResponseEntity.ok("Order status updated to " + status);
    }



    // GET /api/orders/status?status=CONFIRMED
    @GetMapping("/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Order>> getOrdersByStatus(
            @RequestParam OrderStatus status
    ) {
        return ResponseEntity.ok(
                orderService.getOrdersByStatus(status)
        );
    }

}
