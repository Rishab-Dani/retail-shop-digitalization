package com.retail.backend.controller;

import com.retail.backend.dto.DashboardSummary;
import com.retail.backend.entity.Product;
import com.retail.backend.service.DashboardService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@PreAuthorize("hasRole('ADMIN')")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/summary")
    public DashboardSummary getSummary() {
        return dashboardService.getSummary();
    }

    @GetMapping("/low-stock")
    public List<Product> getLowStockProducts(
            @RequestParam(defaultValue = "5") int threshold) {
        return dashboardService.getLowStockProducts(threshold);
    }
}
