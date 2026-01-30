package com.retail.backend.repository;

import com.retail.backend.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AddressRepository extends JpaRepository<Address, UUID> {

    List<Address> findByCustomer_Email(String email);

    Optional<Address> findByIdAndCustomer_Email(UUID id, String email);

    void deleteByIdAndCustomer_Email(UUID id, String email);

}
