package com.NoBugs.backend.controller;

import com.NoBugs.backend.entity.BugReport;
import com.NoBugs.backend.entity.BugStatus;
import com.NoBugs.backend.repository.BugReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bugs")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BugReportController {

    private final BugReportRepository bugReportRepository;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BugReport> submitBug(@RequestBody BugReport bug) {
        bug.setStatus(BugStatus.SUBMITTED);
        return ResponseEntity.status(HttpStatus.CREATED).body(bugReportRepository.save(bug));
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<BugReport>> getAllReports() {
        return ResponseEntity.ok(bugReportRepository.findAll());
    }

    @GetMapping(value = "/reporter/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<BugReport>> getBugsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(bugReportRepository.findByReporterId(userId));
    }
}
