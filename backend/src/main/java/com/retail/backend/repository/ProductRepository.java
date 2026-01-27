package com.retail.backend.repository;

import com.retail.backend.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

// low stock counter
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByStockQuantityLessThanEqual(Integer threshold);

    @Query("""
    SELECT p FROM Product p
    WHERE (:search IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%')))
      AND (:category IS NULL OR p.category = :category)
      AND (:minPrice IS NULL OR p.price >= :minPrice)
      AND (:maxPrice IS NULL OR p.price <= :maxPrice)
""")
    Page<Product> findCustomerProducts(
            @Param("search") String search,
            @Param("category") String category,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            Pageable pageable
    );

    Page<Product> findByNameContainingIgnoreCaseAndCategoryContainingIgnoreCase(
            String name,
            String category,
            Pageable pageable
    );

    Page<Product> findByNameContainingIgnoreCaseAndCategoryContainingIgnoreCaseAndPriceBetween(
            String name,
            String category,
            Double minPrice,
            Double maxPrice,
            Pageable pageable
    );


}
