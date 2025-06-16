package com.NoBugs.backend.dto;

import com.NoBugs.backend.entity.BugStatus;
import com.NoBugs.backend.entity.Severity;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BugReportDTO {
    private Long id;
    private String uniqueId;
    private Long scopeId;
    private String scopeTitle;
    private String organizationName;
    private String title;
    private String description;
    private Severity reporterSeverity;
    private Severity adminSeverity;
    private String affectedEndpoint;
    private String stepsToReproduce;
    private String attachmentUrl1;
    private String submittedAt;
    private BugStatus status;
    private String adminNotes;
}