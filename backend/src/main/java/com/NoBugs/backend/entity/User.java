// File: backend/src/main/java/com/yourcompany/yourapp/entity/User.java
package com.NoBugs.backend.entity;

import jakarta.persistence.*;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // Getters & Setters
}
