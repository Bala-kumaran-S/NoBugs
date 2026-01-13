package com.NoBugs.backend.repository;

import java.util.List;
import java.util.Optional;
import com.NoBugs.backend.entity.Scope;
import com.NoBugs.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import com.NoBugs.backend.entity.BugReport;
import com.NoBugs.backend.entity.BugStatus;

public interface BugReportRepository extends JpaRepository<BugReport, Long> {

    Optional<BugReport> findByUniqueId(String uniqueId);

    List<BugReport> findByReporterId(Long reporterId);

    List<BugReport> findByScopeId(Long scopeId);

    List<BugReport> findByStatus(BugStatus status);

    List<BugReport> findByScopeIdAndStatus(Long scopeId, BugStatus status);

    List<BugReport> findByReporter(User reporter);

    List<BugReport> findByScope(Scope scope);

    List<BugReport> findByScope_OrganizationId(Long orgId);

}
