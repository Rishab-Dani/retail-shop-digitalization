package com.retail.backend.controller;

import com.retail.backend.dto.*;
import com.retail.backend.entity.OrderStatus;
import com.retail.backend.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
@Tag(
        name = "Customer Orders",
        description = "Customer order placement and tracking APIs"
)
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
                orderService.placeOrder(
                        email,
                        request.getTotalAmount(),
                        request.getAddressId()
                );

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
    @Operation(summary = "Get paginated customer orders (summary view)")
    @GetMapping
    public Page<OrderSummaryResponse> getCustomerOrders(
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

    @Operation(summary = "Get paginated customer orders (summary view)")
    @GetMapping("/orders")
    public Page<OrderSummaryResponse> getMyOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir,
            Authentication authentication
    ) {
        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(Sort.Direction.fromString(sortDir), sortBy)
        );

        return orderService.getMyOrdersSummary(
                authentication.getName(),
                pageable
        );
    }

//    @Operation(summary = "Get paginated customer orders (summary view)")
//    @GetMapping("/{orderId}")
//    public ResponseEntity<OrderDetailsResponse> getOrder(
//            @PathVariable UUID orderId,
//            Authentication authentication
//    ) {
//        return ResponseEntity.ok(
//                orderService.getOrderByIdForCustomer(
//                        orderId,
//                        authentication.getName()
//                )
//        );
//    }

    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<String> cancelOrder(
            @PathVariable UUID orderId,
            Authentication authentication
    ) {
        orderService.cancelOrder(orderId);
        return ResponseEntity.ok("Order cancelled successfully");
    }

    @Operation(summary = "Get paginated customer orders (summary view)")
    @GetMapping("/details")
    public Page<OrderDetailsResponse> getMyOrdersWithAddress(
            Pageable pageable,
            Authentication auth
    ) {
        return orderService.getCustomerOrdersWithAddress(auth.getName(), pageable);
    }

    @Operation(
            summary = "Get order details by ID",
            description = "Returns full order details including shipping address and items"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Order found successfully",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(value = """
                {
                  "orderId": "17c6d9a9-fd47-4d2b-9ba3-0c6eed9caf58",
                  "createdAt": "2026-02-09T00:04:01",
                  "status": "PLACED",
                  "totalAmount": 1499,
                  "items": [
                    {
                      "itemId": "21bab716-c267-4d11-9b8c-95eb9f45150e",
                      "productId": 1,
                      "productName": "Asus V15 vivo book",
                      "quantity": 3,
                      "price": 40000
                    }
                  ],
                  "shippingAddress": {
                    "type": "HOME",
                    "address": "Flat 301, MG Road, Bangalore"
                  }
                }
            """)
                    )
            ),
            @ApiResponse(responseCode = "404", description = "Order not found")
    })
    @GetMapping("/{orderId}")
    public OrderDetailsResponse getOrderById(
            @PathVariable UUID orderId,
            Authentication authentication
    ) {
        return orderService.getOrderByIdForCustomer(orderId, authentication.getName());
    }

}
