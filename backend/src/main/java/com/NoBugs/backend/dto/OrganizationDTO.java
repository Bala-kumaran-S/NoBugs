package com.NoBugs.backend.dto;

import lombok.Data;

@Data
public class OrganizationDTO {
    private String name;
    private String description;
    private String contactEmail;
    private Long registeredByUserId; // instead of embedding User object
}
