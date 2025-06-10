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

import com.NoBugs.backend.dto.OrganizationDTO;
import com.NoBugs.backend.entity.Organization;
import com.NoBugs.backend.service.OrganizationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/orgs")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class OrganizationController {

    private final OrganizationService orgService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Organization> createOrg(@RequestBody OrganizationDTO orgDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(orgService.createOrganization(orgDTO));
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Organization>> getAllOrgs() {
        return ResponseEntity.ok(orgService.getAllOrganizations());
    }

}
