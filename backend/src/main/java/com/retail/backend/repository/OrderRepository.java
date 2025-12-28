package com.retail.backend.repository;

import com.retail.backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.math.BigDecimal;


public interface OrderRepository extends JpaRepository<Order, Long> {

    // analytics for dashboard summary
    @Query("SELECT COALESCE(SUM(o.totalAmount), 0) FROM Order o")
    BigDecimal getTotalRevenue();

}
