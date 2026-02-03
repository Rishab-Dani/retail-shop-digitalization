package com.retail.backend.service;

import com.retail.backend.entity.Product;
import com.retail.backend.repository.ProductRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;


import java.math.BigDecimal;
import java.util.List;
@Slf4j
@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product updateProduct(Long id, Product updatedProduct) {
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        existing.setName(updatedProduct.getName());
        existing.setCategory(updatedProduct.getCategory());
        existing.setPrice(updatedProduct.getPrice());
        existing.setStockQuantity(updatedProduct.getStockQuantity());

        return productRepository.save(existing);
    }

    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setActive(false);
        productRepository.save(product);
    }


    // ================= CUSTOMER =================

    public Page<Product> getCustomerProducts(
            int page,
            int size,
            String sortBy,
            String search,
            String category,
            Double minPrice,
            Double maxPrice,
            Boolean inStockOnly
    ) {
        log.info("Customer products API hit");

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));

        String searchPattern = null;
        if (search != null && !search.isBlank()) {
            searchPattern = "%" + search.trim() + "%";
        }

        return productRepository.findCustomerProducts(
                searchPattern,
                category,
                minPrice,
                maxPrice,
                Boolean.TRUE.equals(inStockOnly),
                pageable
        );
    }



    // ================= ADMIN =================

    public Page<Product> getAdminProducts(int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return productRepository.findAll(pageable);
    }

}

