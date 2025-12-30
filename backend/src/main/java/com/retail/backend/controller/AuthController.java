package com.retail.backend.controller;

import com.retail.backend.dto.LoginRequest;
import com.retail.backend.dto.LoginResponse;
import com.retail.backend.security.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final JwtUtil jwtUtil;

    public AuthController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request
    ) {
        // TEMP USER (for now)
        if (!request.getUsername().equals("admin")
                || !request.getPassword().equals("admin123")) {

            return ResponseEntity.status(401).build();
        }

        String token = jwtUtil.generateToken(request.getUsername());
        return ResponseEntity.ok(new LoginResponse(token));
    }
}
