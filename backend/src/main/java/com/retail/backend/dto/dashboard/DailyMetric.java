package com.retail.backend.dto.dashboard;

import java.math.BigDecimal;
import java.time.LocalDate;

public class DailyMetric {

    private LocalDate date;
    private BigDecimal value;

    public DailyMetric(LocalDate date, BigDecimal value) {
        this.date = date;
        this.value = value;
    }

    public LocalDate getDate() {
        return date;
    }

    public BigDecimal getValue() {
        return value;
    }
}
