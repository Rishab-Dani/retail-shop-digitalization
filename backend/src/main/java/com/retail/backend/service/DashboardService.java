package com.retail.backend.service;

import com.retail.backend.dto.DashboardSummary;
import com.retail.backend.repository.OrderRepository;
import com.retail.backend.repository.ProductRepository;
import com.retail.backend.repository.projection.RevenueByStatus;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.retail.backend.entity.Product;


@Service                                       // analytics
public class DashboardService {

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    public DashboardService(ProductRepository productRepository,
                            OrderRepository orderRepository) {
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
    }

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




    // low stock counter
    public List<Product> getLowStockProducts(int threshold) {
        return productRepository.findByStockQuantityLessThanEqual(threshold);
    }

    // get Revenue By Status
    public Map<String, BigDecimal> getRevenueByStatus() {

        Map<String, BigDecimal> revenueMap = new HashMap<>();

        for (RevenueByStatus row : orderRepository.revenueGroupedByStatus()) {
            revenueMap.put(
                    row.getStatus().name(),
                    row.getTotal() == null ? BigDecimal.ZERO : row.getTotal()
            );
        }

        return revenueMap;
    }
}
