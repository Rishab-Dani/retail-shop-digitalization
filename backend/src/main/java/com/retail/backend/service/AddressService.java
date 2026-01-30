package com.retail.backend.service;

import com.retail.backend.dto.AddressRequest;
import com.retail.backend.dto.AddressResponse;
import com.retail.backend.entity.Address;
import com.retail.backend.entity.Customer;
import com.retail.backend.exception.ResourceNotFoundException;
import com.retail.backend.repository.AddressRepository;
import com.retail.backend.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class AddressService {

    private final AddressRepository addressRepository;
    private final CustomerRepository customerRepository;

    public List<AddressResponse> getMyAddresses(String email) {
        return addressRepository.findByCustomer_Email(email)
                .stream()
                .map(a -> new AddressResponse(
                        a.getId(),
                        a.getType(),
                        a.getAddress(),
                        a.isDefault()
                ))
                .toList();
    }

    public void addAddress(String email, AddressRequest request) {
        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        if (request.isDefault()) {
            unsetDefault(customer.getId());
        }

        Address address = new Address();
        address.setCustomer(customer);
        address.setType(request.type());
        address.setAddress(request.address());
        address.setDefault(request.isDefault());

        addressRepository.save(address);
    }

    public void updateAddress(UUID id, String email, AddressRequest request) {
        Address address = addressRepository
                .findByIdAndCustomer_Email(id, email)
                .orElseThrow(() -> new ResourceNotFoundException("Address not found"));

        if (request.isDefault()) {
            unsetDefault(address.getCustomer().getId());
        }

        address.setType(request.type());
        address.setAddress(request.address());
        address.setDefault(request.isDefault());
    }

    public void deleteAddress(UUID id, String email) {
        Address address = addressRepository
                .findByIdAndCustomer_Email(id, email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Address not found"));

        addressRepository.delete(address);
    }


    private void unsetDefault(Long customerId) {
        addressRepository.findAll().stream()
                .filter(a -> a.getCustomer().getId().equals(customerId))
                .forEach(a -> a.setDefault(false));
    }
}
