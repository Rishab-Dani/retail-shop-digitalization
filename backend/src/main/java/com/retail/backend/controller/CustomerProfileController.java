package com.retail.backend.controller;

import com.retail.backend.dto.ChangePasswordRequest;
import com.retail.backend.dto.CustomerProfileResponse;
import com.retail.backend.dto.UpdateCustomerProfileRequest;
import com.retail.backend.exception.BadRequestException;
import com.retail.backend.service.CustomerService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/customer")
@PreAuthorize("hasRole('CUSTOMER')")
@Tag(
        name = "Customer Profile",
        description = "Customer profile management APIs"
)
public class CustomerProfileController {

    private final CustomerService customerService;

    public CustomerProfileController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/profile")
    public CustomerProfileResponse getProfile(Authentication authentication) {
        return customerService.getMyProfile(authentication.getName());
    }

    @PutMapping("/profile")
    public ResponseEntity<String> updateProfile(
            @Valid @RequestBody UpdateCustomerProfileRequest request,
            Authentication authentication
    ) {
        customerService.updateMyProfile(authentication.getName(), request);
        return ResponseEntity.ok("Profile updated successfully");
    }

    @PutMapping(
            value = "/profile/avatar",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<String> uploadAvatar(
            @RequestParam("file") MultipartFile file,
            Authentication auth
    ) {
        if (file == null || file.isEmpty()) {
            throw new BadRequestException("Avatar file is required");
        }

        customerService.uploadAvatar(file, auth.getName());

        return ResponseEntity.ok("Avatar updated successfully");
    }

    @PutMapping("/profile/password")
    public ResponseEntity<String> changePassword(
            @RequestBody @Valid ChangePasswordRequest request,
            Authentication authentication
    ) {
        customerService.changePassword(authentication.getName(), request);
        return ResponseEntity.ok("Password changed successfully");
    }
}
