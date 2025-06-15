package com.NoBugs.backend.service;

import com.NoBugs.backend.dto.ScopeDTO;
import com.NoBugs.backend.entity.Organization;
import com.NoBugs.backend.entity.Scope;
import com.NoBugs.backend.repository.OrganizationRepository;
import com.NoBugs.backend.repository.UserRepository;
import com.NoBugs.backend.repository.ScopeRepository;
import com.NoBugs.backend.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ScopeService {

    private final ScopeRepository scopeRepo;
    private final OrganizationRepository orgRepo;
    private final UserRepository userRepo;

    // Get all scopes
    public List<ScopeDTO> getAllScopes() {
        return scopeRepo.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // Get a scope by its ID
    public Optional<ScopeDTO> getScopeById(Long id) {
        return scopeRepo.findById(id).map(this::mapToDTO);
    }

    // Get all scopes for a specific organization
    public List<ScopeDTO> getScopesByOrganizationId(Long organizationId) {
        Organization org = orgRepo.findById(organizationId)
                .orElseThrow(() -> new IllegalArgumentException("Organization not found"));
        return scopeRepo.findByOrganization(org).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // Create a new scope for the current user's organization
    public ScopeDTO createScope(ScopeDTO scopeDTO) {
        Organization org = getCurrentUserOrganization();
        Scope scope = new Scope();
        scope.setOrganization(org);
        scope.setTitle(scopeDTO.getTitle());
        scope.setTargetUrl(scopeDTO.getTargetUrl());
        scope.setDescription(scopeDTO.getDescription());
        scope.setInScopeRules(scopeDTO.getInScopeRules());
        scope.setOutOfScopeRules(scopeDTO.getOutOfScopeRules());
        scope.setType(scopeDTO.getType());
        Scope saved = scopeRepo.save(scope);
        return mapToDTO(saved);
    }

    // Update an existing scope
    public ScopeDTO updateScope(Long id, ScopeDTO scopeDTO) {
        Scope scope = scopeRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Scope not found"));
        scope.setTitle(scopeDTO.getTitle());
        scope.setTargetUrl(scopeDTO.getTargetUrl());
        scope.setDescription(scopeDTO.getDescription());
        scope.setInScopeRules(scopeDTO.getInScopeRules());
        scope.setOutOfScopeRules(scopeDTO.getOutOfScopeRules());
        scope.setType(scopeDTO.getType());
        Scope updated = scopeRepo.save(scope);
        return mapToDTO(updated);
    }

    // Delete a scope
    public void deleteScope(Long id) {
        scopeRepo.deleteById(id);
    }

    // Helper: Map Scope entity to DTO
    private ScopeDTO mapToDTO(Scope scope) {
        ScopeDTO dto = new ScopeDTO();
        dto.setId(scope.getId());
        dto.setOrganizationId(scope.getOrganization().getId());
        dto.setTitle(scope.getTitle());
        dto.setTargetUrl(scope.getTargetUrl());
        dto.setDescription(scope.getDescription());
        dto.setInScopeRules(scope.getInScopeRules());
        dto.setOutOfScopeRules(scope.getOutOfScopeRules());
        dto.setType(scope.getType());
        if (scope.getCreatedAt() != null) dto.setCreatedAt(scope.getCreatedAt().toString());
        if (scope.getLastUpdatedAt() != null) dto.setLastUpdatedAt(scope.getLastUpdatedAt().toString());
        return dto;
    }

    // Helper: Get current user's organization
    private Organization getCurrentUserOrganization() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User's organization not found"));
    
        return orgRepo.findByRegisteredBy_Email(user.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Organization not found for user"));
    }
}