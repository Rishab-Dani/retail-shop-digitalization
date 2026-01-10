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
    public Order getOrderById(UUID orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    @Transactional
    public void updateOrderStatus(UUID orderId, OrderStatus newStatus) {

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

        order.setStatus(newStatus);
        orderRepository.save(order);
    }

}