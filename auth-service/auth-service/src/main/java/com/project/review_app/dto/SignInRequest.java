package com.project.review_app.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

// We'll use this for the sign-in endpoint later.
@Data
public class SignInRequest {
    @NotBlank
    private String username;

    @NotBlank
    private String password;
}