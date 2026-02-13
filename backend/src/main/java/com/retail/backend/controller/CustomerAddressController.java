package com.retail.backend.controller;

import com.retail.backend.dto.AddressRequest;
import com.retail.backend.dto.AddressResponse;
import com.retail.backend.service.AddressService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/customer/addresses")
@RequiredArgsConstructor
@PreAuthorize("hasRole('CUSTOMER')")
@Tag(
        name = "Customer Addresses",
        description = "Manage customer shipping and billing addresses"
)
public class CustomerAddressController {

    private final AddressService addressService;

    @GetMapping
    public List<AddressResponse> getMyAddresses(Authentication auth) {
        return addressService.getMyAddresses(auth.getName());
    }

    @PostMapping
    public ResponseEntity<String> addAddress(
            @RequestBody @Valid AddressRequest request,
            Authentication auth
    ) {
        addressService.addAddress(auth.getName(), request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Address added successfully");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateAddress(
            @PathVariable UUID id,
            @RequestBody @Valid AddressRequest request,
            Authentication auth
    ) {
        addressService.updateAddress(id, auth.getName(), request);
        return ResponseEntity.ok("Address updated successfully");
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAddress(
            @PathVariable UUID id,
            Authentication auth
    ) {
        addressService.deleteAddress(id, auth.getName());
        return ResponseEntity.ok("Address deleted successfully");
    }
}
