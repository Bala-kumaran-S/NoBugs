package com.NoBugs.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.NoBugs.backend.dto.BugReportDTO;
import com.NoBugs.backend.entity.BugReport;
import com.NoBugs.backend.service.BugReportService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/bugs")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BugReportController {

    private final BugReportService bugReportService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BugReport> submitBugReport(@RequestBody BugReportDTO bugReportDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(bugReportService.submitBugReport(bugReportDTO));
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<BugReport>> getAllBugReports() {
        return ResponseEntity.ok(bugReportService.getAllBugReports());
    }
}
