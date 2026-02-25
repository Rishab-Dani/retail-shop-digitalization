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

    /**
     * STEP 1 - Create payment (INITIATED)
     */
    @PostMapping("/{orderId}")
    public Payment createPayment(@PathVariable UUID orderId) {
        return paymentService.createPayment(orderId);
    }

    /**
     * STEP 2 - Complete payment (SUCCESS / FAILED)
     */
    @PostMapping("/complete/{paymentId}")
    public Payment completePayment(
            @PathVariable UUID paymentId,
            @RequestParam boolean success) {

        return paymentService.completePayment(paymentId, success);
    }
}