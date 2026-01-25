package com.retail.backend.service;

import com.retail.backend.dto.ChangePasswordRequest;
import com.retail.backend.dto.CustomerProfileResponse;
import com.retail.backend.dto.UpdateCustomerProfileRequest;
import com.retail.backend.entity.Customer;
import com.retail.backend.entity.PasswordResetToken;
import com.retail.backend.exception.BusinessException;
import com.retail.backend.exception.ResourceNotFoundException;
import com.retail.backend.repository.CustomerRepository;
import com.retail.backend.repository.PasswordResetTokenRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDateTime;
import java.util.UUID;

@Slf4j
@Service
@Transactional
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;

    public CustomerService(CustomerRepository customerRepository,
                           PasswordResetTokenRepository tokenRepository,
                           PasswordEncoder passwordEncoder) {
        this.customerRepository = customerRepository;
        this.tokenRepository = tokenRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @Transactional(readOnly = true)
    public CustomerProfileResponse getMyProfile(String email) {

        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found"));

        return new CustomerProfileResponse(
                customer.getName(),
                customer.getEmail(),
                customer.getRole().name(),
                customer.isActive()
        );
    }

    public void updateMyProfile(String email, UpdateCustomerProfileRequest request) {

        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found"));

        customer.setName(request.getName());
        customerRepository.save(customer);
    }

    public void changePassword(String email, ChangePasswordRequest request) {

        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found"));

        if (!passwordEncoder.matches(
                request.getCurrentPassword(),
                customer.getPassword()
        )) {
            throw new BusinessException("Current password is incorrect");
        }

        customer.setPassword(passwordEncoder.encode(request.getNewPassword()));
        customerRepository.save(customer);
    }

    // ✅ FORGOT PASSWORD
    public void forgotPassword(String email) {

        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found"));

        // delete old tokens
        tokenRepository.deleteByCustomer_Id(customer.getId());

        String token = UUID.randomUUID().toString();

        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setCustomer(customer);
        resetToken.setExpiryTime(LocalDateTime.now().plusMinutes(15));

        tokenRepository.save(resetToken);

        // DEV ONLY
        log.info("CUSTOMER RESET TOKEN = {}", token);
        System.out.println("CUSTOMER RESET TOKEN = " + token);
    }

    // ✅ RESET PASSWORD
    public void resetPassword(String token, String newPassword) {

        PasswordResetToken resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() ->
                        new BusinessException("Invalid reset token"));

        if (resetToken.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new BusinessException("Reset token expired");
        }

        Customer customer = resetToken.getCustomer();
        customer.setPassword(passwordEncoder.encode(newPassword));

        customerRepository.save(customer);
        tokenRepository.delete(resetToken);
    }

}

