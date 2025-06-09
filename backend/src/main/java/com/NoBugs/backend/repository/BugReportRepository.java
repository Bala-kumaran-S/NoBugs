package com.NoBugs.backend.repository;

import com.NoBugs.backend.entity.BugReport;
import com.NoBugs.backend.entity.BugStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

/**
 * Spring Data JPA repository for the BugReport entity.
 * Provides standard CRUD operations and allows defining custom query methods.
 */
public interface BugReportRepository extends JpaRepository<BugReport, Long> {

    /**
     * Finds a BugReport by its unique ID.
     *
     * @param uniqueId The unique ID of the bug report.
     * @return An Optional containing the BugReport if found, or empty otherwise.
     */
    Optional<BugReport> findByUniqueId(String uniqueId);

    /**
     * Finds all BugReports submitted by a specific user (reporter).
     *
     * @param reporterId The ID of the user who reported the bugs.
     * @return A list of BugReports submitted by the specified reporter.
     */
    List<BugReport> findByReporterId(Long reporterId);

    /**
     * Finds all BugReports for a specific scope.
     *
     * @param scopeId The ID of the scope the bug was reported against.
     * @return A list of BugReports for the specified scope.
     */
    List<BugReport> findByScopeId(Long scopeId);

    /**
     * Finds all BugReports with a specific status.
     *
     * @param status The status of the bug reports (e.g., SUBMITTED, VALID).
     * @return A list of BugReports matching the given status.
     */
    List<BugReport> findByStatus(BugStatus status);

    /**
     * Finds all BugReports for a specific scope and status.
     *
     * @param scopeId The ID of the scope.
     * @param status The status of the bug reports.
     * @return A list of BugReports matching the given scope and status.
     */
    List<BugReport> findByScopeIdAndStatus(Long scopeId, BugStatus status);
}
