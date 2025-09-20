package com.sih.userservice.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_progress", 
       uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "path_id"}))
@Data
public class UserProgress {
    
    public enum Status {
        NOT_STARTED, IN_PROGRESS, COMPLETED
    }
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long progressId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "path_id", nullable = false)
    private LearningPath learningPath;
    
    @Column(nullable = false)
    private Integer lessonsCompleted = 0;
    
    @Column(nullable = false)
    private Double progressPercentage = 0.0;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.NOT_STARTED;
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;
    
    // Helper methods
    public void updateProgress(Integer lessonsCompleted, Integer totalLessons) {
        this.lessonsCompleted = lessonsCompleted;
        this.progressPercentage = totalLessons > 0 ? (lessonsCompleted.doubleValue() / totalLessons.doubleValue()) * 100.0 : 0.0;
        
        if (this.progressPercentage >= 100.0) {
            this.status = Status.COMPLETED;
        } else if (this.lessonsCompleted > 0) {
            this.status = Status.IN_PROGRESS;
        } else {
            this.status = Status.NOT_STARTED;
        }
    }
}
