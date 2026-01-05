package com.retail.backend.controller;

import com.retail.backend.dto.LoginRequest;
import com.retail.backend.dto.LoginResponse;
import com.retail.backend.security.JwtService;
import com.retail.backend.security.JwtUtil;
import jakarta.validation.Valid;
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

    public AuthController(AuthenticationManager authenticationManager,
                          JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
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


//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
//        log.debug("Login method calling");
//        System.out.println("Login method calling");
//        Authentication auth = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                        request.getEmail(),
//                        request.getPassword()
//                )
//        );
//        log.debug("Auth value{}",auth);
//        System.out.println("Auth value " + auth);
//        String token = jwtService.generateToken(auth);
//        log.debug("Token value{}",token);
//        System.out.println("token value " + token);
//        return ResponseEntity.ok(
//                Map.of("token", token)
//        );
//    }

}

