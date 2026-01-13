package com.NoBugs.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.NoBugs.backend.entity.AuditLog;

public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {}
