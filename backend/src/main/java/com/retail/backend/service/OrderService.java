package com.retail.backend.service;

import com.retail.backend.dto.AddOrderItemRequest;
import com.retail.backend.dto.AddOrderItemsRequest;
import com.retail.backend.entity.*;
import com.retail.backend.repository.OrderItemRepository;
import com.retail.backend.repository.OrderRepository;
import com.retail.backend.repository.ProductRepository;
import com.retail.backend.repository.UserRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserRepository userRepository;


    public OrderService(
            OrderRepository orderRepository,
            ProductRepository productRepository,
            OrderItemRepository orderItemRepository,
            UserRepository userRepository
    ) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.orderItemRepository = orderItemRepository;
        this.userRepository = userRepository;
    }

    // STEP 1: Place Order
    @Transactional
    public Order placeOrder(String email, BigDecimal totalAmount) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = new Order();
        order.setUser(user);
        order.setStatus(OrderStatus.PLACED);
        order.setTotalAmount(totalAmount);

        return orderRepository.save(order);
    }

    @Transactional
    public void addItemsToOrder(UUID orderId, AddOrderItemsRequest request) {

        // 1. Fetch order
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // 2. Loop items
        for (AddOrderItemRequest itemReq : request.getItems()) {

            // 3. Fetch product
            Product product = productRepository.findById(itemReq.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            // 4. Stock validation
            if (product.getStockQuantity() < itemReq.getQuantity()) {
                throw new RuntimeException(
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

            // 7. Save child entities
            orderItemRepository.save(item);
            productRepository.save(product);
        }
        if (order.getStatus() != OrderStatus.PLACED) {
            throw new IllegalStateException("Order cannot be modified after confirmation");
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
                ? orderRepository.findByUserEmail(email)
                : orderRepository.findByUserEmailAndStatus(email, status);
    }


    @Transactional(readOnly = true)
    public Order getOrderById(
            UUID orderId,
            String email,
            boolean isAdmin
    ) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // 🔐 CUSTOMER can access only their own order
        if (!isAdmin && !order.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Access denied");
        }

        return order;
    }


    @Transactional
    public Order updateOrderStatus(UUID orderId, OrderStatus newStatus) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        OrderStatus currentStatus = order.getStatus();

        // 🔒 Simple business rule
        if (currentStatus == OrderStatus.CANCELLED ||
                currentStatus == OrderStatus.DELIVERED) {
            throw new RuntimeException(
                    "Cannot change status after " + currentStatus
            );
        }

        validateOrderStatusTransition(order.getStatus(), newStatus);

        order.setStatus(newStatus);
        return orderRepository.save(order); // return need or not ?

    }

    @Transactional
    public void cancelOrder(UUID orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (order.getStatus() == OrderStatus.DELIVERED ||
                order.getStatus() == OrderStatus.CANCELLED) {
            throw new RuntimeException("Order cannot be cancelled");
        }

        // 🔄 Restore stock
        for (OrderItem item : order.getItems()) {
            Product product = item.getProduct();
            product.setStockQuantity(
                    product.getStockQuantity() + item.getQuantity()
            );
            productRepository.save(product);
        }

        order.setStatus(OrderStatus.CANCELLED);
        orderRepository.save(order);

        if (order.getStatus() != OrderStatus.PLACED) {
            throw new IllegalStateException("Order cannot be modified after confirmation");
        }

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
        return orderRepository.findByUserEmail(email, pageable);
    }

    @Transactional(readOnly = true)
    public List<Order> getOrdersByStatus(OrderStatus status) {
        return orderRepository.findByStatus(status);
    }

    private void validateOrderStatusTransition(
            OrderStatus current,
            OrderStatus next
    ) {
        switch (current) {
            case PLACED -> {
                if (!(next == OrderStatus.CONFIRMED || next == OrderStatus.CANCELLED))
                    throw new IllegalStateException("Invalid status transition from PLACED");
            }
            case CONFIRMED -> {
                if (!(next == OrderStatus.SHIPPED || next == OrderStatus.CANCELLED))
                    throw new IllegalStateException("Invalid status transition from CONFIRMED");
            }
            case SHIPPED -> {
                if (next != OrderStatus.DELIVERED)
                    throw new IllegalStateException("Invalid status transition from SHIPPED");
            }
            case DELIVERED, CANCELLED ->
                    throw new IllegalStateException("Order is already completed");
        }
    }


}