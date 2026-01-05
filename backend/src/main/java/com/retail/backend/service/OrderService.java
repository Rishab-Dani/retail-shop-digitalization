package com.retail.backend.service;

import com.retail.backend.dto.OrderRequest;
import com.retail.backend.dto.OrderItemRequest;
import com.retail.backend.entity.*;
import com.retail.backend.exception.BadRequestException;
import com.retail.backend.exception.ResourceNotFoundException;
import com.retail.backend.repository.OrderRepository;
import com.retail.backend.repository.ProductRepository;
import com.retail.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    public OrderService(OrderRepository orderRepository,
                        UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    public Order placeOrder(String email, BigDecimal totalAmount) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = new Order();
        order.setUser(user);
        order.setStatus("PLACED");
        order.setTotalAmount(totalAmount);

        return orderRepository.save(order);
    }
}

