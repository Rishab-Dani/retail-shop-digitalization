package com.retail.backend.repository;

import com.retail.backend.entity.Order;
import com.retail.backend.entity.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.UUID;


public interface OrderRepository extends JpaRepository<Order, UUID> {

    @Query("SELECT COALESCE(SUM(o.totalAmount), 0) FROM Order o")
    Double getTotalRevenue();

        // For CUSTOMER
        List<Order> findByUserEmail(String email);

        List<Order> findByStatus(OrderStatus status);

        List<Order> findByUserEmailAndStatus(
            String email,
            OrderStatus status
    );

    Page<Order> findByUserEmail(String email, Pageable pageable);

}


