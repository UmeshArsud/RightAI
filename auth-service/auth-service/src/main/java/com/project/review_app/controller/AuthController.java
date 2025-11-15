package com.project.review_app.controller;

import com.project.review_app.dto.SignInRequest;
import com.project.review_app.dto.SignInResponse;
import com.project.review_app.dto.SignUpRequest;
import com.project.review_app.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        try {
            authService.registerUser(signUpRequest);
            return ResponseEntity.ok("User registered successfully!");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // --- UPDATE THIS METHOD ---
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody SignInRequest signInRequest) {
        // The service now handles all auth logic and returns the response
        // We can add try/catch here for bad credentials later if we want
        SignInResponse signInResponse = authService.authenticateUser(signInRequest);
        return ResponseEntity.ok(signInResponse);
    }
}