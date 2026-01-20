package com.NoBugs.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID; 

@Data 
@NoArgsConstructor
@AllArgsConstructor 
@Entity 
@Table(name = "bug_reports") 
public class BugReport {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long id;

    @Column(nullable = false, unique = true, length = 36, updatable = false)
    private String uniqueId;

    @ManyToOne
    @JoinColumn(name = "reporter_user_id", nullable = false, updatable = false)
    private User reporter;

    @ManyToOne
    @JoinColumn(name = "scope_id", nullable = false, updatable = false)
    private Scope scope;

    @Column(nullable = false, length = 255) 
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING) 
    @Column(nullable = false) 
    private Severity reporterSeverity; 

    @Enumerated(EnumType.STRING) 
    @Column(nullable = true) 
    private Severity adminSeverity; 

    @Column(length = 2048)
    private String affectedEndpoint;

    @Column(nullable = false, columnDefinition = "TEXT") 
    private String stepsToReproduce;

    @Column(length = 2048)
    private String attachmentUrl1; 

    @Column(nullable = false, updatable = false) 
    private LocalDateTime submittedAt; 

    @Enumerated(EnumType.STRING) 
    @Column(nullable = false) 
    private BugStatus status = BugStatus.SUBMITTED; 

    @Column(columnDefinition = "TEXT")  
    private String adminNotes; 

    @PrePersist
protected void onCreate() {
    if (this.uniqueId == null) {
        this.uniqueId = UUID.randomUUID().toString();
    }
    if (this.submittedAt == null) {
        this.submittedAt = LocalDateTime.now();
    }
}

}
