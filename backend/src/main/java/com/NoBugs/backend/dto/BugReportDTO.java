package com.NoBugs.backend.dto;

import com.NoBugs.backend.entity.Severity;
import lombok.Data;

@Data
public class BugReportDTO {
    private Long reporterUserId;
    private Long scopeId;
    private String title;
    private String description;
    private Severity reporterSeverity;
    private String affectedEndpoint;
    private String stepsToReproduce;
    private String attachmentUrl1;
}
