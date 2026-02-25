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

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;

    public PaymentService(PaymentRepository paymentRepository,
                          OrderRepository orderRepository) {
        this.paymentRepository = paymentRepository;
        this.orderRepository = orderRepository;
    }

    /**
     * STEP 1:
     * Create a payment entry with INITIATED status.
     * Order remains PENDING_PAYMENT.
     */
    @Transactional
    public Payment createPayment(UUID orderId) {

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

        // 🚫 Order must be in PENDING_PAYMENT
        if (order.getStatus() != OrderStatus.PENDING_PAYMENT) {
            throw new BusinessException("Order is not eligible for payment");
        }

        // 🚫 Prevent duplicate successful payment
        if (paymentRepository.findByOrder_Id(orderId).isPresent()) {
            throw new BusinessException("Payment already exists for this order");
        }

        // 💳 Create payment
        Payment payment = new Payment();
        payment.setOrder(order);
        payment.setAmount(order.getTotalAmount());
        payment.setStatus(PaymentStatus.INITIATED);
        payment.setTransactionId(UUID.randomUUID().toString());

        return paymentRepository.save(payment);
    }

    /**
     * STEP 2:
     * Complete payment based on gateway response.
     */
    @Transactional
    public Payment completePayment(UUID paymentId, boolean success) {

        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found"));

        Order order = payment.getOrder();

        // 🚫 Only INITIATED payments can be completed
        if (payment.getStatus() != PaymentStatus.INITIATED) {
            throw new BusinessException("Payment is already completed");
        }

        if (success) {
            payment.setStatus(PaymentStatus.SUCCESS);
            order.setStatus(OrderStatus.CONFIRMED);
        } else {
            payment.setStatus(PaymentStatus.FAILED);

            // ❗ Do NOT auto-cancel order
            // Allow retry
            order.setStatus(OrderStatus.PENDING_PAYMENT);
        }

        paymentRepository.save(payment);
        orderRepository.save(order);

        return payment;
    }
}