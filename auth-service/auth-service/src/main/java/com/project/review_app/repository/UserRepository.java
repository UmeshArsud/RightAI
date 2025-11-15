package com.project.review_app.repository;

import com.project.review_app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Find a user by their username
    Optional<User> findByUsername(String username);

    // Check if a user exists by their username
    Boolean existsByUsername(String username);

    // Check if a user exists by their email
    Boolean existsByEmail(String email);
}