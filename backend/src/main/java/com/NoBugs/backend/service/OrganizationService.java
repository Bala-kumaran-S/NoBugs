package com.NoBugs.backend.service;

import java.util.List;

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
        User user = userRepo.findById(orgDTO.getRegisteredByUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + orgDTO.getRegisteredByUserId()));

        Organization org = new Organization();
        org.setName(orgDTO.getName());
        org.setDescription(orgDTO.getDescription());
        org.setContactEmail(orgDTO.getContactEmail());
        org.setRegisteredBy(user);
        org.setIsApproved(false); // optional, default handled in entity
        // createdAt will be set automatically by @PrePersist

        return orgRepo.save(org);
    }

    public List<Organization> getAllOrganizations() {
        return orgRepo.findAll();
    }
}
