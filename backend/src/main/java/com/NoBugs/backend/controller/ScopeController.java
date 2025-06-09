package com.NoBugs.backend.controller;

import com.NoBugs.backend.entity.Scope;
import com.NoBugs.backend.repository.ScopeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scopes")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ScopeController {

    private final ScopeRepository scopeRepository;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Scope> createScope(@RequestBody Scope scope) {
        return ResponseEntity.status(HttpStatus.CREATED).body(scopeRepository.save(scope));
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Scope>> getAllScopes() {
        return ResponseEntity.ok(scopeRepository.findAll());
    }

    @GetMapping(value = "/org/{orgId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Scope>> getScopesByOrg(@PathVariable Long orgId) {
        return ResponseEntity.ok(scopeRepository.findByOrganizationId(orgId));
    }
}
