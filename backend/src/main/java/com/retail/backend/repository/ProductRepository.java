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
    List<Product> findByActiveTrue();

    @Query("""
   SELECT COUNT(p)
   FROM Product p
   WHERE p.active = true
   """)
    long countActiveProducts();

    @Query("""
    SELECT p FROM Product p
    WHERE p.active = true
      AND (:search IS NULL OR p.name LIKE :search)
      AND (:category IS NULL OR p.category = :category)
      AND (:minPrice IS NULL OR p.price >= :minPrice)
      AND (:maxPrice IS NULL OR p.price <= :maxPrice)
      AND (:inStockOnly = false OR p.stockQuantity > 0)
""")
    Page<Product> findCustomerProducts(
            @Param("search") String search,
            @Param("category") String category,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            @Param("inStockOnly") boolean inStockOnly,
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
