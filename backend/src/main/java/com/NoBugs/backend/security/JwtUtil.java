package com.NoBugs.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

// Import User class (adjust the package if User is in a different package)
import com.NoBugs.backend.entity.User;

@Component
public class JwtUtil {

    private final String SECRET_KEY_STRING = "bXl2ZXJ5c2VjdXJlc2VjcmV0a2V5dGhhdHNhZmUhISE="; // Base64
    private final Key SECRET_KEY = Keys.hmacShaKeyFor(java.util.Base64.getDecoder().decode(SECRET_KEY_STRING));

    // Generate JWT token
    // public String generateToken(String username) {
    //     try {
    //         return Jwts.builder()
    //                 .setSubject(username)
    //                 .setIssuedAt(new Date())
    //                 .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours
    //                 .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
    //                 .compact();
    //     } catch (Exception e) {
    //         System.err.println("JWT generation failed: " + e.getMessage());
    //         return null;
    //     }
    // }

    // New method to generate token with user details
    public String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("role", user.getRole().name()) // Add role claim
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }

    // Extract username from JWT token
    public String extractUsername(String token) {
        try {
            return parseToken(token).getBody().getSubject();
        } catch (JwtException e) {
            System.err.println("JWT extractUsername failed: " + e.getMessage());
            return null;
        }
    }

    // Validate JWT token
    public boolean validateToken(String token, String username) {
        try {
            String extractedUsername = extractUsername(token);
            if (extractedUsername == null) {
                System.err.println("JWT validation failed: extracted username is null");
                return false;
            }
            boolean valid = extractedUsername.equals(username) && !isTokenExpired(token);
            if (!valid) {
                System.err.println("JWT validation failed: username mismatch or token expired");
            }
            return valid;
        } catch (JwtException e) {
            System.err.println("JWT validation failed: " + e.getMessage());
            return false;
        } catch (Exception e) {
            System.err.println("Unexpected error during JWT validation: " + e.getMessage());
            return false;
        }
    }

    // Check if token is expired
    private boolean isTokenExpired(String token) {
        try {
            Date expiration = parseToken(token).getBody().getExpiration();
            boolean expired = expiration.before(new Date());
            if (expired) {
                System.err.println("JWT token is expired");
            }
            return expired;
        } catch (JwtException e) {
            System.err.println("JWT isTokenExpired failed: " + e.getMessage());
            return true;
        }
    }

    // Parse token and return claims
    private Jws<Claims> parseToken(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseClaimsJws(token);
        } catch (JwtException e) {
            System.err.println("JWT parseToken failed: " + e.getMessage());
            throw e;
        }
    }
}
