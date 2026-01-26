package com.retail.backend.repository;

import com.retail.backend.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);
    Optional<Customer> findByEmail(String email);


}
