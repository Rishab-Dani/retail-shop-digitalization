package com.retail.backend.controller;

import com.retail.backend.entity.Payment;
import com.retail.backend.service.PaymentService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Tag(
        name = "Customer Payments",
        description = "Payment processing APIs for customer orders"
)
@RestController
@RequestMapping("/api/customer/payments")
public class CustomerPaymentController {

    private final PaymentService paymentService;

    public CustomerPaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/{orderId}")
    public Payment processPayment(@PathVariable UUID orderId) {
        return paymentService.processPayment(orderId);
    }
}
