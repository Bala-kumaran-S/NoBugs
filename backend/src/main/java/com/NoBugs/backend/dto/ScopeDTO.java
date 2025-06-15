package com.NoBugs.backend.dto;

import com.NoBugs.backend.entity.ScopeType;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ScopeDTO {
    private Long id;
    private Long organizationId; // Only the ID, not the whole Organization object
    private String title;
    private String targetUrl;
    private String description;
    private String inScopeRules;
    private String outOfScopeRules;
    private ScopeType type; // PUBLIC or PRIVATE

    // Optionally, you can add createdAt and lastUpdatedAt if you want to expose them in the API
    private String createdAt;
    private String lastUpdatedAt;
}