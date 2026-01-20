package com.NoBugs.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
    private final ScopeRepository scopeRepo;
    private final UserRepository userRepo;

    // Submit a new bug report
    public BugReportDTO submitBug(BugReportDTO dto) {
        User reporter = getCurrentUser();
        Scope scope = scopeRepo.findById(dto.getScopeId())
                .orElseThrow(() -> new IllegalArgumentException("Scope not found"));

        BugReport bug = new BugReport();
        bug.setScope(scope);
        bug.setReporter(reporter);
        bug.setTitle(dto.getTitle());
        bug.setDescription(dto.getDescription());
        bug.setReporterSeverity(dto.getReporterSeverity());
        bug.setAffectedEndpoint(dto.getAffectedEndpoint());
        bug.setStepsToReproduce(dto.getStepsToReproduce());
        bug.setAttachmentUrl1(dto.getAttachmentUrl1());
        // status, uniqueId, submittedAt handled by entity
        BugReport saved = bugReportRepo.save(bug);
        return mapToDTO(saved);
    }

    // Get all bug reports submitted by the current researcher
    public List<BugReportDTO> getMyBugReports() {
        User reporter = getCurrentUser();
        System.out.println("Current user: " + reporter);
        return bugReportRepo.findByReporter(reporter)
                .stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    // Get bug report by ID (with access control as needed)
    public BugReportDTO getBugById(Long id) {
        BugReport bug = bugReportRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Bug report not found"));
        return mapToDTO(bug);
    }

    // Helper: Map entity to DTO
    private BugReportDTO mapToDTO(BugReport bug) {
        BugReportDTO dto = new BugReportDTO();
        dto.setId(bug.getId());
        dto.setUniqueId(bug.getUniqueId());
        dto.setScopeId(bug.getScope().getId());
        dto.setScopeTitle(bug.getScope().getTitle());
        dto.setReporter(bug.getReporter().getId());
        dto.setOrganizationName(bug.getScope().getOrganization().getName());
        dto.setTitle(bug.getTitle());
        dto.setDescription(bug.getDescription());
        dto.setReporterSeverity(bug.getReporterSeverity());
        dto.setAdminSeverity(bug.getAdminSeverity());
        dto.setAffectedEndpoint(bug.getAffectedEndpoint());
        dto.setStepsToReproduce(bug.getStepsToReproduce());
        dto.setAttachmentUrl1(bug.getAttachmentUrl1());
        dto.setSubmittedAt(bug.getSubmittedAt() != null ? bug.getSubmittedAt().toString() : null);
        System.out.println("In service before updating" + bug.getStatus());
        if (bug.getStatus() != null) {

            dto.setStatus(bug.getStatus());
        }
        System.out.println("In service after updating" + dto.getStatus());

        dto.setAdminNotes(bug.getAdminNotes());
        return dto;
    }

    // Helper: Get current authenticated user
    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + email));
    }

    // Get all bug reports for a specific organization
    public List<BugReportDTO> getBugsByOrganization(Long orgId) {
        List<BugReport> bugs = bugReportRepo.findByScope_OrganizationId(orgId);
        return bugs.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    // Update a bug report
    public BugReportDTO updateBug(Long id, BugReportDTO dto) {
        BugReport bug = bugReportRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Bug report not found"));

        // Update fields as needed
        bug.setTitle(dto.getTitle());
        bug.setDescription(dto.getDescription());
        bug.setReporterSeverity(dto.getReporterSeverity());
        bug.setAdminSeverity(dto.getAdminSeverity());
        bug.setAffectedEndpoint(dto.getAffectedEndpoint());
        bug.setStepsToReproduce(dto.getStepsToReproduce());
        bug.setAttachmentUrl1(dto.getAttachmentUrl1());
        bug.setAdminNotes(dto.getAdminNotes());
        System.out.println("Updating status to " + dto.getStatus());
        bug.setStatus(dto.getStatus());
        System.out.println(dto.getClass().getName());
        System.out.println("Updated entity status to " + bug.getStatus());

        BugReport updated = bugReportRepo.save(bug);
        return mapToDTO(updated);
    }
}