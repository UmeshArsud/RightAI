// The package is 'com.project.review_app.auth_service' based on your log
package com.project.review_app.auth_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
// --- ADD THESE THREE ANNOTATIONS ---
// Tell Spring to scan the *entire* base package for components
@ComponentScan(basePackages = "com.project.review_app")
// Tell Spring where to find your @Entity files
@EntityScan(basePackages = "com.project.review_app.model")
// Tell Spring where to find your @Repository files
@EnableJpaRepositories(basePackages = "com.project.review_app.repository")
// --- END OF FIX ---
public class AuthServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(AuthServiceApplication.class, args);
    }

}