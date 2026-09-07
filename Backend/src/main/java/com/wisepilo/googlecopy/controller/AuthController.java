package com.wisepilo.googlecopy.controller;

import com.wisepilo.googlecopy.dto.request.LoginRequest;
import com.wisepilo.googlecopy.dto.request.RegisterRequest;
import com.wisepilo.googlecopy.dto.request.VerifyPasswordRequest;
import com.wisepilo.googlecopy.dto.response.AuthResponse;
import com.wisepilo.googlecopy.service.AuthService;
import com.wisepilo.googlecopy.service.exception.InvalidCredentialsException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify-password")
    public ResponseEntity<Void> verifyPassword(@Valid @RequestBody VerifyPasswordRequest request, Authentication authentication) {
        authService.verifyPassword(request.getPassword(), authentication);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/me")
    public ResponseEntity<AuthResponse> checkSession(Authentication authentication) {
        AuthResponse response = authService.getCurrentUser(authentication);
        return ResponseEntity.ok(response);
    }
}