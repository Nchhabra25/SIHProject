// Local storage utilities for the eco-game platform

export interface UserProgress {
  name: string;
  grade: string;
  ecoPoints: number;
  level: number;
  streak: number;
  lastActiveDate: string;
  completedQuizzes: QuizResult[];
  completedChallenges: string[];
  unlockedBadges: string[];
  enrolledLessons?: string[]; // lesson ids
  lessonProgress?: Record<string, number>; // id -> 0-100
  learningPathProgress?: Record<string, number>; // path id -> 0-100
  completedPaths?: string[]; // completed path ids
  certificates?: number; // total certificates earned
}

export interface QuizResult {
  id: number;
  title: string;
  score: number;
  totalQuestions: number;
  pointsEarned: number;
  completedAt: string;
}

const STORAGE_KEY = 'ecoquest_progress';

const defaultProgress: UserProgress = {
  name: 'Emma Rodriguez',
  grade: 'Grade 10',
  ecoPoints: 2485,
  level: 8,
  streak: 7,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedQuizzes: [
    {
      id: 1,
      title: 'Climate Change Fundamentals',
      score: 85,
      totalQuestions: 10,
      pointsEarned: 42,
      completedAt: '2024-01-15'
    },
    {
      id: 2,
      title: 'Renewable Energy Quiz',
      score: 92,
      totalQuestions: 8,
      pointsEarned: 37,
      completedAt: '2024-01-16'
    }
  ],
  completedChallenges: ['waste-segregation', 'energy-saving'],
  unlockedBadges: ['first-steps', 'quiz-master', 'team-player', 'energy-saver', 'waste-warrior'],
  enrolledLessons: [],
  lessonProgress: {},
  learningPathProgress: {},
  completedPaths: [],
  certificates: 3
};

export const getUserProgress = (): UserProgress => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const progress: UserProgress = JSON.parse(stored);
      // Backfill new fields for older saves
      if (!Array.isArray(progress.enrolledLessons)) progress.enrolledLessons = [];
      if (!progress.lessonProgress || typeof progress.lessonProgress !== 'object') progress.lessonProgress = {};
      if (!progress.learningPathProgress || typeof progress.learningPathProgress !== 'object') progress.learningPathProgress = {};
      if (!Array.isArray(progress.completedPaths)) progress.completedPaths = [];
      if (typeof progress.certificates !== 'number') progress.certificates = 0;
      // Update streak based on last active date
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      
      if (progress.lastActiveDate === yesterday) {
        // Continue streak
        progress.streak = progress.streak || 1;
      } else if (progress.lastActiveDate !== today) {
        // Reset streak if more than 1 day gap
        progress.streak = 1;
      }
      
      progress.lastActiveDate = today;
      saveUserProgress(progress);
      return progress;
    }
  } catch (error) {
    console.warn('Failed to load progress from localStorage:', error);
  }
  
  return defaultProgress;
};

export const saveUserProgress = (progress: UserProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.warn('Failed to save progress to localStorage:', error);
  }
};

export const addQuizResult = (result: QuizResult): UserProgress => {
  const progress = getUserProgress();
  
  // Remove previous result for same quiz if exists
  progress.completedQuizzes = progress.completedQuizzes.filter(q => q.id !== result.id);
  
  // Add new result
  progress.completedQuizzes.push(result);
  progress.ecoPoints += result.pointsEarned;
  
  // Check for level up
  const newLevel = Math.floor(progress.ecoPoints / 300) + 1;
  if (newLevel > progress.level) {
    progress.level = newLevel;
  }
  
  saveUserProgress(progress);
  return progress;
};

export const completeChallenge = (challengeId: string, pointsEarned: number): UserProgress => {
  const progress = getUserProgress();
  
  if (!progress.completedChallenges.includes(challengeId)) {
    progress.completedChallenges.push(challengeId);
    progress.ecoPoints += pointsEarned;
    progress.streak += 1;
    
    // Check for level up
    const newLevel = Math.floor(progress.ecoPoints / 300) + 1;
    if (newLevel > progress.level) {
      progress.level = newLevel;
    }
  }
  
  saveUserProgress(progress);
  return progress;
};

export const unlockBadge = (badgeId: string): UserProgress => {
  const progress = getUserProgress();
  
  if (!progress.unlockedBadges.includes(badgeId)) {
    progress.unlockedBadges.push(badgeId);
  }
  
  saveUserProgress(progress);
  return progress;
};

export function enrollInLesson(lessonId: string): UserProgress {
  const progress = getUserProgress();
  if (!progress.enrolledLessons!.includes(lessonId)) {
    progress.enrolledLessons!.push(lessonId);
    if (progress.lessonProgress![lessonId] == null) progress.lessonProgress![lessonId] = 0;
    saveUserProgress(progress);
  }
  return progress;
}

export function updateLessonProgress(lessonId: string, percent: number): UserProgress {
  const progress = getUserProgress();
  const clamped = Math.max(0, Math.min(100, Math.round(percent)));
  progress.lessonProgress![lessonId] = clamped;
  // Reward on completion
  if (clamped === 100) {
    progress.ecoPoints += 50; // simple reward rule
    const newLevel = Math.floor(progress.ecoPoints / 300) + 1;
    if (newLevel > progress.level) progress.level = newLevel;
  }
  saveUserProgress(progress);
  return progress;
}

export function updateLearningPathProgress(pathId: string, incrementPercent: number): UserProgress {
  const progress = getUserProgress();
  const currentProgress = progress.learningPathProgress![pathId] || 0;
  const newProgress = Math.min(100, currentProgress + incrementPercent);
  progress.learningPathProgress![pathId] = newProgress;
  
  // Check for completion
  if (newProgress >= 100 && !progress.completedPaths!.includes(pathId)) {
    progress.completedPaths!.push(pathId);
    progress.ecoPoints += 50; // +50 points for path completion
    progress.certificates! += 1; // +1 certificate
    const newLevel = Math.floor(progress.ecoPoints / 300) + 1;
    if (newLevel > progress.level) progress.level = newLevel;
  }
  
  saveUserProgress(progress);
  return progress;
}

export function getLearningPathStats(): { totalPaths: number; completedPaths: number; totalCertificates: number; totalPoints: number } {
  const progress = getUserProgress();
  return {
    totalPaths: 3, // Based on lessonCategories in Lessons.tsx
    completedPaths: progress.completedPaths!.length,
    totalCertificates: progress.certificates!,
    totalPoints: progress.ecoPoints
  };
}