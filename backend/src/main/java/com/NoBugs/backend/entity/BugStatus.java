package com.NoBugs.backend.entity;

/**
 * Defines the possible status states for a bug report throughout its lifecycle.
 */
public enum BugStatus {
    SUBMITTED,       // Initially submitted by a hacker
    IN_REVIEW,       // Under review by an admin
    ACCEPTED,        // Confirmed as a legitimate bug
    INVALID,         // Not a legitimate bug or cannot be reproduced
    DUPLICATE,       // Already reported
    INFORMATIONAL,   // Not a bug, but useful information
    NOT_APPLICABLE   // Not applicable to the current scope or platform
}
