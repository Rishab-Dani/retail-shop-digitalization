package com.retail.backend.repository.projection;

import com.retail.backend.entity.OrderStatus;
import java.math.BigDecimal;

public interface RevenueByStatus {

    OrderStatus getStatus();
    BigDecimal getTotal();
}
