package com.NoBugs.backend.controller;

import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.NoBugs.backend.dto.AuthRequest;
import com.NoBugs.backend.dto.AuthResponse;
import com.NoBugs.backend.dto.UserDTO;
import com.NoBugs.backend.entity.User;
import com.NoBugs.backend.security.JwtUtil;
import com.NoBugs.backend.service.UserService;
import com.NoBugs.backend.service.AuditLogService;
import com.NoBugs.backend.service.RefreshTokenService;
import com.NoBugs.backend.util.RequestUtil;
import com.NoBugs.backend.util.SecurityUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AuthController {

    private final JwtUtil jwtUtil;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final AuditLogService auditLogService;
    private final RefreshTokenService refreshTokenService;


    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody User user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        UserDTO createdUser = userService.createUser(user);

        auditLogService.log(
                createdUser.getId().longValue(),
                "REGISTER",
                "User",
                createdUser.getId().toString(),
                RequestUtil.getClientIp()
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {

        User user = userService.findbyEmail(request.getEmail()).orElse(null);

        if (user != null && passwordEncoder.matches(request.getPassword(), user.getPassword())) {

            String accessToken = jwtUtil.generateToken(user);
            String refreshToken = refreshTokenService.create(user.getId());

            auditLogService.log(
                    user.getId(),
                    "LOGIN",
                    "User",
                    user.getId().toString(),
                    RequestUtil.getClientIp()
            );

            return ResponseEntity.ok(new AuthResponse(accessToken, refreshToken));
        }

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(@RequestBody String refreshToken) {

        Long userId = refreshTokenService.validate(refreshToken);
        User user = userService.getUserEntityById(userId);

        String newAccessToken = jwtUtil.generateToken(user);

        return ResponseEntity.ok(new AuthResponse(newAccessToken, refreshToken));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {

        Long userId = SecurityUtil.getCurrentUserId(userService);

        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        refreshTokenService.revokeByUserId(userId);

        auditLogService.log(
                userId,
                "LOGOUT",
                "User",
                null,
                RequestUtil.getClientIp()
        );

        return ResponseEntity.ok().build();
    }
}
