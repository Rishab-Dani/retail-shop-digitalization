package com.retail.backend.repository.projection;

import java.time.LocalDate;

public interface DailyOrderMetric {
    LocalDate getDate();
    Long getValue();
}
