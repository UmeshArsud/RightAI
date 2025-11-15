package com.project.review_app.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

// This is the "Data Transfer Object" (DTO) that our React app will send.
// It keeps our API clean and separate from our database model.
@Data
public class SignUpRequest {

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @NotBlank
    private String username;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String mobile;

    @NotBlank
    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String password;

    // Note: We don't need confirmPassword here.
    // The React app is responsible for checking if passwords match *before* sending.
}