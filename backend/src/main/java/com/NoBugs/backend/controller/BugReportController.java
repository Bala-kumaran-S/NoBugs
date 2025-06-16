package com.NoBugs.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.NoBugs.backend.dto.BugReportDTO;
import com.NoBugs.backend.service.BugReportService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/researcher/bugs")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BugReportController {
    private final BugReportService bugReportService;

    // POST /api/researcher/bugs - Submit a new bug report
    @PostMapping
    public ResponseEntity<BugReportDTO> submitBug(@RequestBody BugReportDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(bugReportService.submitBug(dto));
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

}