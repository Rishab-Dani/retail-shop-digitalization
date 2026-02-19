package com.retail.backend.service;

import com.retail.backend.entity.*;
import com.retail.backend.exception.AccessDeniedException;
import com.retail.backend.exception.BusinessException;
import com.retail.backend.exception.ResourceNotFoundException;
import com.retail.backend.repository.OrderRepository;
import com.retail.backend.repository.PaymentRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;

    public PaymentService(PaymentRepository paymentRepository,
                          OrderRepository orderRepository) {
        this.paymentRepository = paymentRepository;
        this.orderRepository = orderRepository;
    }

    @Transactional
    public Payment processPayment(UUID orderId) {

        // 🔍 Fetch order
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        // 🔐 Ownership validation
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String loggedInEmail = authentication.getName();

        if (!order.getCustomer().getEmail().equals(loggedInEmail)) {
            throw new AccessDeniedException("You are not allowed to pay for this order");
        }

        // 🚫 Status validation
        if (order.getStatus() != OrderStatus.PENDING_PAYMENT) {
            throw new BusinessException("Order is not eligible for payment");
        }

        // 🚫 Prevent duplicate payment
        if (paymentRepository.findByOrder_Id(orderId).isPresent()) {
            throw new BusinessException("Payment already processed for this order");
        }

        // 💳 Create payment
        Payment payment = new Payment();
        payment.setOrder(order);
        payment.setAmount(order.getTotalAmount());
        payment.setStatus(PaymentStatus.INITIATED);

        // 🔥 Simulate payment gateway result
        boolean paymentSuccess = ThreadLocalRandom.current().nextBoolean();
        //boolean paymentSuccess = true;


        if (paymentSuccess) {
            payment.setStatus(PaymentStatus.SUCCESS);
            order.setStatus(OrderStatus.CONFIRMED);
        } else {
            payment.setStatus(PaymentStatus.FAILED);
            order.setStatus(OrderStatus.CANCELLED);
        }

        payment.setTransactionId(UUID.randomUUID().toString());

        paymentRepository.save(payment);
        orderRepository.save(order);

        return payment;
    }
}
