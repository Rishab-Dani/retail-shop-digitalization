package com.retail.backend.controller;

import com.retail.backend.dto.DashboardSummary;
import com.retail.backend.service.DashboardService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.retail.backend.entity.Product;


@RestController
@RequestMapping("/api/dashboard")                              // analytics
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/summary")
    public DashboardSummary getSummary() {
        return dashboardService.getSummary();
    }

    // low stock counter
    @GetMapping("/low-stock")
    public List<Product> getLowStockProducts(
            @RequestParam(defaultValue = "5") int threshold) {
        return dashboardService.getLowStockProducts(threshold);
    }

}
