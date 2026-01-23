package com.retail.backend.service;

import com.retail.backend.dto.ChangePasswordRequest;
import com.retail.backend.dto.CustomerProfileResponse;
import com.retail.backend.dto.UpdateCustomerProfileRequest;
import com.retail.backend.entity.PasswordResetToken;
import com.retail.backend.entity.User;
import com.retail.backend.exception.BusinessException;
import com.retail.backend.exception.ResourceNotFoundException;
import com.retail.backend.repository.PasswordResetTokenRepository;
import com.retail.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final PasswordResetTokenRepository tokenRepository;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       PasswordResetTokenRepository tokenRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenRepository = tokenRepository;
    }

    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public CustomerProfileResponse getMyProfile(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return new CustomerProfileResponse(
                user.getName(),
                user.getEmail(),
                user.getRole().name(),
                user.isEnabled()
        );
    }

    @Transactional
    public void updateMyProfile(
            String email,
            UpdateCustomerProfileRequest request
    ) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setName(request.getName());

        userRepository.save(user);
    }

    @Transactional
    public void changePassword(
            String email,
            ChangePasswordRequest request
    ) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!passwordEncoder.matches(
                request.getCurrentPassword(),
                user.getPassword()
        )) {
            throw new BusinessException("Current password is incorrect");
        }

        user.setPassword(
                passwordEncoder.encode(request.getNewPassword())
        );

        userRepository.save(user);
    }
    // ✅ FORGOT PASSWORD
    @Transactional
    public void forgotPassword(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        tokenRepository.deleteByUser_Id(user.getId());

        String token = UUID.randomUUID().toString();

        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setUser(user);
        resetToken.setExpiryTime(LocalDateTime.now().plusMinutes(15));

        tokenRepository.save(resetToken);

        // DEV MODE
        System.out.println("PASSWORD RESET TOKEN = " + token);
    }

    // ✅ RESET PASSWORD
    @Transactional
    public void resetPassword(String token, String newPassword) {

        PasswordResetToken resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new BusinessException("Invalid reset token"));

        if (resetToken.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new BusinessException("Reset token expired");
        }

        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));

        userRepository.save(user);
        tokenRepository.delete(resetToken);
    }

}
