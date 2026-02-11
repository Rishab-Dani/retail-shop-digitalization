package com.retail.backend.controller;

import com.retail.backend.dto.AddOrderItemsRequest;
import com.retail.backend.dto.OrderDetailsResponse;
import com.retail.backend.dto.OrderSummaryResponse;
import com.retail.backend.entity.Order;
import com.retail.backend.entity.OrderStatus;
import com.retail.backend.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
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
@RequestMapping("/api/admin/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }


    // ✅ FIXED ENDPOINT
    @PostMapping("/{orderId}/items")
    public ResponseEntity<String> addItems(
            @PathVariable UUID orderId,
             @Valid @RequestBody AddOrderItemsRequest request
    ) {
        orderService.addItemsToOrder(orderId, request);
        return ResponseEntity.ok("Order items added successfully");
    }

    // GET /api/orders?page=0&size=5
    @Operation(summary = "Get paginated customer orders (summary view)")
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<OrderSummaryResponse>> getOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir
    ) {
        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(Sort.Direction.fromString(sortDir), sortBy)
        );

        return ResponseEntity.ok(
                orderService.getAllOrdersSummary(pageable)
        );
    }

    @Operation(summary = "Get paginated customer orders (summary view)")
    @GetMapping("/{orderId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<OrderDetailsResponse> getOrder(
            @PathVariable UUID orderId
    ) {
        return ResponseEntity.ok(
                orderService.getOrderDetailsForAdmin(orderId)
        );
    }


//    @PreAuthorize("hasAnyRole('ADMIN','CUSTOMER')")
//    @PutMapping("/{orderId}/cancel")
//    public ResponseEntity<String> cancelOrder(
//            @PathVariable UUID orderId,
//            Authentication authentication
//    ) {
//        orderService.cancelOrder(orderId);
//        return ResponseEntity.ok("Order cancelled successfully");
//    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{orderId}/status")
    public ResponseEntity<String> updateOrderStatus(
            @PathVariable UUID orderId,
            @RequestParam OrderStatus status
    ) {
        orderService.updateOrderStatus(orderId, status);
        return ResponseEntity.ok("Order status updated to " + status);
    }

    @Operation(summary = "Get paginated customer orders (summary view)")
    @GetMapping("/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<OrderSummaryResponse>> getOrdersByStatus(
            @RequestParam OrderStatus status,
            Pageable pageable
    ) {
        return ResponseEntity.ok(
                orderService.getOrdersByStatus(status, pageable)
        );
    }

    @GetMapping("/details")
    public Page<OrderDetailsResponse> getAllOrdersWithAddress(Pageable pageable) {
        return orderService.getAllOrdersWithAddress(pageable);
    }

}
