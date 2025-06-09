package com.NoBugs.backend.repository;

import com.NoBugs.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

/**
 * Spring Data JPA repository for the User entity.
 * Provides standard CRUD operations and allows defining custom query methods.
 */
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Finds a User by their username.
     *
     * @param username The username to search for.
     * @return An Optional containing the User if found, or empty otherwise.
     */
    Optional<User> findByUsername(String username);

    /**
     * Finds a User by their email address.
     *
     * @param email The email address to search for.
     * @return An Optional containing the User if found, or empty otherwise.
     */
    Optional<User> findByEmail(String email);

    /**
     * Checks if a user exists with the given username.
     *
     * @param username The username to check.
     * @return true if a user with this username exists, false otherwise.
     */
    Boolean existsByUsername(String username);

    /**
     * Checks if a user exists with the given email address.
     *
     * @param email The email address to check.
     * @return true if a user with this email exists, false otherwise.
     */
    Boolean existsByEmail(String email);
}
