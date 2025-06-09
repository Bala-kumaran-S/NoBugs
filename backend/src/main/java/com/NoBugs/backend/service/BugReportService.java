package com.NoBugs.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.NoBugs.backend.dto.BugReportDTO;
import com.NoBugs.backend.entity.BugReport;
import com.NoBugs.backend.entity.Scope;
import com.NoBugs.backend.entity.User;
import com.NoBugs.backend.repository.BugReportRepository;
import com.NoBugs.backend.repository.ScopeRepository;
import com.NoBugs.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BugReportService {

    private final BugReportRepository bugReportRepo;
    private final UserRepository userRepo;
    private final ScopeRepository scopeRepo;

    public BugReport submitBugReport(BugReportDTO dto) {
        User reporter = userRepo.findById(dto.getReporterUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + dto.getReporterUserId()));

        Scope scope = scopeRepo.findById(dto.getScopeId())
                .orElseThrow(() -> new IllegalArgumentException("Scope not found with ID: " + dto.getScopeId()));

        BugReport bugReport = new BugReport();
        bugReport.setReporter(reporter);
        bugReport.setScope(scope);
        bugReport.setTitle(dto.getTitle());
        bugReport.setDescription(dto.getDescription());
        bugReport.setReporterSeverity(dto.getReporterSeverity());
        bugReport.setAffectedEndpoint(dto.getAffectedEndpoint());
        bugReport.setStepsToReproduce(dto.getStepsToReproduce());
        bugReport.setAttachmentUrl1(dto.getAttachmentUrl1());
        // status, uniqueId, submittedAt are set automatically in entity

        return bugReportRepo.save(bugReport);
    }

    public List<BugReport> getAllBugReports() {
        return bugReportRepo.findAll();
    }

    // You can add more methods for updating status, admin severity, notes, etc.
}
