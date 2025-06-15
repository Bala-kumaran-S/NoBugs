package com.NoBugs.backend.repository;

import com.NoBugs.backend.entity.Scope;
import com.NoBugs.backend.entity.Organization;
import com.NoBugs.backend.entity.ScopeType;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

/**
 * Spring Data JPA repository for the Scope entity.
 * Provides standard CRUD operations and allows defining custom query methods.
 */
public interface ScopeRepository extends JpaRepository<Scope, Long> {

    /**
     * Finds all Scopes associated with a specific Organization.
     *
     * @param organizationId The ID of the organization that owns the scopes.
     * @return A list of Scopes belonging to the specified organization.
     */
    List<Scope> findByOrganizationId(Long organizationId);

    /**
     * Finds all Public Scopes.
     *
     * @return A list of all scopes with type PUBLIC.
     */
    List<Scope> findByType(ScopeType type);
     
    List<Scope> findByOrganization(Organization organization);
}
