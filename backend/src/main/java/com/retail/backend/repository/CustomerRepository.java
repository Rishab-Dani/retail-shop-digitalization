package com.retail.backend.repository;

import com.retail.backend.entity.Customer;
import com.retail.backend.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);
    Optional<Customer> findByEmail(String email);

   Page<Order> findByEmail(String email, Pageable pageable);


    @Query("SELECT COUNT(u) FROM User u WHERE u.role = 'CUSTOMER'")
    long countCustomers();
}
