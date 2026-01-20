package com.retail.backend.repository.projection;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface DailyRevenueMetric {
    LocalDate getDate();
    BigDecimal getValue();
}
