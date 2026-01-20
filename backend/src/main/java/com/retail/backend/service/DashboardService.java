package com.retail.backend.service;

import com.retail.backend.dto.DashboardSummary;
import com.retail.backend.dto.dashboard.DashboardMetricsResponse;
import com.retail.backend.dto.dashboard.TopProductMetric;
import com.retail.backend.entity.Product;
import com.retail.backend.repository.OrderRepository;
import com.retail.backend.repository.ProductRepository;
import com.retail.backend.repository.UserRepository;
import com.retail.backend.repository.projection.RevenueByStatus;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

import java.util.Optional;

@Service
public class DashboardService {

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    public DashboardService(
            ProductRepository productRepository,
            OrderRepository orderRepository,
            UserRepository userRepository
    ) {
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    // ===============================
    // BASIC DASHBOARD SUMMARY
    // ===============================
    public DashboardSummary getSummary() {

        long totalProducts = productRepository.count();
        long totalOrders = orderRepository.count();

        Double totalRevenue = orderRepository.getTotalRevenue();
        double safeRevenue = totalRevenue != null ? totalRevenue : 0.0;

        LocalDateTime start = LocalDate.now().atStartOfDay();
        LocalDateTime end = start.plusDays(1);

        long todayOrders = orderRepository.countTodayOrders(start, end);
        Double todayRevenue = orderRepository.sumTodayRevenue(start, end);
        double safeTodayRevenue = todayRevenue != null ? todayRevenue : 0.0;

        return new DashboardSummary(
                totalProducts,
                totalOrders,
                safeRevenue
        );
    }

    // ===============================
    // LOW STOCK PRODUCTS
    // ===============================
    public List<Product> getLowStockProducts(int threshold) {
        return productRepository.findByStockQuantityLessThanEqual(threshold);
    }

    // ===============================
    // REVENUE BY ORDER STATUS
    // ===============================
    public Map<String, BigDecimal> getRevenueByStatus() {

        Map<String, BigDecimal> revenueMap = new HashMap<>();

        for (RevenueByStatus row : orderRepository.revenueGroupedByStatus()) {
            revenueMap.put(
                    row.getStatus().name(),
                    row.getTotal() != null ? row.getTotal() : BigDecimal.ZERO
            );
        }

        return revenueMap;
    }

        // ===============================
        // ADVANCED DASHBOARD METRICS
        // ===============================
        public DashboardMetricsResponse getAdvancedDashboardMetrics() {

            DashboardMetricsResponse dashboard = new DashboardMetricsResponse();

            // 1️⃣ Base KPIs
            dashboard.setTotalOrders(orderRepository.countTotalOrders());
            dashboard.setTotalCustomers(userRepository.countCustomers());
            dashboard.setTotalRevenue(
                    Optional.ofNullable(orderRepository.totalRevenue())
                            .orElse(BigDecimal.ZERO)
            );

            // 2️⃣ Revenue by status
            Map<String, BigDecimal> revenueByStatus = new HashMap<>();
            for (RevenueByStatus row : orderRepository.revenueGroupedByStatus()) {
                revenueByStatus.put(
                        row.getStatus().name(),
                        Optional.ofNullable(row.getTotal()).orElse(BigDecimal.ZERO)
                );
            }
            dashboard.setRevenueByStatus(revenueByStatus);

            // 3️⃣ Daily orders
            LocalDateTime sevenDaysAgo =
                    LocalDate.now().minusDays(7).atStartOfDay();

            List<com.retail.backend.dto.dashboard.DailyMetric> dailyOrders =
                    orderRepository.dailyOrders(sevenDaysAgo)
                            .stream()
                            .map(p -> new com.retail.backend.dto.dashboard.DailyMetric(
                                    p.getDate(),
                                    BigDecimal.valueOf(p.getValue().longValue())
                            ))
                            .toList();

            dashboard.setDailyOrders(dailyOrders);

            // 4️⃣ Daily revenue
//            LocalDateTime sevenDaysAgo =
//                    LocalDate.now().minusDays(7).atStartOfDay();

            List<com.retail.backend.dto.dashboard.DailyMetric> dailyRevenue =
                    orderRepository.dailyRevenue(sevenDaysAgo)
                            .stream()
                            .map(p -> new com.retail.backend.dto.dashboard.DailyMetric(
                                    p.getDate(),
                                    Optional.ofNullable(p.getValue()).orElse(BigDecimal.ZERO)
                            ))
                            .toList();

            dashboard.setDailyRevenue(dailyRevenue);

            // 5️⃣ Top products
            List<TopProductMetric> topProducts =
                    orderRepository.topProducts(PageRequest.of(0, 5))
                            .stream()
                            .map(p -> new TopProductMetric(
                                    p.getProductName(),
                                    p.getQuantitySold()
                            ))
                            .toList();

            dashboard.setTopProducts(topProducts);

            return dashboard;
        }
    }

