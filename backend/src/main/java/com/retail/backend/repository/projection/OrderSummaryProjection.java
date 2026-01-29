package com.retail.backend.repository.projection;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public interface OrderSummaryProjection {

    UUID getOrderId();
    LocalDateTime getCreatedAt();
    String getStatus();
    BigDecimal getTotalAmount();
    long getItemCount();
}
