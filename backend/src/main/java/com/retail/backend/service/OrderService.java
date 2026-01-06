package com.retail.backend.service;

import com.retail.backend.dto.AddOrderItemRequest;
import com.retail.backend.dto.AddOrderItemsRequest;
import com.retail.backend.entity.*;
import com.retail.backend.repository.OrderItemRepository;
import com.retail.backend.repository.OrderRepository;
import com.retail.backend.repository.ProductRepository;
import com.retail.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.UUID;

@Service
@Transactional
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

    // ✅ STEP 1: Place Order
    @Transactional
    public Order placeOrder(String email, BigDecimal totalAmount) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = new Order();
        order.setUser(user);
        order.setStatus("PLACED");
        order.setTotalAmount(totalAmount);

        // ✅ SAVE ONCE
        return orderRepository.save(order);
    }


    // ✅ STEP 2: Add Items to Order
    public void addItemsToOrder(UUID orderId, AddOrderItemsRequest request) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        for (AddOrderItemRequest itemReq : request.getItems()) {

            Product product = productRepository.findById(itemReq.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setProduct(product);
            item.setQuantity(itemReq.getQuantity());
            item.setPrice(product.getPrice());

            orderItemRepository.save(item);
        }

        // ❌ DO NOT save(order) again

    }

}