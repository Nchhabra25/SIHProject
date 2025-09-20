package com.sih.userservice.dto;

import lombok.Data;

@Data
public class ProgressStatsResponse {
    private Integer totalPaths;
    private Integer completedPaths;
    private Integer totalCertificates;
    private Integer totalPoints;
    private Integer level;
    private Integer streak;
    private Double completionPercentage;
    
    public ProgressStatsResponse(Integer totalPaths, Integer completedPaths, 
                                Integer totalCertificates, Integer totalPoints,
                                Integer level, Integer streak) {
        this.totalPaths = totalPaths;
        this.completedPaths = completedPaths;
        this.totalCertificates = totalCertificates;
        this.totalPoints = totalPoints;
        this.level = level;
        this.streak = streak;
        this.completionPercentage = totalPaths > 0 ? (completedPaths.doubleValue() / totalPaths.doubleValue()) * 100.0 : 0.0;
    }
}
