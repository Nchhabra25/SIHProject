import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Zap, Users, Award, Trophy, Target, Leaf, Calendar, Clock, TrendingUp, Coins, Gift, Star, ShoppingBag } from "lucide-react";
import { EcoButton } from "@/components/ui/eco-button";
import { EcoCard, EcoCardContent, EcoCardDescription, EcoCardHeader, EcoCardTitle } from "@/components/ui/eco-card";
import { ProgressRing } from "@/components/ui/progress-ring";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserProgress } from "@/utils/storage";
import { enrollInLesson, updateLessonProgress } from "@/utils/storage";
import { useAuth } from "@/lib/auth";
import { decodeJwtPayload } from "@/lib/api";
import { fetchDynamicLearnings, getDefaultTopics, type DynamicLesson } from "@/lib/learnings";
import { useNavigate } from "react-router-dom";

const quickActions = [
  {
    icon: BookOpen,
    title: "Start Lesson",
    description: "Continue Climate Change Basics",
    color: "text-primary",
    href: "/lessons"
  },
  {
    icon: Zap,
    title: "Take Quiz",
    description: "Test your eco-knowledge",
    color: "text-accent",
    href: "/quiz"
  },
  {
    icon: Users,
    title: "Join Challenge",
    description: "Complete real-world eco-actions",
    color: "text-success",
    href: "/challenges"
  }
];

// dynamic lessons state (replaces static recentLessons while keeping same UI)
type LessonRow = { id: string | number; title: string; progress: number; duration: string; completed: boolean };

// Placeholder initial list while fetching dynamic content
const recentLessonsFallback: LessonRow[] = [
  { id: "climate-change", title: "Climate Change Basics", progress: 0, duration: "10 min", completed: false },
];

const upcomingChallenges = [
  { id: 1, title: "Plant 10 Trees This Week", points: 500, deadline: "3 days left", difficulty: "Medium" },
  { id: 2, title: "Zero Waste Challenge", points: 300, deadline: "1 week left", difficulty: "Easy" },
  { id: 3, title: "Energy Conservation Month", points: 1000, deadline: "2 weeks left", difficulty: "Hard" },
];

const leaderboard = [
  { name: "Sarah Chen", school: "Green Valley High", points: 3450, avatar: "SC", rank: 1 },
  { name: "Emma Rodriguez", school: "Riverside Academy", points: 2485, avatar: "ER", rank: 2 },
  { name: "Alex Rivera", school: "Eco Academy", points: 2380, avatar: "AR", rank: 3 },
  { name: "Maya Patel", school: "Forest Hills School", points: 2320, avatar: "MP", rank: 4 },
  { name: "Jordan Kim", school: "Tech Valley School", points: 2180, avatar: "JK", rank: 5 },
];

const rewards = [
  {
    id: 1,
    title: "Eco-Coins",
    description: "Digital currency for platform purchases",
    icon: Coins,
    value: "2,450",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
    available: true
  },
  {
    id: 2,
    title: "Gift Coupons",
    description: "Discounts at partner eco-stores",
    icon: Gift,
    value: "3 available",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    available: true
  },
  {
    id: 3,
    title: "Certificates",
    description: "Digital certificates for achievements",
    icon: Award,
    value: "5 earned",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    available: true
  },
  {
    id: 4,
    title: "Total Rewards Earned",
    description: "Rewards earned across all categories",
    icon: Star,
    value: "₹2500",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    available: true
  },
  {
    id: 5,
    title: "Eco Store Credits",
    description: "Shop for sustainable products",
    icon: ShoppingBag,
    value: "₹500",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
    available: true
  },
  {
    id: 6,
    title: "Mentorship Session",
    description: "1-on-1 with environmental expert",
    icon: Users,
    value: "1 session",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/20",
    available: false
  }
];

const badges = [
  { name: "First Steps", icon: "🌱", unlocked: true, description: "Complete your first lesson" },
  { name: "Quiz Master", icon: "🧠", unlocked: true, description: "Score 100% on any quiz" },
  { name: "Team Player", icon: "👥", unlocked: true, description: "Join your first challenge" },
  { name: "Eco Warrior", icon: "⚔️", unlocked: false, description: "Complete 10 challenges" },
  { name: "Planet Saver", icon: "🌍", unlocked: false, description: "Earn 5000 eco-points" },
  { name: "Carbon Zero", icon: "♻️", unlocked: false, description: "Complete all waste management lessons" },
];

export default function StudentDashboard() {
  const [progress, setProgress] = useState(getUserProgress());
  const { token, user, signout } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState<string>("");
  const [initials, setInitials] = useState<string>("ER");
  const [recentLessons, setRecentLessons] = useState<LessonRow[]>(recentLessonsFallback);
  const [loadingLessons, setLoadingLessons] = useState<boolean>(false);

  useEffect(() => {
    setProgress(getUserProgress());
  }, []);

  // Load dynamic learnings from online sources (no UI change, data only)
  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoadingLessons(true);
      try {
        const topics = getDefaultTopics();
        const lessons: DynamicLesson[] = await fetchDynamicLearnings(topics);
        if (!mounted) return;
        const rows: LessonRow[] = lessons.map((l) => {
          const id = l.id;
          const percent = progress.lessonProgress?.[id] ?? 0;
          const completed = percent >= 100;
          return { id, title: l.title, progress: percent, duration: l.duration, completed };
        });
        setRecentLessons(rows);
      } catch {
        // Keep fallback
      } finally {
        if (mounted) setLoadingLessons(false);
      }
    }
    load();
    return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep lesson rows in sync when progress changes (e.g., after actions)
  useEffect(() => {
    setRecentLessons((rows) => rows.map((r) => {
      const pct = progress.lessonProgress?.[String(r.id)] ?? r.progress;
      return { ...r, progress: pct, completed: pct >= 100 };
    }));
  }, [progress]);

  function handleEnroll(lessonId: string | number) {
    const updated = enrollInLesson(String(lessonId));
    setProgress(updated);
  }

  function handleContinue(lessonId: string | number) {
    // Simulate progress increment to demonstrate dynamic progress bar without UI changes
    const current = progress.lessonProgress?.[String(lessonId)] ?? 0;
    const next = Math.min(100, current + 25);
    const updated = updateLessonProgress(String(lessonId), next);
    setProgress(updated);
  }

  useEffect(() => {
    if (token) {
      const payload = decodeJwtPayload<any>(token);
      const nameFromJwt = payload?.firstName && payload?.lastName ? `${payload.firstName} ${payload.lastName}` : null;
      if (nameFromJwt) {
        setDisplayName(nameFromJwt);
        const fi = payload.firstName?.charAt(0)?.toUpperCase() || "?";
        const li = payload.lastName?.charAt(0)?.toUpperCase() || "?";
        setInitials(`${fi}${li}`);
        return;
      }
    }
    setDisplayName(progress.name);
    const parts = progress.name.split(' ');
    const fi = parts[0]?.charAt(0)?.toUpperCase() || "E";
    const li = parts[1]?.charAt(0)?.toUpperCase() || "R";
    setInitials(`${fi}${li}`);
  }, [token, progress.name]);

  const progressToNextLevel = ((progress.ecoPoints % 300) / 300) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-success rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-success-foreground" />
            </div>
            <span className="text-xl font-normal text-foreground">Planet<span className="text-xl font-bold text-foreground">Pulse</span>Play</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="flex items-center gap-2">
              <Link to="/profile">
                <Avatar className="hover:ring-2 hover:ring-primary transition-all cursor-pointer">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </Link>
              <EcoButton
                size="sm"
                variant="outline"
                onClick={() => { signout(); navigate('/auth'); }}
              >
                Logout
              </EcoButton>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 animate-slide-up">
            Welcome back, <span className="text-primary">{(displayName || progress.name).split(' ')[0]}!</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg animate-slide-up" style={{animationDelay: '0.1s'}}>
            Ready to continue your eco-learning journey? 🌱
          </p>
          
          {/* Streak indicator */}
          <div className="mt-4 flex items-center space-x-2 animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center space-x-2 bg-gradient-to-r from-accent/10 to-primary/10 px-4 py-2 rounded-full">
              <span className="text-2xl">🔥</span>
              <span className="font-semibold text-primary">
                {progress.streak} day streak!
              </span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Profile Stats */}
                <EcoCard variant="gradient" className="animate-slide-up" style={{animationDelay: '0.2s'}}>
                  <EcoCardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <Avatar className="w-20 h-20 border-4 border-white/20">
                          <AvatarImage src="/placeholder-avatar.jpg" />
                          <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h2 className="text-xl md:text-2xl font-bold text-white">{displayName || progress.name}</h2>
                          <p className="text-white/80">Level {progress.level} • Eco Student</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center space-x-1">
                              <Trophy className="w-4 h-4 text-yellow-300" />
                              <span className="text-white/90 text-sm">{progress.ecoPoints.toLocaleString()} eco-points</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Award className="w-4 h-4 text-white/80" />
                              <span className="text-white/90 text-sm">{progress.unlockedBadges.length} badges</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <ProgressRing progress={Math.round(progressToNextLevel)} size={100} className="hidden md:block">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">{Math.round(progressToNextLevel)}%</div>
                          <div className="text-xs text-white/80">to Level {progress.level + 1}</div>
                        </div>
                      </ProgressRing>
                    </div>
                  </EcoCardContent>
                </EcoCard>

                {/* Quick Actions */}
                <div className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-bold">Quick Actions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {quickActions.map((action, index) => (
                      <Link key={action.title} to={action.href}>
                        <EcoCard 
                          hover="glow"
                          className="cursor-pointer animate-bounce-in"
                          style={{animationDelay: `${0.3 + index * 0.1}s`}}
                        >
                          <EcoCardHeader className="pb-3">
                            <action.icon className={`w-6 md:w-8 h-6 md:h-8 ${action.color} mb-2`} />
                            <EcoCardTitle className="text-base md:text-lg">{action.title}</EcoCardTitle>
                          </EcoCardHeader>
                          <EcoCardContent className="pt-0">
                            <EcoCardDescription className="text-sm">{action.description}</EcoCardDescription>
                          </EcoCardContent>
                        </EcoCard>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Leaderboard */}
                <EcoCard className="animate-slide-up" style={{animationDelay: '0.4s'}}>
                  <EcoCardHeader>
                    <div className="flex items-center justify-between">
                      <EcoCardTitle className="flex items-center space-x-2">
                        <Trophy className="w-5 h-5 text-yellow-500" />
                        <span>Class Leaderboard</span>
                      </EcoCardTitle>
                      <Badge variant="secondary">Top 5</Badge>
                    </div>
                  </EcoCardHeader>
                  <EcoCardContent className="space-y-4">
                    {leaderboard.map((user, index) => (
                      <div key={user.name} className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          index === 0 ? 'bg-yellow-500 text-yellow-900' :
                          index === 1 ? 'bg-gray-400 text-gray-900' :
                          'bg-amber-600 text-amber-100'
                        }`}>
                          {index + 1}
                        </div>
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="text-xs">{user.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{user.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{user.school}</p>
                        </div>
                        <div className="text-sm font-medium text-primary">
                          {user.points.toLocaleString()}
                        </div>
                      </div>
                    ))}
                    <EcoButton variant="outline" className="w-full" size="sm">
                      View Full Leaderboard
                    </EcoButton>
                  </EcoCardContent>
                </EcoCard>

              </div>
            </div>

            {/* Rewards Section - Full Width */}
            <div className="mt-8">
              <EcoCard className="animate-slide-up" style={{animationDelay: '0.6s'}}>
                <EcoCardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <EcoCardTitle className="flex items-center space-x-2">
                        <Gift className="w-6 h-6 text-primary" />
                        <span>Your Rewards & Benefits</span>
                      </EcoCardTitle>
                      <EcoCardDescription>
                        Manage your earned rewards and discover new opportunities
                      </EcoCardDescription>
                    </div>
                   
                  </div>
                </EcoCardHeader>
                <EcoCardContent>
                  {/* Quick Stats Row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {rewards.slice(0, 4).map((reward, index) => (
                      <div
                        key={`quick-${reward.id}`}
                        className={`p-4 rounded-xl border-2 transition-all hover:scale-105 cursor-pointer ${
                          reward.available 
                            ? `${reward.borderColor} ${reward.bgColor} hover:shadow-lg` 
                            : 'border-muted bg-muted/50 opacity-60'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-lg ${reward.bgColor} flex items-center justify-center`}>
                            <reward.icon className={`w-4 h-4 ${reward.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm">{reward.title}</h4>
                            <p className={`text-xs font-bold ${reward.color}`}>{reward.value}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* All Rewards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {rewards.map((reward, index) => (
                      <div
                        key={reward.id}
                        className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 cursor-pointer group ${
                          reward.available 
                            ? `${reward.borderColor} ${reward.bgColor} hover:shadow-xl hover:shadow-primary/10` 
                            : 'border-muted bg-muted/30 opacity-60'
                        }`}
                      >
                        <div className="flex flex-col items-center text-center space-y-3">
                          <div className={`w-16 h-16 rounded-2xl ${reward.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <reward.icon className={`w-8 h-8 ${reward.color}`} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg">{reward.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{reward.description}</p>
                          </div>
                          <div className="text-center">
                            <p className={`text-xl font-bold ${reward.color}`}>{reward.value}</p>
                            {!reward.available && (
                              <p className="text-xs text-muted-foreground mt-1">Coming Soon</p>
                            )}
                          </div>
                          {reward.available && (
                            <EcoButton 
                              size="sm" 
                              variant="outline" 
                              className="w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                              {reward.title === "Eco-Coins" ? "Spend" : 
                               reward.title === "Gift Coupons" ? "Redeem" :
                               reward.title === "Certificates" ? "Download" :
                               reward.title === "Premium Access" ? "Extend" :
                               reward.title === "Eco Store Credits" ? "Shop" : "Book"}
                            </EcoButton>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                 
                </EcoCardContent>
              </EcoCard>
            </div>
          </TabsContent>

          {/* Lessons Tab */}
          <TabsContent value="lessons" className="space-y-6">
            <EcoCard>
              <EcoCardHeader>
                <EcoCardTitle>Your Learning Progress</EcoCardTitle>
                <EcoCardDescription>Continue your eco-education journey</EcoCardDescription>
              </EcoCardHeader>
              <EcoCardContent>
                <div className="space-y-4">
                  {recentLessons.map((lesson) => (
                    <div key={lesson.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{lesson.title}</h3>
                          <p className="text-sm text-muted-foreground">{lesson.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{lesson.progress}% Complete</p>
                          <div className="w-24 bg-muted rounded-full h-2 mt-1">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{width: `${lesson.progress}%`}}
                            />
                          </div>
                        </div>
                        {progress.enrolledLessons?.includes(String(lesson.id)) ? (
                          <EcoButton size="sm" variant={lesson.completed ? "outline" : "default"} onClick={() => handleContinue(lesson.id)}>
                            {lesson.completed ? "Review" : "Continue"}
                          </EcoButton>
                        ) : (
                          <EcoButton size="sm" onClick={() => handleEnroll(lesson.id)}>
                            Enroll
                          </EcoButton>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </EcoCardContent>
            </EcoCard>
          </TabsContent>

          {/* Challenges Tab */}
          <TabsContent value="challenges" className="space-y-6">
            <EcoCard>
              <EcoCardHeader>
                <EcoCardTitle>Available Challenges</EcoCardTitle>
                <EcoCardDescription>Join challenges to earn points and make a difference</EcoCardDescription>
              </EcoCardHeader>
              <EcoCardContent>
                <div className="space-y-4">
                  {upcomingChallenges.map((challenge) => (
                    <div key={challenge.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium">{challenge.title}</h3>
                        <Badge variant={challenge.difficulty === 'Easy' ? 'default' : challenge.difficulty === 'Medium' ? 'secondary' : 'destructive'}>
                          {challenge.difficulty}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Trophy className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm font-medium">{challenge.points} points</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{challenge.deadline}</span>
                          </div>
                        </div>
                        <EcoButton size="sm">Join Challenge</EcoButton>
                      </div>
                    </div>
                  ))}
                </div>
              </EcoCardContent>
            </EcoCard>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <EcoCard>
                <EcoCardHeader>
                  <EcoCardTitle>Learning Statistics</EcoCardTitle>
                </EcoCardHeader>
                <EcoCardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Lessons Completed</span>
                    <span className="font-bold">12/20</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Quizzes Passed</span>
                    <span className="font-bold">8/10</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Challenges Joined</span>
                    <span className="font-bold">5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Total Study Time</span>
                    <span className="font-bold">24h 30m</span>
                  </div>
                </EcoCardContent>
              </EcoCard>

              <EcoCard>
                <EcoCardHeader>
                  <EcoCardTitle>Achievements</EcoCardTitle>
                </EcoCardHeader>
                <EcoCardContent>
                  <div className="grid grid-cols-3 gap-3">
                    {badges.slice(0, 6).map((badge) => (
                      <div
                        key={badge.name}
                        className={`p-3 rounded-xl border-2 text-center transition-all ${
                          badge.unlocked 
                            ? 'border-success bg-success/10' 
                            : 'border-muted bg-muted/50 opacity-50'
                        }`}
                      >
                        <div className="text-2xl mb-1">{badge.icon}</div>
                        <div className="text-xs font-medium">{badge.name}</div>
                      </div>
                    ))}
                  </div>
                </EcoCardContent>
              </EcoCard>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
