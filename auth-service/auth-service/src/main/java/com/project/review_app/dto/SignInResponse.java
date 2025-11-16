package com.project.review_app.dto;

import lombok.Data;

@Data
public class SignInResponse { //back to the React
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;

    public SignInResponse(String accessToken, Long id, String username, String email) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
    }
}