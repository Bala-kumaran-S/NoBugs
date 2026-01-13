package com.NoBugs.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.NoBugs.backend.entity.Organization;
import com.NoBugs.backend.entity.User;

public interface OrganizationRepository extends JpaRepository<Organization, Long> {

    Optional<Organization> findByName(String name);

    List<Organization> findByIsApprovedFalse();

    Optional<Organization> findByRegisteredBy_Email(String email);

    List<Organization> findByIsPublicTrue();

}
