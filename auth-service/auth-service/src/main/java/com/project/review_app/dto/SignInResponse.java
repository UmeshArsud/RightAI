package com.project.review_app.dto;

import lombok.Data;

// This is what we send back to React after a successful login
@Data
public class SignInResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    // We can add a List<String> roles here later

    public SignInResponse(String accessToken, Long id, String username, String email) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
    }
}