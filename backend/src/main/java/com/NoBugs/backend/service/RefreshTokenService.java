package com.NoBugs.backend.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.NoBugs.backend.entity.RefreshToken;
import com.NoBugs.backend.repository.RefreshTokenRepository;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepository repo;

    public String create(Long userId) {

        String token = UUID.randomUUID().toString();

        RefreshToken rt = RefreshToken.builder()
                .userId(userId)
                .token(token)
                .expiresAt(LocalDateTime.now().plusDays(7))
                .build();

        repo.save(rt);
        return token;
    }

    public Long validate(String token) {
        RefreshToken rt = repo.findByTokenAndRevokedFalse(token)
                .orElseThrow(() -> new RuntimeException("Invalid refresh token"));

        if (rt.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Expired refresh token");
        }

        return rt.getUserId();
    }

    @Transactional
    public void revokeByUserId(Long userId) {
        repo.deleteByUserId(userId);
    }
}

