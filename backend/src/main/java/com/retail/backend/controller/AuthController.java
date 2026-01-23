package com.retail.backend.controller;

import com.retail.backend.dto.ForgotPasswordRequest;
import com.retail.backend.dto.LoginRequest;
import com.retail.backend.dto.ResetPasswordRequest;
import com.retail.backend.security.JwtService;
import com.retail.backend.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserService userService;



    public AuthController(AuthenticationManager authenticationManager,
                          JwtService jwtService,
                          UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );

            System.out.println("AUTH OBJECT = " + auth);

            String token = jwtService.generateToken(auth);

            System.out.println("GENERATED TOKEN = " + token);

            return ResponseEntity.ok(Map.of("token", token));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(401).body(
                    Map.of("error", e.getMessage())
            );
        }
    }
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(
            @RequestBody ForgotPasswordRequest request
    ) {
        userService.forgotPassword(request.getEmail());
        return ResponseEntity.ok("Reset token generated (check logs)");
    }


    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(
            @RequestBody ResetPasswordRequest request
    ) {
        userService.resetPassword(
                request.getToken(),
                request.getNewPassword()
        );
        return ResponseEntity.ok("Password reset successfully");
    }
}

