package com.retail.backend.repository;

import com.retail.backend.entity.Order;
import com.retail.backend.entity.OrderStatus;
import com.retail.backend.repository.projection.DailyMetric;
import com.retail.backend.repository.projection.OrderSummaryProjection;
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
SELECT DISTINCT o FROM Order o
LEFT JOIN FETCH o.items i
LEFT JOIN FETCH i.product
WHERE o.id = :orderId
""")
    Optional<Order> findByIdWithItems(@Param("orderId") UUID orderId);


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

    List<Order> findByCustomer_Email(String email);
    Optional<Order> findByIdAndCustomerEmail(UUID id, String email);

    List<Order> findByCustomer_EmailAndStatus(
            String email,
            OrderStatus status
    );

    Page<Order> findByCustomer_Email(
            String email,
            Pageable pageable
    );

    Page<Order> findByCustomer_EmailAndStatus(
            String email,
            OrderStatus status,
            Pageable pageable
    );

    // admin / generic
    List<Order> findByStatus(OrderStatus status);
    Page<Order> findByStatus(OrderStatus status, Pageable pageable);

    @Query("""
SELECT 
  o.id as orderId,
  o.createdAt as createdAt,
  o.status as status,
  o.totalAmount as totalAmount,
  COUNT(oi.id) as itemCount
FROM Order o
LEFT JOIN o.items oi
WHERE o.customer.email = :email
GROUP BY o.id
""")
    Page<OrderSummaryProjection> findOrderSummariesByCustomerEmail(
            @Param("email") String email,
            Pageable pageable
    );

    @Query("""
SELECT o FROM Order o
JOIN FETCH o.items oi
JOIN FETCH oi.product p
WHERE o.id = :orderId
AND o.customer.email = :email
""")
    Optional<Order> findOrderDetails(
            @Param("orderId") UUID orderId,
            @Param("email") String email
    );

    @Query("""
SELECT o FROM Order o
JOIN FETCH o.items oi
JOIN FETCH oi.product p
WHERE o.id = :orderId
AND o.customer.email = :email
""")
    Optional<Order> findOrderDetails(
            @Param("orderId") UUID orderId
    );

    @Query("""
SELECT 
  o.id as orderId,
  o.createdAt as createdAt,
  o.status as status,
  o.totalAmount as totalAmount,
  COUNT(i.id) as itemCount
FROM Order o
LEFT JOIN o.items i
GROUP BY o.id
""")
    Page<OrderSummaryProjection> findAllOrderSummaries(Pageable pageable);

    @Query("""
SELECT
 o.id as orderId,
 o.createdAt as createdAt,
 o.status as status,
 o.totalAmount as totalAmount,
 COUNT(i.id) as itemCount
FROM Order o
LEFT JOIN o.items i
WHERE o.status = :status
GROUP BY o.id
ORDER BY o.createdAt DESC
""")
    Page<OrderSummaryProjection> findOrderSummariesByStatus(
            @Param("status") OrderStatus status,
            Pageable pageable
    );
    @Query("""
SELECT
  o.id as orderId,
  o.createdAt as createdAt,
  o.status as status,
  o.totalAmount as totalAmount,
  COUNT(oi.id) as itemCount
FROM Order o
LEFT JOIN o.items oi
WHERE o.status = :status
GROUP BY o.id
ORDER BY o.createdAt DESC
""")
    Page<OrderSummaryProjection> findOrdersSummaryByStatus(
            @Param("status") OrderStatus status,
            Pageable pageable
    );

}


