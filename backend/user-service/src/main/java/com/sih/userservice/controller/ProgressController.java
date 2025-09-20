package com.sih.userservice.controller;

import com.sih.userservice.dto.*;
import com.sih.userservice.service.ProgressTrackingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
@RequiredArgsConstructor
public class ProgressController {
    
    private final ProgressTrackingService progressTrackingService;
    
    @PostMapping("/initialize/{userId}")
    public ResponseEntity<String> initializeUserProgress(@PathVariable Long userId) {
        try {
            progressTrackingService.initializeUserProgress(userId);
            return ResponseEntity.ok("User progress initialized successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to initialize user progress: " + e.getMessage());
        }
    }
    
    @PutMapping("/update/{userId}")
    public ResponseEntity<UserProgressResponse> updateProgress(
            @PathVariable Long userId,
            @RequestBody UpdateProgressRequest request) {
        try {
            UserProgressResponse response = progressTrackingService.updateProgress(userId, request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/paths")
    public ResponseEntity<List<LearningPathResponse>> getAllLearningPaths() {
        try {
            List<LearningPathResponse> paths = progressTrackingService.getAllLearningPaths();
            return ResponseEntity.ok(paths);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserProgressResponse>> getUserProgress(@PathVariable Long userId) {
        try {
            List<UserProgressResponse> progress = progressTrackingService.getUserProgress(userId);
            return ResponseEntity.ok(progress);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/achievements/{userId}")
    public ResponseEntity<UserAchievementsResponse> getUserAchievements(@PathVariable Long userId) {
        try {
            UserAchievementsResponse achievements = progressTrackingService.getUserAchievements(userId);
            return ResponseEntity.ok(achievements);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/stats/{userId}")
    public ResponseEntity<ProgressStatsResponse> getProgressStats(@PathVariable Long userId) {
        try {
            ProgressStatsResponse stats = progressTrackingService.getProgressStats(userId);
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
