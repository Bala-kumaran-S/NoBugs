package com.NoBugs.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.NoBugs.backend.entity.Role;

/**
 * Spring Data JPA repository for the Role entity.
 * Provides standard CRUD operations and allows defining custom query methods.
 */
public interface RoleRepository extends JpaRepository<Role, Long> {

    /**
     * Finds a Role by its name (e.g., "ROLE_ADMIN", "ROLE_STUDENT", "ROLE_ORGANIZATION").
     *
     * @param name The name of the role to find.
     * @return An Optional containing the Role if found, or empty otherwise.
     */
    Optional<Role> findByName(String name);
}
