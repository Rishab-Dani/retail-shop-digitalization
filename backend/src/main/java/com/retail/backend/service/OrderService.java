package com.retail.backend.service;

import com.retail.backend.dto.*;
import com.retail.backend.entity.*;
import com.retail.backend.exception.AccessDeniedException;
import com.retail.backend.exception.BusinessException;
import com.retail.backend.exception.ResourceNotFoundException;
import com.retail.backend.repository.*;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final OrderItemRepository orderItemRepository;
    private final CustomerRepository customerRepository;


    public OrderService(
            OrderRepository orderRepository,
            ProductRepository productRepository,
            OrderItemRepository orderItemRepository,
            CustomerRepository customerRepository
    ) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.orderItemRepository = orderItemRepository;
        this.customerRepository = customerRepository;
    }

    // STEP 1: Place Order
    @Transactional
    public OrderResponse placeOrder(String email, BigDecimal totalAmount) {

        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        Order order = new Order();
        order.setCustomer(customer);
        order.setStatus(OrderStatus.PLACED);
        order.setTotalAmount(totalAmount);

        Order saved = orderRepository.save(order);

        return new OrderResponse(
                saved.getId(),
                saved.getCreatedAt(),
                saved.getTotalAmount(),
                saved.getStatus().name()
        );
    }

    @Transactional
    public void addItemsToOrder(UUID orderId, AddOrderItemsRequest request) {

        // 1. Fetch order
        Order order = orderRepository.findByIdWithItems(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));


        if (order.getStatus() != OrderStatus.PLACED) {
            throw new BusinessException("Order cannot be modified after confirmation");
        }

        // 2. Loop items
        for (AddOrderItemRequest itemReq : request.getItems()) {

            // 3. Fetch product
            Product product = productRepository.findById(itemReq.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

            // 4. Stock validation
            if (product.getStockQuantity() < itemReq.getQuantity()) {
                throw new BusinessException(
                        "Insufficient stock for product: " + product.getName()
                );
            }

            // 5. Reduce stock
            product.setStockQuantity(
                    product.getStockQuantity() - itemReq.getQuantity()
            );

            // 6. Create OrderItem
            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setProduct(product);
            item.setQuantity(itemReq.getQuantity());
            item.setPrice(product.getPrice());

            order.getItems().add(item);

            // 7. Save child entities
            orderItemRepository.save(item);
            productRepository.save(product);
        }

        // ❌ DO NOT save(order)
    }

    @Transactional(readOnly = true)
    public List<Order> getOrders(
            String email,
            boolean isAdmin,
            OrderStatus status
    ) {

        if (isAdmin) {
            return (status == null)
                    ? orderRepository.findAll()
                    : orderRepository.findByStatus(status);
        }

        return (status == null)
                ? orderRepository.findByCustomer_Email(email)
                : orderRepository.findByCustomer_EmailAndStatus(email, status);

    }


    public OrderDetailsResponse getOrderByIdForCustomer(
            UUID orderId,
            String email
    ) {
        Order order = orderRepository.findOrderDetails(orderId, email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Order not found"));

        List<OrderItemResponse> items = order.getItems().stream()
                .map(i -> new OrderItemResponse(
                        i.getId(),
                        i.getProduct().getId(),
                        i.getProduct().getName(),
                        i.getQuantity(),
                        i.getPrice()
                ))
                .toList();

        return new OrderDetailsResponse(
                order.getId(),
                order.getCreatedAt(),
                order.getStatus().name(),
                order.getTotalAmount(),
                items
        );
    }


    public OrderDetailsResponse getOrderByIdForAdmin(
            UUID orderId
    ) {
        Order order = orderRepository.findOrderDetails(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Order not found"));

        List<OrderItemResponse> items = order.getItems().stream()
                .map(i -> new OrderItemResponse(
                        i.getId(),
                        i.getProduct().getId(),
                        i.getProduct().getName(),
                        i.getQuantity(),
                        i.getPrice()
                ))
                .toList();

        return new OrderDetailsResponse(
                order.getId(),
                order.getCreatedAt(),
                order.getStatus().name(),
                order.getTotalAmount(),
                items
        );
    }



    @Transactional
    public Order updateOrderStatus(UUID orderId, OrderStatus newStatus) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));


        OrderStatus currentStatus = order.getStatus();

        // 🔒 Simple business rule
        if (currentStatus == OrderStatus.CANCELLED ||
                currentStatus == OrderStatus.DELIVERED) {
            throw new BusinessException(
                    "Cannot change status after " + currentStatus
            );
        }

        validateOrderStatusTransition(order.getStatus(), newStatus);

        order.setStatus(newStatus);
        return orderRepository.save(order);

    }

    @Transactional
    public void cancelOrder(UUID orderId) {

        Order order = orderRepository.findByIdWithItems(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        // 🔐 FIX: Ownership check (ADD HERE)
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String loggedInEmail = authentication.getName();

        if (!order.getCustomer().getEmail().equals(loggedInEmail)) {
            throw new AccessDeniedException(
                    "You are not allowed to cancel this order"
            );
        }

        // 🚫 Status validation
        if (order.getStatus() != OrderStatus.PLACED &&
                order.getStatus() != OrderStatus.CONFIRMED) {
            throw new BusinessException(
                    "Order cannot be cancelled after " + order.getStatus()
            );
        }

        List<OrderItem> items = order.getItems();

        if (items == null || items.isEmpty()) {
            throw new BusinessException("No items found to restore stock");
        }

        // 🔄 Restore stock
        for (OrderItem item : items) {
            Product product = item.getProduct();
            product.setStockQuantity(
                    product.getStockQuantity() + item.getQuantity()
            );
            productRepository.save(product);
        }

        order.setStatus(OrderStatus.CANCELLED);
        orderRepository.save(order);
    }


    @Transactional(readOnly = true)
    public Page<Order> getOrderHistory(
            String email,
            boolean isAdmin,
            Pageable pageable
    ) {
        if (isAdmin) {
            return orderRepository.findAll(pageable);
        }
        return orderRepository.findByCustomer_Email(email, pageable);
    }

    @Transactional(readOnly = true)
    public List<Order> getOrdersByStatus(OrderStatus status) {
        return orderRepository.findByStatus(status);
    }

    private void validateOrderStatusTransition(OrderStatus current, OrderStatus next) {

        switch (current) {

            case PLACED -> {
                if (next != OrderStatus.CONFIRMED && next != OrderStatus.CANCELLED) {
                    throw new BusinessException("Invalid status transition from PLACED");
                }
            }

            case CONFIRMED -> {
                if (next != OrderStatus.SHIPPED && next != OrderStatus.CANCELLED) {
                    throw new BusinessException("Invalid status transition from CONFIRMED");
                }
            }

            case SHIPPED -> {
                if (next != OrderStatus.DELIVERED) {
                    throw new BusinessException("Invalid status transition from SHIPPED");
                }
            }

            case DELIVERED, CANCELLED -> {
                throw new BusinessException("Order is already completed");
            }
        }
    }

    @Transactional(readOnly = true)
    public Page<OrderSummaryResponse> getCustomerOrders(
            String email,
            OrderStatus status,
            int page,
            int size,
            String sortBy,
            String sortDir
    ) {
        Pageable pageable = PageRequest.of(
                page,
                size,
                sortDir.equalsIgnoreCase("desc")
                        ? Sort.by(sortBy).descending()
                        : Sort.by(sortBy).ascending()
        );

        Page<Order> orders = (status == null)
                ? orderRepository.findByCustomer_Email(email, pageable)
                : orderRepository.findByCustomer_EmailAndStatus(email, status, pageable);

        return orders.map(order ->
                new OrderSummaryResponse(
                        order.getId(),
                        order.getCreatedAt(),
                        order.getStatus().name(),
                        order.getTotalAmount(),
                        order.getItems().size()
                )
        );

    }

    public Page<OrderSummaryResponse> getMyOrdersSummary(
            String email,
            Pageable pageable
    ) {
        return orderRepository
                .findOrderSummariesByCustomerEmail(email, pageable)
                .map(p -> new OrderSummaryResponse(
                        p.getOrderId(),
                        p.getCreatedAt(),
                        p.getStatus(),
                        p.getTotalAmount(),
                        p.getItemCount()
                ));
    }

    public Page<OrderSummaryResponse> getAllOrdersSummary(Pageable pageable) {
        return orderRepository.findAllOrderSummaries(pageable)
                .map(p -> new OrderSummaryResponse(
                        p.getOrderId(),
                        p.getCreatedAt(),
                        p.getStatus(),
                        p.getTotalAmount(),
                        p.getItemCount()
                ));
    }
    public OrderDetailsResponse getOrderDetailsForAdmin(UUID orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        return mapToOrderDetails(order);
    }
    private OrderDetailsResponse mapToOrderDetails(Order order) {
        return new OrderDetailsResponse(
                order.getId(),
                order.getCreatedAt(),
                order.getStatus().name(),
                order.getTotalAmount(),
                order.getItems().stream()
                        .map(i -> new OrderItemResponse(
                                i.getId(),
                                i.getProduct().getId(),
                                i.getProduct().getName(),
                                i.getQuantity(),
                                i.getPrice()
                        ))
                        .toList()
        );
    }

}