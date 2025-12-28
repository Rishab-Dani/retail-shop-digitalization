package com.retail.backend.service;

import com.retail.backend.dto.DashboardSummary;
import com.retail.backend.repository.OrderRepository;
import com.retail.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
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
        BigDecimal totalRevenue = orderRepository.getTotalRevenue();

        return new DashboardSummary(
                totalProducts,
                totalOrders,
                totalRevenue
        );
    }
    // low stock counter
    public List<Product> getLowStockProducts(int threshold) {
        return productRepository.findByStockQuantityLessThanEqual(threshold);
    }

}
