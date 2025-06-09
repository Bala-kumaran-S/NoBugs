package com.NoBugs.backend.repository;

import com.NoBugs.backend.entity.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

/**
 * Spring Data JPA repository for the Organization entity.
 * Provides standard CRUD operations and allows defining custom query methods.
 */
public interface OrganizationRepository extends JpaRepository<Organization, Long> {

    /**
     * Finds an Organization by its name.
     *
     * @param name The name of the organization to find.
     * @return An Optional containing the Organization if found, or empty otherwise.
     */
    Optional<Organization> findByName(String name);

    /**
     * Finds all Organizations that require approval (i.e., isApproved = false).
     *
     * @return A list of unapproved Organizations.
     */
    List<Organization> findByIsApprovedFalse();

    /**
     * Finds all Organizations registered by a specific user.
     *
     * @param registeredById The ID of the user who registered the organization.
     * @return A list of Organizations registered by the specified user.
     */
    List<Organization> findByRegisteredById(Long registeredById);
}
