package com.retail.backend.service;

import com.retail.backend.dto.OrderRequest;
import com.retail.backend.dto.OrderItemRequest;
import com.retail.backend.entity.*;
import com.retail.backend.exception.BadRequestException;
import com.retail.backend.exception.ResourceNotFoundException;
import com.retail.backend.repository.OrderRepository;
import com.retail.backend.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public OrderService(OrderRepository orderRepository,
                        ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    @Transactional
    public Order createOrder(OrderRequest request) {

        Order order = new Order();
        order.setStatus(OrderStatus.CREATED);

        List<OrderItem> orderItems = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;

        for (OrderItemRequest itemReq : request.getItems()) {

            Product product = productRepository.findById(itemReq.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

            if (product.getStockQuantity() < itemReq.getQuantity()) {
                throw new BadRequestException(
                        "Insufficient stock for product: " + product.getName()
                );
            }


            // reduce stock
            product.setStockQuantity(
                    product.getStockQuantity() - itemReq.getQuantity()
            );

            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(product);
            orderItem.setQuantity(itemReq.getQuantity());
            orderItem.setPrice(product.getPrice());
            orderItem.setOrder(order);

            total = total.add(
                    product.getPrice().multiply(
                            BigDecimal.valueOf(itemReq.getQuantity())
                    )
            );

            orderItems.add(orderItem);
        }

        order.setTotalAmount(total);
        order.setOrderItems(orderItems);

        return orderRepository.save(order);
    }

    //
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
    }

}
