package com.NoBugs.backend.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import com.NoBugs.backend.dto.BugReportDTO;
import com.NoBugs.backend.entity.BugReport;
import com.NoBugs.backend.entity.BugStatus;
import com.NoBugs.backend.service.BugReportService;
import com.NoBugs.backend.service.AuditLogService;
import com.NoBugs.backend.util.RequestUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/researcher/bugs")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BugReportController {

    private final BugReportService bugReportService;
    private final AuditLogService auditLogService;
    private final com.NoBugs.backend.repository.BugReportRepository bugReportRepo;

    // POST /api/researcher/bugs - Submit a new bug report
    @PostMapping
    public ResponseEntity<BugReportDTO> submitBug(@RequestBody BugReportDTO dto) {

        BugReportDTO createdBug = bugReportService.submitBug(dto);

        auditLogService.log(
                createdBug.getReporter(),
                "CREATE",
                "Bug",
                createdBug.getId().toString(),
                RequestUtil.getClientIp()
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(createdBug);
    }

    // GET /api/researcher/bugs - Get all my bug reports
    @GetMapping
    public ResponseEntity<List<BugReportDTO>> getMyBugs() {
        return ResponseEntity.ok(bugReportService.getMyBugReports());
    }

    // GET /api/researcher/bugs/{id} - Get a specific bug report
    @GetMapping("/{id}")
    public ResponseEntity<BugReportDTO> getBug(@PathVariable Long id) {
        return ResponseEntity.ok(bugReportService.getBugById(id));
    }

    // GET /api/researcher/bugs/org/{orgId} - Get all bug reports for an organization
    @GetMapping("/org/{orgId}")
    public ResponseEntity<List<BugReportDTO>> getBugsByOrg(@PathVariable Long orgId) {
        return ResponseEntity.ok(bugReportService.getBugsByOrganization(orgId));
    }

    // PUT /api/researcher/bugs/{id} - Update a bug report
@Transactional
@PutMapping("/{id}")
public ResponseEntity<BugReportDTO> updateBug(
        @PathVariable Long id,
        @RequestBody BugReportDTO dto) {
            
        System.out.println("Incoming DTO status = in controller" + dto.getStatus());
        System.out.println(dto.getClass().getName());


    BugReportDTO updatedBug = bugReportService.updateBug(id, dto);
    System.out.println("After update, entity status = in controller" + updatedBug.getStatus());
    auditLogService.log(
            updatedBug.getReporter(),
            "UPDATE",
            "Bug",
            updatedBug.getId().toString(),
            RequestUtil.getClientIp()
    );

    return ResponseEntity.ok(updatedBug);
}



}
