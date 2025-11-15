package com.project.review_app.service;

import com.project.review_app.dto.SignInRequest;
import com.project.review_app.dto.SignInResponse;
import com.project.review_app.dto.SignUpRequest;
import com.project.review_app.model.User;
import com.project.review_app.repository.UserRepository;
import com.project.review_app.security.JwtUtils;
import com.project.review_app.security.UserDetailsImpl;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    public AuthServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder,
                           AuthenticationManager authenticationManager,
                           JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    @Override
    public void registerUser(SignUpRequest signUpRequest) {
        // ... (existing registerUser logic)
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            throw new RuntimeException("Error: Username is already taken!");
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new RuntimeException("Error: Email is already in use!");
        }

        String hashedPassword = passwordEncoder.encode(signUpRequest.getPassword());

        User user = User.builder()
                .firstName(signUpRequest.getFirstName())
                .lastName(signUpRequest.getLastName())
                .username(signUpRequest.getUsername())
                .email(signUpRequest.getEmail())
                .mobile(signUpRequest.getMobile())
                .password(hashedPassword)
                .build();

        userRepository.save(user);
    }

    // Add this new method
    @Override
    public SignInResponse authenticateUser(SignInRequest signInRequest) {
        // 1. Authenticate user with Spring Security
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signInRequest.getUsername(), signInRequest.getPassword()));

        // 2. Set authentication in the SecurityContext
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 3. Generate the JWT
        String jwt = jwtUtils.generateJwtToken(authentication);

        // 4. Get UserDetails from the authentication object
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        // 5. Return the response DTO
        return new SignInResponse(
                jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail());
    }
}