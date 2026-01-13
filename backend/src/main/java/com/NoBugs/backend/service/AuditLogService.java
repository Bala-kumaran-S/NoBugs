package com.NoBugs.backend.service;

import org.springframework.stereotype.Service;

import com.NoBugs.backend.entity.AuditLog;
import com.NoBugs.backend.repository.AuditLogRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuditLogService {

    private final AuditLogRepository repo;

    public void log(Long userId, String action, String entity, String entityId, String ip) {

        AuditLog log = AuditLog.builder()
                .userId(userId)
                .action(action)
                .entity(entity)
                .entityId(entityId)
                .ipAddress(ip)
                .build();

        repo.save(log);
    }
}

