package com.sih.userservice.service;

import com.sih.userservice.dto.*;
import com.sih.userservice.entity.*;
import com.sih.userservice.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProgressTrackingService {
    
    private final UserRepository userRepository;
    private final LearningPathRepository learningPathRepository;
    private final UserProgressRepository userProgressRepository;
    private final UserAchievementsRepository userAchievementsRepository;
    
    @Transactional
    public void initializeUserProgress(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Initialize user achievements if not exists
        if (!userAchievementsRepository.findByUser(user).isPresent()) {
            UserAchievements achievements = new UserAchievements();
            achievements.setUser(user);
            achievements.setPointsEarned(2485); // Default starting points
            achievements.setCertificatesEarned(3); // Default starting certificates
            achievements.setLevel(8); // Default starting level
            achievements.setStreak(7); // Default starting streak
            achievements.setLastActiveDate(java.time.LocalDate.now().toString());
            userAchievementsRepository.save(achievements);
        }
        
        // Initialize learning paths if not exist
        if (learningPathRepository.count() == 0) {
            initializeLearningPaths();
        }
        
        // Initialize user progress for all learning paths
        List<LearningPath> allPaths = learningPathRepository.findAllActivePaths();
        for (LearningPath path : allPaths) {
            if (!userProgressRepository.findByUserAndLearningPath_PathId(user, path.getPathId()).isPresent()) {
                UserProgress progress = new UserProgress();
                progress.setUser(user);
                progress.setLearningPath(path);
                progress.setLessonsCompleted(0);
                progress.setProgressPercentage(0.0);
                progress.setStatus(UserProgress.Status.NOT_STARTED);
                userProgressRepository.save(progress);
            }
        }
    }
    
    @Transactional
    public UserProgressResponse updateProgress(Long userId, UpdateProgressRequest request) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        LearningPath learningPath = learningPathRepository.findById(request.getPathId())
            .orElseThrow(() -> new RuntimeException("Learning path not found"));
        
        UserProgress progress = userProgressRepository.findByUserAndLearningPath_PathId(user, request.getPathId())
            .orElseThrow(() -> new RuntimeException("User progress not found"));
        
        // Calculate new progress
        int currentLessons = progress.getLessonsCompleted();
        int totalLessons = learningPath.getTotalLessons();
        int incrementLessons = Math.max(1, (int) Math.ceil((request.getIncrementPercent() / 100.0) * totalLessons));
        int newLessonsCompleted = Math.min(totalLessons, currentLessons + incrementLessons);
        
        // Update progress
        progress.updateProgress(newLessonsCompleted, totalLessons);
        UserProgress savedProgress = userProgressRepository.save(progress);
        
        // Check if path is completed and award points/certificate
        if (savedProgress.getStatus() == UserProgress.Status.COMPLETED) {
            awardCompletionRewards(user);
        }
        
        return UserProgressResponse.fromEntity(savedProgress);
    }
    
    @Transactional
    private void awardCompletionRewards(User user) {
        UserAchievements achievements = userAchievementsRepository.findByUser(user)
            .orElseThrow(() -> new RuntimeException("User achievements not found"));
        
        // Add 50 points and 1 certificate
        achievements.addPoints(50);
        achievements.addCertificate();
        achievements.updateStreak();
        
        userAchievementsRepository.save(achievements);
    }
    
    public List<LearningPathResponse> getAllLearningPaths() {
        return learningPathRepository.findAllActivePaths().stream()
            .map(this::mapToLearningPathResponse)
            .collect(Collectors.toList());
    }
    
    public List<UserProgressResponse> getUserProgress(Long userId) {
        return userProgressRepository.findByUserId(userId).stream()
            .map(UserProgressResponse::fromEntity)
            .collect(Collectors.toList());
    }
    
    public UserAchievementsResponse getUserAchievements(Long userId) {
        UserAchievements achievements = userAchievementsRepository.findByUser_Id(userId)
            .orElseThrow(() -> new RuntimeException("User achievements not found"));
        return UserAchievementsResponse.fromEntity(achievements);
    }
    
    public ProgressStatsResponse getProgressStats(Long userId) {
        Long completedPaths = userProgressRepository.countCompletedPathsByUserId(userId);
        Long totalPaths = userProgressRepository.countTotalPathsByUserId(userId);
        
        UserAchievements achievements = userAchievementsRepository.findByUser_Id(userId)
            .orElseThrow(() -> new RuntimeException("User achievements not found"));
        
        return new ProgressStatsResponse(
            totalPaths.intValue(),
            completedPaths.intValue(),
            achievements.getCertificatesEarned(),
            achievements.getPointsEarned(),
            achievements.getLevel(),
            achievements.getStreak()
        );
    }
    
    private LearningPathResponse mapToLearningPathResponse(LearningPath path) {
        LearningPathResponse response = new LearningPathResponse();
        response.setPathId(path.getPathId());
        response.setTitle(path.getTitle());
        response.setDescription(path.getDescription());
        response.setTotalLessons(path.getTotalLessons());
        response.setIcon(path.getIcon());
        response.setColor(path.getColor());
        response.setBgColor(path.getBgColor());
        response.setSortOrder(path.getSortOrder());
        response.setIsActive(path.getIsActive());
        return response;
    }
    
    private void initializeLearningPaths() {
        // Climate Change Basics
        LearningPath path1 = new LearningPath();
        path1.setTitle("Climate Change Basics");
        path1.setDescription("Understanding our changing planet");
        path1.setTotalLessons(8);
        path1.setIcon("🌡️");
        path1.setColor("text-primary");
        path1.setBgColor("bg-primary/10");
        path1.setSortOrder(1);
        learningPathRepository.save(path1);
        
        // Renewable Energy
        LearningPath path2 = new LearningPath();
        path2.setTitle("Renewable Energy");
        path2.setDescription("Solar, wind, and clean power");
        path2.setTotalLessons(6);
        path2.setIcon("⚡");
        path2.setColor("text-accent");
        path2.setBgColor("bg-accent/10");
        path2.setSortOrder(2);
        learningPathRepository.save(path2);
        
        // Ocean Conservation
        LearningPath path3 = new LearningPath();
        path3.setTitle("Ocean Conservation");
        path3.setDescription("Protecting marine ecosystems");
        path3.setTotalLessons(5);
        path3.setIcon("🌊");
        path3.setColor("text-success");
        path3.setBgColor("bg-success/10");
        path3.setSortOrder(3);
        learningPathRepository.save(path3);
    }
}
