package com.NoBugs.backend.controller;

import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.NoBugs.backend.entity.AuditLog;
import com.NoBugs.backend.repository.AuditLogRepository;
import com.NoBugs.backend.security.RateLimitFilter;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AuditLogRepository auditLogRepository;
    private final RateLimitFilter rateLimitFilter;

    @GetMapping("/audit-logs")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Page<AuditLog> getAuditLogs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        return auditLogRepository.findAll(
            PageRequest.of(page, size, Sort.by("createdAt").descending())
        );
    }

    @GetMapping("/rate-limits")
    //@PreAuthorize("hasAuthority('ADMIN')")
    public Set<String> getBlockedIps() {
        return rateLimitFilter.getBlockedIps();
    }

    @DeleteMapping("/rate-limits/{ip}")
    //@PreAuthorize("hasAuthority('ADMIN')")
    public void unblockIp(@PathVariable String ip) {
        rateLimitFilter.unblockIp(ip);
    }
}

