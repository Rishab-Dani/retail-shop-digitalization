package com.retail.backend.service;

import com.retail.backend.dto.CustomerProfileResponse;
import com.retail.backend.entity.User;
import com.retail.backend.exception.ResourceNotFoundException;
import com.retail.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
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

}
