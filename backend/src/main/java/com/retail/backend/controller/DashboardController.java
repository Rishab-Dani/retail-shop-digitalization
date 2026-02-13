package com.retail.backend.controller;

        import com.retail.backend.dto.DashboardSummary;
        import com.retail.backend.dto.dashboard.DashboardMetricsResponse;
        import com.retail.backend.entity.Product;
        import com.retail.backend.service.DashboardService;
        import io.swagger.v3.oas.annotations.tags.Tag;
        import org.springframework.security.access.prepost.PreAuthorize;
        import org.springframework.web.bind.annotation.*;

        import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@PreAuthorize("hasRole('ADMIN')")
@CrossOrigin // frontend ready
@Tag(
        name = "Dashboard & Analytics",
        description = "Admin analytics and business intelligence APIs"
)
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }


    // 1️⃣ BASIC DASHBOARD SUMMARY
    @GetMapping("/summary")
    public DashboardSummary getSummary() {
        return dashboardService.getSummary();
    }

    // 2️⃣ ADVANCED DASHBOARD METRICS
    @GetMapping("/metrics")
    public DashboardMetricsResponse getAdvancedMetrics() {
        return dashboardService.getAdvancedDashboardMetrics();
    }

    // 3️⃣ LOW STOCK PRODUCTS
    @GetMapping("/low-stock")
    public List<Product> getLowStockProducts(
            @RequestParam(defaultValue = "5") int threshold
    ) {
        return dashboardService.getLowStockProducts(threshold);
    }
}
