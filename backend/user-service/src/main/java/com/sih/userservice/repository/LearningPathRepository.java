package com.sih.userservice.repository;

import com.sih.userservice.entity.LearningPath;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LearningPathRepository extends JpaRepository<LearningPath, Long> {
    
    List<LearningPath> findByIsActiveTrueOrderBySortOrder();
    
    @Query("SELECT lp FROM LearningPath lp WHERE lp.isActive = true ORDER BY lp.sortOrder")
    List<LearningPath> findAllActivePaths();
}
