package com.NoBugs.backend.controller;

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
import com.NoBugs.backend.util.RequestUtil;

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

    // REGISTER
    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody User user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        UserDTO createdUser = userService.createUser(user);

        auditLogService.log(
                createdUser.getId().longValue(),   // adjust if getId() is Long already
                "REGISTER",
                "User",
                createdUser.getId().toString(),
                RequestUtil.getClientIp()
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {

        User user = userService.findbyEmail(request.getEmail()).orElse(null);

        if (user != null && passwordEncoder.matches(request.getPassword(), user.getPassword())) {

            String token = jwtUtil.generateToken(user);
            if (token == null) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Token generation failed");
            }

            auditLogService.log(
                    user.getId(),
                    "LOGIN",
                    "User",
                    user.getId().toString(),
                    RequestUtil.getClientIp()
            );

            return ResponseEntity.ok(new AuthResponse(token));
        }

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    @PostMapping("/logout")
        public ResponseEntity<Void> logout() {
            System.out.println(">>> LOGOUT endpoint hit");

            auditLogService.log(
                    null,
                    "LOGOUT",
                    "User",
                    null,
                    RequestUtil.getClientIp()
            );

            return ResponseEntity.ok().build();
        }
}
