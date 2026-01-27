package com.retail.backend.controller;

import com.retail.backend.entity.Product;
import com.retail.backend.service.ProductService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/customer/products")
@PreAuthorize("hasRole('CUSTOMER')")
public class CustomerProductController {

    private final ProductService productService;

    public CustomerProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> getAllProductsForCustomer() {
        return productService.getAllProducts();
    }
}
