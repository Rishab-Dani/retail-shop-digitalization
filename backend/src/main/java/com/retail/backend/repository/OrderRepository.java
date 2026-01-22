package com.retail.backend.repository;

import com.retail.backend.entity.Order;
import com.retail.backend.entity.OrderStatus;
import com.retail.backend.repository.projection.DailyMetric;
import com.retail.backend.repository.projection.TopProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import com.retail.backend.repository.projection.RevenueByStatus;

import java.math.BigDecimal;
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
    SELECT DATE(o.createdAt) AS date,
           SUM(o.totalAmount) AS value
    FROM Order o
    WHERE o.status = 'DELIVERED'
      AND o.createdAt >= :startDate
    GROUP BY DATE(o.createdAt)
    ORDER BY date
""")
    List<DailyMetric> dailyRevenue(@Param("startDate") LocalDateTime startDate);

    // top Selling Products
    @Query("""
SELECT p.name, SUM(oi.quantity)
FROM OrderItem oi
JOIN oi.product p
GROUP BY p.name
ORDER BY SUM(oi.quantity) DESC
""")
    List<Object[]> topSellingProducts();

// totalRevenue
    @Query("""
    SELECT COALESCE(SUM(o.totalAmount), 0)
    FROM Order o
    WHERE o.status = 'DELIVERED'
""")
    BigDecimal totalRevenue();


    // revenueGroupedByStatus
    @Query("""
    SELECT o.status AS status,
           SUM(o.totalAmount) AS total
    FROM Order o
    GROUP BY o.status
""")
    List<RevenueByStatus> revenueGroupedByStatus();

    // dailyOrders
    @Query("""
    SELECT DATE(o.createdAt) AS date,
           COUNT(o) AS value
    FROM Order o
    WHERE o.createdAt >= :startDate
    GROUP BY DATE(o.createdAt)
    ORDER BY date
""")
    List<DailyMetric> dailyOrders(@Param("startDate") LocalDateTime startDate);


    // top products
    @Query("""
    SELECT p.name AS productName,
           SUM(oi.quantity) AS quantitySold
    FROM OrderItem oi
    JOIN oi.product p
    GROUP BY p.name
    ORDER BY quantitySold DESC
""")
    List<TopProduct> topProducts(Pageable pageable);

    @Query("SELECT COUNT(o) FROM Order o")
    long countTotalOrders();

    // For CUSTOMER
        List<Order> findByUserEmail(String email);

        List<Order> findByStatus(OrderStatus status);

        List<Order> findByUserEmailAndStatus(
            String email,
            OrderStatus status
    );

    Page<Order> findByUserEmail(String email, Pageable pageable);

    Page<Order> findByUserEmailAndStatus(
            String email,
            OrderStatus status,
            Pageable pageable
    );


}


