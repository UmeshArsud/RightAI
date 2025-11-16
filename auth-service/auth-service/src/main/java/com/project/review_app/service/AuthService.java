package com.project.review_app.service;

import com.project.review_app.dto.SignInRequest;
import com.project.review_app.dto.SignInResponse;
import com.project.review_app.dto.SignUpRequest;

public interface AuthService {
    void registerUser(SignUpRequest signUpRequest);

    SignInResponse authenticateUser(SignInRequest signInRequest);
}