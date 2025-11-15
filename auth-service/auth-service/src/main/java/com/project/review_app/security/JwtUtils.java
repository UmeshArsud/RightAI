package com.project.review_app.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    // 1. Generate a strong secret key (run this in a main method once and copy the Base64 string)
    // SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    // String base64Key = Encoders.BASE64.encode(key.getEncoded());
    // System.out.println(base64Key);
    // For this example, I've pre-generated one.
    // !! IN A REAL APP: Put this in application.properties and load with @Value !!
    private final String jwtSecret = "u+N4z/jE3jYmSjNCEmY3mJqYYS5jM2NmZGRlMTUyZTE2MTQ3YzBkYTVmYjNmNGMzMjUxZDU5MGIwMmI=";

    // Token validity (e.g., 24 hours)
    private final int jwtExpirationMs = 1000 * 60 * 60 * 24;

    private final SecretKey key;

    public JwtUtils() {
        this.key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    // Create a JWT from user authentication
    public String generateJwtToken(Authentication authentication) {
        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject((userPrincipal.getUsername()))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    // Get username from a JWT
    public String getUserNameFromJwtToken(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build()
                .parseClaimsJws(token).getBody().getSubject();
    }

    // Validate a JWT
    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(authToken);
            return true;
        } catch (SecurityException e) {
            logger.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }

        return false;
    }
}