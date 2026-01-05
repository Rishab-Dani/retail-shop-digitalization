package com.retail.backend.repository;

import com.retail.backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;


public interface OrderRepository extends JpaRepository<Order, UUID> {

    @Query("SELECT COALESCE(SUM(o.totalAmount), 0) FROM Order o")
    Double getTotalRevenue();
}


