package com.retail.backend.repository;

import com.retail.backend.entity.Order;
import com.retail.backend.entity.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


public interface OrderRepository extends JpaRepository<Order, UUID> {

    long countByStatusNot(OrderStatus status);

    @Query("SELECT COALESCE(SUM(o.totalAmount), 0) FROM Order o")
    Double getTotalRevenue();

    @Query("""
    SELECT COUNT(o)
    FROM Order o
    WHERE o.createdAt >= :start
      AND o.createdAt < :end
""")
    long countTodayOrders(
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
    );


    @Query("""
    SELECT COALESCE(SUM(o.totalAmount), 0)
    FROM Order o
    WHERE o.createdAt >= :start
      AND o.createdAt < :end
""")
    Double sumTodayRevenue(
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
    );

    @Query("""
    SELECT o FROM Order o
    LEFT JOIN FETCH o.items i
    LEFT JOIN FETCH i.product
    WHERE o.id = :orderId
""")
    Optional<Order> findByIdWithItems(UUID orderId);

    // revenue By Status
    @Query("""
SELECT o.status, SUM(o.totalAmount)
FROM Order o
GROUP BY o.status
""")
    List<Object[]> revenueByStatus();

    // daily order count
    @Query("""
SELECT DATE(o.createdAt), COUNT(o)
FROM Order o
GROUP BY DATE(o.createdAt)
ORDER BY DATE(o.createdAt)
""")
    List<Object[]> dailyOrderCount();

    // daily revenue
    @Query("""
SELECT DATE(o.createdAt), SUM(o.totalAmount)
FROM Order o
WHERE o.status = 'DELIVERED'
GROUP BY DATE(o.createdAt)
ORDER BY DATE(o.createdAt)
""")
    List<Object[]> dailyRevenue();

    // top Selling Products
    @Query("""
SELECT p.name, SUM(oi.quantity)
FROM OrderItem oi
JOIN oi.product p
GROUP BY p.name
ORDER BY SUM(oi.quantity) DESC
""")
    List<Object[]> topSellingProducts();

    // For CUSTOMER
        List<Order> findByUserEmail(String email);

        List<Order> findByStatus(OrderStatus status);

        List<Order> findByUserEmailAndStatus(
            String email,
            OrderStatus status
    );

    Page<Order> findByUserEmail(String email, Pageable pageable);


}


