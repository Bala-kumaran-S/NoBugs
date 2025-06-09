package com.NoBugs.backend.controller;

import com.NoBugs.backend.entity.Organization;
import com.NoBugs.backend.repository.OrganizationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orgs")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class OrganizationController {

    private final OrganizationRepository orgRepo;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Organization> createOrg(@RequestBody Organization org) {
        return ResponseEntity.status(HttpStatus.CREATED).body(orgRepo.save(org));
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Organization>> getAllOrgs() {
        return ResponseEntity.ok(orgRepo.findAll());
    }
}
