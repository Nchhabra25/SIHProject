package com.sih.userservice.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_achievements")
@Data
public class UserAchievements {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long achievementId;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;
    
    @Column(nullable = false)
    private Integer pointsEarned = 0;
    
    @Column(nullable = false)
    private Integer certificatesEarned = 0;
    
    @Column(nullable = false)
    private Integer level = 1;
    
    @Column(nullable = false)
    private Integer streak = 0;
    
    @Column(nullable = false)
    private String lastActiveDate;
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime lastUpdated;
    
    // Helper methods
    public void addPoints(Integer points) {
        this.pointsEarned += points;
        updateLevel();
    }
    
    public void addCertificate() {
        this.certificatesEarned += 1;
    }
    
    private void updateLevel() {
        this.level = Math.floorDiv(this.pointsEarned, 300) + 1;
    }
    
    public void updateStreak() {
        String today = LocalDateTime.now().toLocalDate().toString();
        if (!today.equals(this.lastActiveDate)) {
            this.streak += 1;
            this.lastActiveDate = today;
        }
    }
}
