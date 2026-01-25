package com.retail.backend.service;

import com.retail.backend.dto.LoginRequest;
import com.retail.backend.dto.LoginResponse;
import com.retail.backend.dto.RegisterRequest;
import com.retail.backend.dto.RegisterResponse;
import com.retail.backend.entity.Customer;
import com.retail.backend.entity.Role;
import com.retail.backend.core.JwtUtil;
import com.retail.backend.exception.BusinessException;
import com.retail.backend.repository.CustomerRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;

@Service
public class AuthService {

    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

        public AuthService(CustomerRepository customerRepository,
                           PasswordEncoder passwordEncoder,
                           JwtUtil jwtUtil) {
            this.customerRepository = customerRepository;
            this.passwordEncoder = passwordEncoder;
            this.jwtUtil = jwtUtil;
        }


    public RegisterResponse register(RegisterRequest request) {

        if (customerRepository.existsByEmail(request.getEmail())) {
            throw new BusinessException("Email already registered");
        }

        Customer customer = new Customer();
        customer.setName(request.getName());
        customer.setEmail(request.getEmail());
        customer.setPhone(request.getPhone());
        customer.setPassword(passwordEncoder.encode(request.getPassword()));
        customer.setRole(Role.CUSTOMER);
        customer.setActive(true);
        customer.setCreatedAt(LocalDateTime.now());

        Customer savedCustomer = customerRepository.save(customer);

        return new RegisterResponse(
                savedCustomer.getId(),
                "Registration successful"
        );
    }

    public LoginResponse login(LoginRequest request) {

        Customer customer = customerRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BusinessException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), customer.getPassword())) {
            throw new BusinessException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(
                customer.getEmail(),
                customer.getRole().name()
        );

        return new LoginResponse(
                token,
                customer.getEmail(),
                customer.getRole().name()
        );
    }

}
