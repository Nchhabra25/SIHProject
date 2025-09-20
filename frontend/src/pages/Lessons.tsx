import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Clock, Star, Play, CheckCircle, Lock } from "lucide-react";
import { EcoButton } from "@/components/ui/eco-button";
import { EcoCard, EcoCardContent, EcoCardDescription, EcoCardHeader, EcoCardTitle } from "@/components/ui/eco-card";
import { Badge } from "@/components/ui/badge";
import { ProgressRing } from "@/components/ui/progress-ring";
import { useAuth } from "@/lib/auth";
import { progressApi, type LearningPathResponse, type UserProgressResponse, type ProgressStatsResponse, decodeJwtPayload } from "@/lib/progressApi";

// Mock data structure for learning paths
interface MockLearningPath {
  id: number;
  title: string;
  description: string;
  totalLessons: number;
  completedLessons: number;
  icon: string;
  color: string;
  bgColor: string;
  isCompleted: boolean;
}

// Mock user progress state
interface MockUserProgress {
  totalPoints: number;
  totalCertificates: number;
  completedPaths: number;
  totalPaths: number;
}

const featuredLessons = [
  {
    id: 1,
    title: "Global Warming: Causes and Effects",
    duration: "15 min",
    difficulty: "Beginner",
    rating: 4.8,
    completed: true,
    thumbnail: "🌍",
    category: "Climate Change"
  },
  {
    id: 2,
    title: "Solar Power Revolution",
    duration: "12 min",
    difficulty: "Intermediate",
    rating: 4.9,
    completed: true,
    thumbnail: "☀️",
    category: "Renewable Energy"
  },
  {
    id: 3,
    title: "Plastic Pollution Crisis",
    duration: "18 min",
    difficulty: "Beginner",
    rating: 4.7,
    completed: false,
    thumbnail: "🌊",
    category: "Ocean Conservation"
  },
  {
    id: 4,
    title: "Wind Energy Future",
    duration: "20 min",
    difficulty: "Advanced",
    rating: 4.6,
    completed: false,
    thumbnail: "💨",
    category: "Renewable Energy"
  }
];

export default function Lessons() {
  const { token, user } = useAuth();
  const [learningPaths, setLearningPaths] = useState<LearningPathResponse[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgressResponse[]>([]);
  const [stats, setStats] = useState<ProgressStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);
  
  // Mock state for interactive functionality
  const [mockLearningPaths, setMockLearningPaths] = useState<MockLearningPath[]>([
    {
      id: 1,
      title: "Climate Change Basics",
      description: "Understanding our changing planet",
      totalLessons: 8,
      completedLessons: 0,
      icon: "🌡️",
      color: "text-primary",
      bgColor: "bg-primary/10",
      isCompleted: false
    },
    {
      id: 2,
      title: "Renewable Energy",
      description: "Solar, wind, and clean power",
      totalLessons: 6,
      completedLessons: 0,
      icon: "⚡",
      color: "text-accent",
      bgColor: "bg-accent/10",
      isCompleted: false
    },
    {
      id: 3,
      title: "Ocean Conservation",
      description: "Protecting marine ecosystems",
      totalLessons: 5,
      completedLessons: 0,
      icon: "🌊",
      color: "text-success",
      bgColor: "bg-success/10",
      isCompleted: false
    }
  ]);
  
  const [mockUserProgress, setMockUserProgress] = useState<MockUserProgress>({
    totalPoints: 2485,
    totalCertificates: 3,
    completedPaths: 0,
    totalPaths: 3
  });

  // Extract user ID from JWT token
  useEffect(() => {
    if (token) {
      const payload = decodeJwtPayload<any>(token);
      if (payload && payload.userId) {
        setUserId(payload.userId);
      }
    }
  }, [token]);

  // Load initial data
  useEffect(() => {
    if (userId && token) {
      loadProgressData();
    } else {
      // Show static data when not authenticated
      setLoading(false);
    }
  }, [userId, token]);

  const loadProgressData = async () => {
    if (!userId || !token) return;
    
    try {
      setLoading(true);
      
      // Initialize user progress if needed
      try {
        await progressApi.initializeUserProgress(userId, token);
      } catch (error) {
        // User might already be initialized, continue
        console.log("User already initialized or error:", error);
      }

      // Load all data in parallel
      const [paths, progress, achievements] = await Promise.all([
        progressApi.getAllLearningPaths(token),
        progressApi.getUserProgress(userId, token),
        progressApi.getProgressStats(userId, token)
      ]);

      setLearningPaths(paths);
      setUserProgress(progress);
      setStats(achievements);
    } catch (error) {
      console.error("Failed to load progress data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePathButtonClick = async (pathId: number) => {
    // Use mock data for interactive functionality
    setMockLearningPaths(prevPaths => {
      return prevPaths.map(path => {
        if (path.id === pathId) {
          const newCompletedLessons = Math.min(
            path.completedLessons + Math.floor(Math.random() * 3) + 1, // Random increment 1-3 lessons
            path.totalLessons
          );
          const isCompleted = newCompletedLessons >= path.totalLessons;
          
          return {
            ...path,
            completedLessons: newCompletedLessons,
            isCompleted
          };
        }
        return path;
      });
    });
    
    // Update user progress if a path was completed
    setMockUserProgress(prevProgress => {
      const updatedPaths = mockLearningPaths.map(path => {
        if (path.id === pathId) {
          const newCompletedLessons = Math.min(
            path.completedLessons + Math.floor(Math.random() * 3) + 1,
            path.totalLessons
          );
          return newCompletedLessons >= path.totalLessons;
        }
        return path.isCompleted;
      });
      
      const newCompletedPaths = updatedPaths.filter(Boolean).length;
      const wasJustCompleted = newCompletedPaths > prevProgress.completedPaths;
      
      return {
        ...prevProgress,
        completedPaths: newCompletedPaths,
        totalPoints: wasJustCompleted ? prevProgress.totalPoints + 50 : prevProgress.totalPoints,
        totalCertificates: wasJustCompleted ? prevProgress.totalCertificates + 1 : prevProgress.totalCertificates
      };
    });
    
    // If authenticated, also update backend
    if (userId && token) {
      try {
        const increment = Math.floor(Math.random() * 21) + 15;
        await progressApi.updateProgress(userId, {
          pathId,
          incrementPercent: increment
        }, token);
        await loadProgressData();
      } catch (error) {
        console.error("Failed to update backend progress:", error);
      }
    }
  };

  const handleFeaturedLessonClick = async (lessonId: number) => {
    if (!userId || !token) return;
    
    try {
      // Use lesson ID as path ID for featured lessons
      await progressApi.updateProgress(userId, {
        pathId: lessonId,
        incrementPercent: 25
      }, token);
      
      // Reload data to get updated progress
      await loadProgressData();
    } catch (error) {
      console.error("Failed to update progress:", error);
    }
  };

  // Use mock data for interactive display
  const dynamicCategories = mockLearningPaths.map(path => ({
    id: path.id,
    title: path.title,
    description: path.description,
    lessons: path.totalLessons,
    completed: path.completedLessons,
    color: path.color,
    bgColor: path.bgColor,
    icon: path.icon,
    isCompleted: path.isCompleted
  }));

  // Calculate completion percentage from mock data
  const completionPercentage = Math.round((mockUserProgress.completedPaths / mockUserProgress.totalPaths) * 100);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 animate-slide-up">
            🎓 Learning Hub
          </h1>
          <p className="text-muted-foreground text-lg animate-slide-up" style={{animationDelay: '0.1s'}}>
            Master environmental science through interactive lessons and earn eco-points!
          </p>
        </div>

        {/* Progress Overview */}
        <EcoCard variant="gradient" className="mb-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
          <EcoCardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Your Progress</h2>
                <p className="text-white/80 mb-4">{mockUserProgress.completedPaths} out of {mockUserProgress.totalPaths} learning paths completed</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-300" />
                    <span className="text-white">+{mockUserProgress.totalPoints} points earned</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-white/80" />
                    <span className="text-white">{mockUserProgress.totalCertificates} certificates</span>
                  </div>
                </div>
              </div>
              <ProgressRing progress={completionPercentage} size={120}>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{completionPercentage}%</div>
                  <div className="text-xs text-white/80">Complete</div>
                </div>
              </ProgressRing>
            </div>
          </EcoCardContent>
        </EcoCard>

        {/* Lesson Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Learning Paths</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {dynamicCategories.map((category, index) => (
                <EcoCard 
                  key={category.id}
                  hover="glow"
                  className="cursor-pointer animate-bounce-in"
                  style={{animationDelay: `${0.3 + index * 0.1}s`}}
                >
                  <EcoCardHeader>
                    <div className={`text-4xl mb-3`}>{category.icon}</div>
                    <EcoCardTitle className="text-xl">{category.title}</EcoCardTitle>
                    <EcoCardDescription>{category.description}</EcoCardDescription>
                  </EcoCardHeader>
                  <EcoCardContent>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-muted-foreground">
                        {category.completed}/{category.lessons} lessons
                      </span>
                      <Badge variant={category.isCompleted ? "default" : "secondary"}>
                        {Math.round((category.completed / category.lessons) * 100)}%
                      </Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 mb-4">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${category.bgColor.replace('/10', '')}`}
                        style={{width: `${(category.completed / category.lessons) * 100}%`}}
                      />
                    </div>
                    <EcoButton 
                      variant={category.isCompleted ? "default" : "outline"}
                      className="w-full"
                      onClick={() => handlePathButtonClick(category.id)}
                    >
                      {category.isCompleted ? 'Completed!' : category.completed === 0 ? 'Start Learning' : 'Continue'}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </EcoButton>
                  </EcoCardContent>
                </EcoCard>
            ))}
          </div>
        </div>

        {/* Featured Lessons */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Featured Lessons</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredLessons.map((lesson, index) => (
              <EcoCard 
                key={lesson.id}
                hover="lift"
                className="cursor-pointer animate-slide-up"
                style={{animationDelay: `${0.4 + index * 0.1}s`}}
              >
                <EcoCardHeader className="pb-4">
                  <div className="relative">
                    <div className="text-6xl mb-4 text-center">{lesson.thumbnail}</div>
                    {lesson.completed ? (
                      <CheckCircle className="absolute top-0 right-0 w-6 h-6 text-success" />
                    ) : (
                      <Lock className="absolute top-0 right-0 w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                  <Badge variant="secondary" className="mb-2 text-xs">
                    {lesson.category}
                  </Badge>
                  <EcoCardTitle className="text-lg leading-tight">
                    {lesson.title}
                  </EcoCardTitle>
                </EcoCardHeader>
                <EcoCardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{lesson.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{lesson.rating}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="mb-4">
                    {lesson.difficulty}
                  </Badge>
                  <EcoButton 
                    variant={lesson.completed ? "outline" : "default"} 
                    className="w-full"
                    size="sm"
                    onClick={() => handleFeaturedLessonClick(lesson.id)}
                  >
                    {lesson.completed ? (
                      <>Review Lesson</>
                    ) : (
                      <>
                        <Play className="mr-2 w-4 h-4" />
                        Start Lesson
                      </>
                    )}
                  </EcoButton>
                </EcoCardContent>
              </EcoCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}