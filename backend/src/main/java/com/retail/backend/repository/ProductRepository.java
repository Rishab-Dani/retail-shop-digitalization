package com.retail.backend.repository;

import com.retail.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

// low stock counter
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByStockQuantityLessThanEqual(Integer threshold);


}
