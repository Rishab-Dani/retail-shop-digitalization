package com.retail.backend.service;

import com.retail.backend.dto.ChangePasswordRequest;
import com.retail.backend.dto.CustomerProfileResponse;
import com.retail.backend.dto.UpdateCustomerProfileRequest;
import com.retail.backend.entity.Customer;
import com.retail.backend.entity.PasswordResetToken;
import com.retail.backend.exception.BadRequestException;
import com.retail.backend.exception.BusinessException;
import com.retail.backend.exception.ResourceNotFoundException;
import com.retail.backend.repository.CustomerRepository;
import com.retail.backend.repository.PasswordResetTokenRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.UUID;

@Slf4j
@Service
@Transactional
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public CustomerService(CustomerRepository customerRepository,
                           PasswordResetTokenRepository tokenRepository,
                           PasswordEncoder passwordEncoder,
                           EmailService emailService) {
        this.customerRepository = customerRepository;
        this.tokenRepository = tokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }


    @Transactional(readOnly = true)
    public CustomerProfileResponse getMyProfile(String email) {

        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found"));

        return new CustomerProfileResponse(
                customer.getName(),
                customer.getEmail(),
                customer.getPhone(),          // can be null
                customer.getAvatarUrl(),      // can be null
                customer.getRole().name(),
                customer.isActive(),
                customer.getCreatedAt()
        );

    }

    @Transactional
    public void updateMyProfile(String email, UpdateCustomerProfileRequest request) {

        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found"));

        customer.setName(request.getName());

        if (request.getPhone() != null) {
            customer.setPhone(request.getPhone());
        }

        customerRepository.save(customer);
    }

    public void uploadAvatar(MultipartFile file, String email) {

        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        if (file.isEmpty()) {
            throw new BadRequestException("Avatar file is required");
        }
        if (!file.getContentType().startsWith("image/")) {
            throw new BadRequestException("Only image files are allowed");
        }

        String contentType = file.getContentType();

        if (contentType == null ||
                (!contentType.equals("image/jpeg") &&
                        !contentType.equals("image/png") &&
                        !contentType.equals("image/jpg"))) {
            throw new BadRequestException("Only JPG and PNG images are allowed");
        }

        if (file.getSize() > 2 * 1024 * 1024) {
            throw new BadRequestException("Avatar size must be under 2MB");
        }

        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

        Path uploadPath = Paths.get("uploads/avatars");

        try {
            Files.createDirectories(uploadPath);
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            customer.setAvatarUrl("/uploads/avatars/" + fileName);
            customerRepository.save(customer);

        } catch (IOException e) {
            throw new RuntimeException("Failed to upload avatar", e);
        }
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
    @Transactional
    public void forgotPassword(String email) {

        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found"));

        tokenRepository.deleteByCustomer_Id(customer.getId());

        String token = UUID.randomUUID().toString();

        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setCustomer(customer);
        resetToken.setExpiryTime(LocalDateTime.now().plusMinutes(15));

        tokenRepository.save(resetToken);

        String resetLink =
                "http://localhost:5173/reset-password?token=" + token;


        try {
            emailService.sendResetPasswordMail(customer.getEmail(), resetLink);
            log.info("Reset password email sent to {}", customer.getEmail());
        } catch (Exception e) {
            log.error("EMAIL FAILED", e);
            throw new BusinessException("Failed to send reset email");
        }


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

