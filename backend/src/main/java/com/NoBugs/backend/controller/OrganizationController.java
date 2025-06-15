package com.NoBugs.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.NoBugs.backend.entity.User;
import com.NoBugs.backend.repository.UserRepository;
import com.NoBugs.backend.dto.OrganizationDTO;
import com.NoBugs.backend.entity.Organization;
import com.NoBugs.backend.service.OrganizationService;
import com.NoBugs.backend.dto.ScopeDTO;
import com.NoBugs.backend.entity.Scope;
import com.NoBugs.backend.service.ScopeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/orgs")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class OrganizationController {

    private final OrganizationService orgService;
    private final UserRepository userRepository;
    private final ScopeService scopeService;

    // POST /api/orgs/register
    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
        // Get authenticated user
    public ResponseEntity<Organization> registerOrg(@RequestBody OrganizationDTO orgDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(orgService.createOrganization(orgDTO));
    }

    // GET /api/orgs/me
    @GetMapping(value = "/me", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Organization> getMyOrg() {
        
        return ResponseEntity.ok(orgService.getMyOrganization());
    }

    // PUT /api/orgs/me
    @PutMapping(value = "/me", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Organization> updateMyOrg(@RequestBody OrganizationDTO orgDTO) {
        return ResponseEntity.ok(orgService.updateMyOrganization(orgDTO));
    }

    // (Optional) GET /api/orgs - all orgs
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Organization>> getAllOrgs() {
        return ResponseEntity.ok(orgService.getAllOrganizations());
    }

    // POST /api/orgs/scopes
    @PostMapping("/scopes")
    public ResponseEntity<ScopeDTO> addScopeToOrg(@RequestBody ScopeDTO scopeDTO) {
        ScopeDTO scope = scopeService.createScope(scopeDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(scope);
    }
}