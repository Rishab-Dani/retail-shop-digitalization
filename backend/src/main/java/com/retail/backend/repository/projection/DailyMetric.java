package com.retail.backend.repository.projection;

import java.time.LocalDate;

public interface DailyMetric {
    LocalDate getDate();
    Long getValue();
}
