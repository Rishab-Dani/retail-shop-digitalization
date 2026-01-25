package com.retail.backend.controller;

import com.retail.backend.dto.ChangePasswordRequest;
import com.retail.backend.dto.CustomerProfileResponse;
import com.retail.backend.dto.UpdateCustomerProfileRequest;
import com.retail.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/customer")
@PreAuthorize("hasRole('CUSTOMER')")
public class CustomerProfileController {

    private final UserService userService;

    public CustomerProfileController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public CustomerProfileResponse getProfile(Authentication authentication) {
        return userService.getMyProfile(authentication.getName());
    }

    @PutMapping("/profile")
    public ResponseEntity<String> updateProfile(
            @RequestBody @Valid UpdateCustomerProfileRequest request,
            Authentication authentication
    ) {
        userService.updateMyProfile(authentication.getName(), request);
        return ResponseEntity.ok("Profile updated successfully");
    }

    @PutMapping("/profile/password")
    public ResponseEntity<String> changePassword(
            @RequestBody @Valid ChangePasswordRequest request,
            Authentication authentication
    ) {
        userService.changePassword(authentication.getName(), request);
        return ResponseEntity.ok("Password changed successfully");
    }
}
