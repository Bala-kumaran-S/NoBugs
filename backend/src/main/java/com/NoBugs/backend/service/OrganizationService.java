package com.NoBugs.backend.service;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.NoBugs.backend.dto.OrganizationDTO;
import com.NoBugs.backend.entity.Organization;
import com.NoBugs.backend.entity.User;
import com.NoBugs.backend.repository.OrganizationRepository;
import com.NoBugs.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrganizationService {

    private final OrganizationRepository orgRepo;
    private final UserRepository userRepo;

    public Organization createOrganization(OrganizationDTO orgDTO) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = auth.getName();
        
        // Find the user by email
        User user = userRepo.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + userEmail));

        Organization org = new Organization();
        org.setName(orgDTO.getName());
        org.setDescription(orgDTO.getDescription());
        org.setContactEmail(orgDTO.getContactEmail());
        org.setRegisteredByEmail(userEmail); // Set the email of the user who registered the organization
        org.setRegisteredBy(user); // Set the user who registered the organization
        org.setIsApproved(false); // optional, default handled in entity
        // createdAt will be set automatically by @PrePersist

        return orgRepo.save(org);
    }

    public List<Organization> getAllOrganizations() {
        return orgRepo.findAll();
    }

    // GET my organization (for the currently authenticated user)
    public Organization getMyOrganization() {
    
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = auth.getName();
        org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(OrganizationService.class);
        logger.info("Fetching organization for user with email: {}", userEmail);
        Organization org = orgRepo.findByRegisteredBy_Email(userEmail)
            .orElseThrow(() -> new IllegalArgumentException("Organization not found for current user"));
        logger.info("Fetched organization: {}", org);
        return org;
    }

    // UPDATE my organization (for the currently authenticated user)
    public Organization updateMyOrganization(OrganizationDTO orgDTO) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = auth.getName();
        Organization org = orgRepo.findByRegisteredBy_Email(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("Organization not found for current user"));

        org.setName(orgDTO.getName());
        org.setDescription(orgDTO.getDescription());
        org.setContactEmail(orgDTO.getContactEmail());
        // Optionally update other fields

        return orgRepo.save(org);
    }

    // Helper to get the currently authenticated user
    private User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));
    }
}
