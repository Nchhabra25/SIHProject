package com.sih.userservice.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "learning_paths")
@Data
public class LearningPath {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pathId;
    
    @Column(nullable = false)
    private String title;
    
    @Column(nullable = false)
    private String description;
    
    @Column(nullable = false)
    private Integer totalLessons;
    
    @Column(nullable = false)
    private String icon;
    
    @Column(nullable = false)
    private String color;
    
    @Column(nullable = false)
    private String bgColor;
    
    @Column(nullable = false)
    private Boolean isActive = true;
    
    @Column(nullable = false)
    private Integer sortOrder = 0;
}
